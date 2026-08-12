import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath = "/nordic-trip-2025";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: githubPagesBasePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  typescript: {
    tsconfigPath: isGitHubPages ? "tsconfig.pages.json" : "tsconfig.json",
  },
};

export default nextConfig;
