import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/bricolage-grotesque-800.ttf",
  variable: "--font-display",
  weight: "800",
  display: "swap",
});

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const siteUrl = isGitHubPages
  ? "https://c0h3i3n.github.io/nordic-trip-2025/"
  : "https://nordic-summer-2025-family.vfzdwcvj42.chatgpt.site/";
const assetBase = isGitHubPages ? "/nordic-trip-2025" : "";
const ogImageUrl = new URL("og.png", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nordic Summer ’25｜一家四口的歐洲夏日旅行",
  description: "2025 年夏天，從倫敦、比隆、哥本哈根到斯德哥爾摩的 18 天家庭旅行紀錄。",
  icons: {
    icon: `${assetBase}/favicon.svg`,
    shortcut: `${assetBase}/favicon.svg`,
  },
  openGraph: {
    title: "Nordic Summer ’25",
    description: "18 DAYS · 3 COUNTRIES · 1 FAMILY",
    url: siteUrl,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Nordic Summer 2025 family journey" }],
  },
  twitter: { card: "summary_large_image", images: [ogImageUrl] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={display.variable}>{children}</body>
    </html>
  );
}
