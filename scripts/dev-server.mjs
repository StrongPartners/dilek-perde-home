import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import worker from "../src/worker.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const PORT = process.env.PORT || 8788;

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".css": "text/css",
  ".js": "application/javascript"
};

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url || "/", `http://localhost:${PORT}`);
    const filePath = path.join(publicDir, decodeURIComponent(reqUrl.pathname));

    if (
      filePath.startsWith(publicDir) &&
      fs.existsSync(filePath) &&
      fs.statSync(filePath).isFile()
    ) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    const cfReq = new Request(`https://dilekperdehome.com${reqUrl.pathname}${reqUrl.search}`);
    const cfRes = await worker.fetch(cfReq, {});
    const body = await cfRes.text();
    res.writeHead(cfRes.status, {
      "Content-Type": cfRes.headers.get("Content-Type") || "text/html; charset=utf-8"
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(String(err));
  }
});

server.listen(PORT, () => {
  console.log(`Dilek Perde Home onizleme sunucusu calisiyor: http://localhost:${PORT}`);
});
