import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nordic-summer-2025.example.com"),
  title: "Nordic Summer ’25｜一家四口的歐洲夏日旅行",
  description: "2025 年夏天，從倫敦、比隆、哥本哈根到斯德哥爾摩的 18 天家庭旅行紀錄。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Nordic Summer ’25",
    description: "18 DAYS · 3 COUNTRIES · 1 FAMILY",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Nordic Summer 2025 family journey" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
