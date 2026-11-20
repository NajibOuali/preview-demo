// Tiny static server. Usage: node serve.js <port> <mountPath>
// Serves ./dist at the given mount path, like a PR preview served under /pr-preview/pr-7/
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.argv[2] || 8080);
const mount = (process.argv[3] || "/").replace(/\/?$/, "/");
const types = { ".html": "text/html", ".css": "text/css" };

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (!url.startsWith(mount)) { res.writeHead(404); return res.end("404 " + url); }
  let rel = url.slice(mount.length) || "index.html";
  const file = path.join("dist", rel);
  fs.readFile(file, (err, data) => {
    console.log(err ? "404" : "200", url);
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "text/plain" });
    res.end(data);
  });
}).listen(port, () => console.log("listening on", port, "mount", mount));
