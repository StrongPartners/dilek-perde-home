// Google Search Console'dan son 28 günün verisini çekip SEO fırsatlarını raporlar.
// Gerekli ortam değişkeni: GSC_SERVICE_ACCOUNT (servis hesabı JSON anahtarının tamamı)
import { createSign } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

const SITE = "sc-domain:dilekperdehome.com";
const sa = JSON.parse(process.env.GSC_SERVICE_ACCOUNT || "{}");
if (!sa.client_email) {
  console.log("GSC_SERVICE_ACCOUNT tanımlı değil, atlandı.");
  process.exit(0);
}

const b64 = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
  iss: sa.client_email,
  scope: "https://www.googleapis.com/auth/webmasters.readonly",
  aud: "https://oauth2.googleapis.com/token",
  iat: now,
  exp: now + 3600
})}`;
const jwt = `${unsigned}.${createSign("RSA256").update(unsigned).sign(sa.private_key, "base64url")}`;
const tok = await (
  await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  })
).json();
if (!tok.access_token) throw new Error("Token alınamadı: " + JSON.stringify(tok));

const day = (d) => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
const query = async (dimensions) => {
  const r = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${tok.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: day(30), endDate: day(2), dimensions, rowLimit: 5000 })
    }
  );
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j));
  return (j.rows || []).map((x) => ({
    ...Object.fromEntries(dimensions.map((d, i) => [d, x.keys[i]])),
    clicks: x.clicks,
    impressions: x.impressions,
    ctr: +(x.ctr * 100).toFixed(1),
    position: +x.position.toFixed(1)
  }));
};

const qp = await query(["query", "page"]);
const pages = await query(["page"]);
const neredeyse = qp
  .filter((r) => r.position > 7 && r.position <= 20 && r.impressions >= 10)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 25);
const tiklanmayan = pages
  .filter((r) => r.impressions >= 50 && r.ctr < 1)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 15);
const uzun = qp
  .filter((r) => r.query.split(/\s+/).length >= 5)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 25);
const top = pages.sort((a, b) => b.clicks - a.clicks).slice(0, 10);

const t = (rows, cols) =>
  rows.length
    ? [
        `| ${cols.join(" | ")} |`,
        `|${cols.map(() => "---").join("|")}|`,
        ...rows.map(
          (r) =>
            `| ${cols
              .map((c) => String(r[c]).replace("https://dilekperdehome.com", ""))
              .join(" | ")} |`
        )
      ].join("\n")
    : "_Yok._";

const md = `# Search Console Raporu — Dilek Perde Home (${day(30)} - ${day(2)})

Toplam: ${pages.reduce((s, r) => s + r.clicks, 0)} tıklama, ${pages.reduce((s, r) => s + r.impressions, 0)} gösterim.

## 1. Neredeyse ilk sayfada (sıra 8-20)
Yapılacak: sorgunun tam ifadesini ilgili sayfaya bir cümle/alt başlık olarak ekle; uymuyorsa yeni yazı yaz ve bu sayfadan link ver.

${t(neredeyse, ["query", "page", "position", "impressions", "clicks"])}

## 2. Gösterilen ama tıklanmayan sayfalar (TO < %1)
Yapılacak: başlık, açıklama, H1 ve ilk cümleyi en çok gösterim alan sorguya göre düzelt.

${t(tiklanmayan, ["page", "impressions", "clicks", "ctr", "position"])}

## 3. Uzun (5+ kelime) sorgular — niş perde ve ölçü aramaları
Yapılacak: bu ifadelerle birebir başlık/SSS içeren yazılar üret.

${t(uzun, ["query", "page", "impressions", "position"])}

## 4. En çok tıklanan sayfalar (iç link kaynağı)
Yapılacak: bu sayfalardan 2. sayfadaki ilgili yazılara link ver.

${t(top, ["page", "clicks", "impressions", "position"])}
`;

mkdirSync("raporlar", { recursive: true });
writeFileSync("raporlar/search-console.md", md);
writeFileSync("raporlar/search-console.json", JSON.stringify({ tarih: day(0), neredeyse, tiklanmayan, uzun, top }, null, 2));
console.log("Rapor yazıldı: raporlar/search-console.md");
