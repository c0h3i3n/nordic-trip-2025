# Nordic Trip 2025

一家四口在 2025 年夏天，從倫敦、比隆、哥本哈根到斯德哥爾摩的 18 天旅行網站。

## 網站

- GitHub Pages：<https://c0h3i3n.github.io/nordic-trip-2025/>
- 原始版本：<https://nordic-summer-2025-family.vfzdwcvj42.chatgpt.site/>

## 本機開發

需要 Node.js 22.13 或更新版本。

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
GITHUB_ACTIONS=true npm run build:pages
```

推送到 `main` 後，GitHub Actions 會自動建立靜態網站並發布到 GitHub Pages。
