import { createHash } from "node:crypto";
import {
  lstat,
  readFile,
  readdir,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_ROOT = join(PROJECT_ROOT, "public");
const JOURNEY_ROOT = join(PUBLIC_ROOT, "journey");
const MANIFEST_PATH = join(PROJECT_ROOT, "privacy", "journey-media-manifest.json");
const LOCKED_SCOPE = Object.freeze({ start: "2025-07-12", end: "2025-07-29" });

// This list is intentionally code-reviewed and closed. Updating manifest hashes
// cannot add a path, date, or category that is not explicitly approved here.
const APPROVED_ASSETS = Object.freeze([
  ["journey/day-02-british-museum.jpg", "2025-07-13", "architecture"],
  ["journey/day-03-royal-mews.jpg", "2025-07-14", "travel-object"],
  ["journey/day-05-science-museum.jpg", "2025-07-16", "attraction"],
  ["journey/day-06-oxford.jpg", "2025-07-17", "architecture"],
  ["journey/day-08-legoland.jpg", "2025-07-19", "travel-object"],
  ["journey/day-09-lego-house.jpg", "2025-07-20", "travel-object"],
  ["journey/day-11-copenhagen-zoo.jpg", "2025-07-22", "nature"],
  ["journey/day-14-stockholm-metro.jpg", "2025-07-25", "environment"],
  ["journey/day-15-gamla-stan.jpg", "2025-07-26", "street"],
  ["journey/day-16-skansen.jpg", "2025-07-27", "architecture"],
  ["journey/day-17-flight-home.jpg", "2025-07-28", "environment"],
  ["journey/day-18-taipei-arrival.jpg", "2025-07-29", "environment"],
  ["journey/gallery/day-06-gallery-02-divinity-school.jpg", "2025-07-17", "architecture"],
  ["journey/gallery/day-14-gallery-01-aquarium-tank.jpg", "2025-07-25", "environment"],
].map(([path, date, category]) => Object.freeze({ path, date, category })));

const ALLOWED_CATEGORIES = new Set([
  "scenery",
  "attraction",
  "architecture",
  "street",
  "nature",
  "food",
  "drink",
  "travel-object",
  "environment",
]);
const UPDATE_HASHES = process.argv.includes("--update-hashes");
const unknownArguments = process.argv.slice(2).filter((arg) => arg !== "--update-hashes");

if (unknownArguments.length > 0) {
  console.error(`Unknown argument(s): ${unknownArguments.join(", ")}`);
  process.exit(2);
}

const errors = [];
const fail = (message) => errors.push(message);

function requireExactKeys(value, allowedKeys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`);
    return;
  }
  const actual = Object.keys(value).sort();
  const expected = [...allowedKeys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    fail(`${label} may contain only: ${expected.join(", ")}`);
  }
}

function portablePath(path) {
  return path.split(sep).join("/");
}

async function collectPublishedFiles(directory) {
  const files = [];
  const rootStats = await lstat(directory);
  if (rootStats.isSymbolicLink() || !rootStats.isDirectory()) {
    fail("public/journey must be a real directory, not a symlink");
    return files;
  }

  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const absolutePath = join(current, entry.name);
      const publicPath = portablePath(relative(PUBLIC_ROOT, absolutePath));
      const stats = await lstat(absolutePath);

      if (stats.isSymbolicLink()) {
        fail(`Symlinks are forbidden in public journey media: ${publicPath}`);
      } else if (stats.isDirectory()) {
        if (publicPath !== "journey/gallery") {
          fail(`Unexpected directory in public journey media: ${publicPath}`);
        }
        await walk(absolutePath);
      } else if (stats.isFile()) {
        files.push(publicPath);
      } else {
        fail(`Only regular files are allowed in public journey media: ${publicPath}`);
      }
    }
  }

  await walk(directory);
  return files;
}

function inspectJpegMarkers(buffer, publicPath) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    fail(`Not a valid JPEG stream: ${publicPath}`);
    return;
  }
  if (buffer.at(-2) !== 0xff || buffer.at(-1) !== 0xd9) {
    fail(`JPEG must end at its EOI marker (no trailing payload): ${publicPath}`);
  }

  let offset = 2;
  let foundScan = false;
  let foundEnd = false;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      fail(`Malformed JPEG marker stream: ${publicPath}`);
      return;
    }
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9) {
      foundEnd = true;
      if (offset !== buffer.length) fail(`JPEG has data after its EOI marker: ${publicPath}`);
      break;
    }
    if (marker === 0x00 || marker === undefined) {
      fail(`Malformed JPEG marker stream: ${publicPath}`);
      return;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;

    if (offset + 2 > buffer.length) {
      fail(`Truncated JPEG segment: ${publicPath}`);
      return;
    }
    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      fail(`Invalid JPEG segment length: ${publicPath}`);
      return;
    }

    if ((marker >= 0xe0 && marker <= 0xef) || marker === 0xfe) {
      fail(
        `JPEG metadata/comment marker 0x${marker.toString(16).toUpperCase()} is forbidden: ${publicPath}`,
      );
    }
    offset += segmentLength;

    if (marker === 0xda) {
      foundScan = true;
      // Walk entropy-coded bytes until the next real marker. 0xFF00 is an
      // escaped data byte and restart markers are part of the scan.
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xff) {
          offset += 1;
          continue;
        }

        let markerOffset = offset + 1;
        while (buffer[markerOffset] === 0xff) markerOffset += 1;
        const scanMarker = buffer[markerOffset];
        if (scanMarker === 0x00 || (scanMarker >= 0xd0 && scanMarker <= 0xd7)) {
          offset = markerOffset + 1;
          continue;
        }
        break;
      }
    }
  }

  if (!foundScan) fail(`JPEG contains no image scan: ${publicPath}`);
  if (!foundEnd) fail(`JPEG contains no EOI marker: ${publicPath}`);
}

async function inspectImage(publicPath) {
  const absolutePath = join(PUBLIC_ROOT, publicPath);
  let stats;
  try {
    stats = await lstat(absolutePath);
  } catch {
    fail(`Approved asset is missing: ${publicPath}`);
    return null;
  }

  if (stats.isSymbolicLink() || !stats.isFile()) {
    fail(`Approved asset must be a regular, non-symlink file: ${publicPath}`);
    return null;
  }

  const buffer = await readFile(absolutePath);
  inspectJpegMarkers(buffer, publicPath);

  try {
    const metadata = await sharp(buffer, { failOn: "error" }).metadata();
    if (metadata.format !== "jpeg") fail(`Only decoded JPEG images are allowed: ${publicPath}`);
    if (!metadata.width || !metadata.height || (metadata.pages ?? 1) !== 1) {
      fail(`Image must be a single, non-empty frame: ${publicPath}`);
    }
    if (metadata.exif || metadata.icc || metadata.iptc || metadata.xmp) {
      fail(`Embedded EXIF/ICC/IPTC/XMP metadata is forbidden: ${publicPath}`);
    }
    if (metadata.orientation !== undefined || metadata.hasProfile) {
      fail(`Orientation or color-profile metadata is forbidden: ${publicPath}`);
    }
    if (Array.isArray(metadata.comments) && metadata.comments.length > 0) {
      fail(`JPEG comments are forbidden: ${publicPath}`);
    }
  } catch (error) {
    fail(`JPEG decode failed for ${publicPath}: ${error.message}`);
  }

  return createHash("sha256").update(buffer).digest("hex");
}

let manifest;
try {
  manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
} catch (error) {
  console.error(`Privacy manifest is unreadable: ${error.message}`);
  process.exit(1);
}

requireExactKeys(manifest, ["schemaVersion", "scope", "reviewMode", "assets"], "Privacy manifest");
requireExactKeys(manifest.scope, ["start", "end"], "Privacy manifest scope");
if (manifest.schemaVersion !== 1) fail("Privacy manifest schemaVersion must be 1");
if (
  manifest.scope?.start !== LOCKED_SCOPE.start ||
  manifest.scope?.end !== LOCKED_SCOPE.end
) {
  fail(`Travel scope must remain locked to ${LOCKED_SCOPE.start}..${LOCKED_SCOPE.end}`);
}
if (manifest.reviewMode !== "manual-privacy-review") {
  fail("Privacy manifest must record manual-privacy-review");
}
if (!Array.isArray(manifest.assets)) {
  fail("Privacy manifest assets must be an array");
  manifest.assets = [];
}

const manifestByPath = new Map();
for (const asset of manifest.assets) {
  if (!asset || typeof asset.path !== "string") {
    fail("Every manifest asset must have a path");
    continue;
  }
  requireExactKeys(asset, ["path", "date", "status", "category", "sha256"], `Asset ${asset.path}`);
  if (manifestByPath.has(asset.path)) fail(`Duplicate manifest path: ${asset.path}`);
  manifestByPath.set(asset.path, asset);
}

const approvedPaths = new Set(APPROVED_ASSETS.map(({ path }) => path));
for (const path of manifestByPath.keys()) {
  if (!approvedPaths.has(path)) fail(`Manifest path is not code-approved: ${path}`);
}

for (const approved of APPROVED_ASSETS) {
  const asset = manifestByPath.get(approved.path);
  if (!asset) {
    fail(`Code-approved path is absent from manifest: ${approved.path}`);
    continue;
  }
  if (asset.status !== "SAFE") fail(`Asset status must be SAFE: ${approved.path}`);
  if (asset.date !== approved.date) fail(`Asset date does not match approval: ${approved.path}`);
  if (asset.category !== approved.category) {
    fail(`Asset category does not match approval: ${approved.path}`);
  }
  if (!ALLOWED_CATEGORIES.has(asset.category)) {
    fail(`Asset category is not publicly allowed: ${approved.path}`);
  }
  if (asset.date < LOCKED_SCOPE.start || asset.date > LOCKED_SCOPE.end) {
    fail(`Asset date is outside the locked travel scope: ${approved.path}`);
  }
  if (!UPDATE_HASHES && !/^[a-f0-9]{64}$/.test(asset.sha256 ?? "")) {
    fail(`Asset needs a reviewed SHA-256 hash: ${approved.path}`);
  }
}

let publishedFiles = [];
try {
  publishedFiles = await collectPublishedFiles(JOURNEY_ROOT);
} catch (error) {
  fail(`Cannot inventory public journey media: ${error.message}`);
}

const publishedSet = new Set(publishedFiles);
for (const path of publishedFiles) {
  if (!approvedPaths.has(path)) fail(`Unreviewed public journey asset: ${path}`);
}
for (const path of approvedPaths) {
  if (!publishedSet.has(path)) fail(`Approved public journey asset is absent: ${path}`);
}

const actualHashes = new Map();
for (const { path } of APPROVED_ASSETS) {
  const hash = await inspectImage(path);
  if (hash) actualHashes.set(path, hash);
  if (!UPDATE_HASHES && hash && manifestByPath.get(path)?.sha256 !== hash) {
    fail(`SHA-256 mismatch (asset changed after review): ${path}`);
  }
}

if (errors.length > 0) {
  console.error("Journey media privacy check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

if (UPDATE_HASHES) {
  const updatedManifest = {
    schemaVersion: 1,
    scope: LOCKED_SCOPE,
    reviewMode: "manual-privacy-review",
    assets: APPROVED_ASSETS.map(({ path, date, category }) => ({
      path,
      date,
      status: "SAFE",
      category,
      sha256: actualHashes.get(path),
    })),
  };
  const temporaryPath = `${MANIFEST_PATH}.tmp-${process.pid}`;
  try {
    await writeFile(temporaryPath, `${JSON.stringify(updatedManifest, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
    });
    await rename(temporaryPath, MANIFEST_PATH);
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
  console.log(`Updated reviewed hashes for ${APPROVED_ASSETS.length} public journey assets.`);
} else {
  console.log(
    `Privacy check passed: ${APPROVED_ASSETS.length} manually approved assets, scope ${LOCKED_SCOPE.start}..${LOCKED_SCOPE.end}.`,
  );
}
