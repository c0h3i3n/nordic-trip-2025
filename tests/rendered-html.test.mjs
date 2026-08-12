import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const mediaManifest = JSON.parse(
  readFileSync(new URL("../privacy/journey-media-manifest.json", import.meta.url), "utf8"),
);
const approvedMediaPaths = new Set(mediaManifest.assets.map(({ path }) => path));

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const basePath = process.env.GITHUB_ACTIONS === "true" ? "/nordic-trip-2025" : "";

  return worker.fetch(
    new Request(`http://localhost${basePath}/`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Nordic Summer itinerary", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Nordic Summer/i);
  assert.match(html, /從倫敦/);
  assert.match(html, /每日行程/);
  assert.match(html, /斯德哥爾摩/);
  assert.match(html, /大英博物館/);
  assert.match(html, /Oxford 學院與博德利圖書館/);
  assert.match(html, /Copenhagen Zoo/);
  assert.match(html, /Experimentarium/);
  assert.match(html, /Den Blå Planet/);
  assert.match(html, /Gamla stan/);
  assert.match(html, /曼谷 → 台北/);
  assert.match(html, /THE DAY \/ 一天的腳步/);
  assert.match(html, /TRAVEL MOMENT \/ 旅途片刻/);
  assert.match(html, /清晨 07:15 飛抵 Heathrow/);
  assert.match(html, /長途飛行後只留一座博物館當主角/);
  assert.match(html, /WHAT WE ATE \/ 這天吃什麼/);
  assert.match(html, /ON FOOT \/ 一路走過/);
  assert.match(html, /209,239/);
  assert.match(html, /11,624/);
  assert.match(html, /15,703/);
  assert.match(html, /STEPS \/ 這天走了幾步/);
  assert.match(html, /每日旅行誌依照片與旅途資料整理/);
  assert.doesNotMatch(html, /照片沒有留下可確認|沒有留下清楚餐點照片/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-controls="day-2-details"/);

  assert.equal(
    html.match(/\bday-photo-private\b/g)?.length,
    18,
    "renders a no-photo placeholder for every travel date",
  );

  const allJourneyPhotos = html.match(/<img\b[^>]*src="(journey\/[^"]+\.jpg)"[^>]*>/g) ?? [];
  assert.equal(allJourneyPhotos.length, 0, "publishes no journey photos while photos are paused");
  const renderedJourneyPaths = new Set(
    allJourneyPhotos.map((photo) => photo.match(/\bsrc="([^"]+)"/)?.[1] ?? ""),
  );
  assert.deepEqual(renderedJourneyPaths, approvedMediaPaths);
  assert.match(html, /PHOTOS PAUSED/);
  assert.match(html, /照片暫時/);
  assert.doesNotMatch(html, /MORE FROM THE DAY/);

  assert.equal(html.match(/class="journal-detail"/g)?.length, 18);
  assert.equal(html.match(/class="journal-step"/g)?.length, 54);
  assert.equal(html.match(/TRAVEL MOMENT \/ 旅途片刻/g)?.length, 18);
  assert.equal(html.match(/class="steps-detail"/g)?.length, 18);
  assert.match(html, /<strong>7,771<\/strong>/);
  assert.match(html, /<strong>4,995<\/strong>/);
  assert.match(html, /<strong>走進大英博物館<\/strong>/);
  assert.match(html, /<strong>走進 9¾ 月台<\/strong>/);
  assert.match(html, /<strong>到花園走走<\/strong>/);
  assert.doesNotMatch(html, /<strong>(上午|午後|傍晚)<\/strong>/);

  const cards = html.match(/<article class="day-card[\s\S]*?<\/article>/g) ?? [];
  const card = (date) => cards.find((item) => item.includes(`<span class="date">${date}</span>`)) ?? "";
  assert.equal(cards.length, 18, "renders one itinerary card for every travel date");
  assert.match(card("7.12"), /泰航機上餐/);
  assert.match(card("7.13"), /羅塞塔石碑/);
  assert.match(card("7.13"), /Great Court/);
  assert.match(card("7.14"), /Five Guys/);
  assert.match(card("7.15"), /Platform 9¾/);
  assert.match(card("7.15"), /King’s Cross/);
  assert.match(card("7.15"), /再次到 Five Guys/);
  assert.doesNotMatch(card("7.17"), /魚薯|漢堡配薯條/);
  assert.match(card("7.18"), /魚薯、義大利麵和漢堡薯條/);
  assert.match(card("7.25"), /Den Blå Planet/);
  assert.match(card("7.25"), /丹麥國家水族館/);
  assert.match(card("7.25"), /飛往斯德哥爾摩/);
  assert.match(card("7.26"), /Gamla stan/);
  assert.match(card("7.29"), /沒有留下足以辨認品項的畫面/);

  assert.doesNotMatch(html, /Warner Bros|Tivoli Gardens|Junibacken|Fjäderholmarna/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
