import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";

const content = JSON.parse(readFileSync("src/content.json", "utf8"));
const label = process.env.PREVIEW_LABEL || "production";

mkdirSync("dist", { recursive: true });
copyFileSync("src/style.css", "dist/style.css");

const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${content.title}</title>
<link rel="stylesheet" href="style.css"></head>
<body>
<span class="badge">${label}</span>
<h1>${content.headline}</h1>
<p>${content.sub}</p>
</body></html>`;

writeFileSync("dist/index.html", html);
console.log("built dist/ for:", label);
