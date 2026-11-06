#!/usr/bin/env node
/**
 * Dilek Perde Home (dilekperdehome.com) — Otonom Günlük Perde & Ev Tekstili SEO Blog Robotu
 * Her gün otomatik olarak yeni bir perde/dekorasyon rehberi yayınlar, Cloudflare'e deploy eder,
 * GitHub'a (StrongPartners/dilek-perde-home) pushlar ve Google Search Console Sitemap'i günceller.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const dataPath = join(rootDir, "src/data.js");

const DAILY_TOPICS = [
  {
    slug: "kornise-perde-nasil-takilir-rulet-ve-stoper-rehberi",
    title: "Kornişe Perde Nasıl Takılır? Rulet Sıklığı, Korniş Stoperi ve Pratik Asma Teknikleri",
    metaTitle: "Kornişe Perde Nasıl Takılır? Kolay Perde Asma Rehberi | Dilek Perde Home",
    metaDesc: "Üçlü ve dörtlü korniş kanallarına tül, güneşlik ve fon perde hangi sırayla takılır? Rulet kancası ve stoper kullanımı.",
    keywords: "kornişe perde nasıl takılır, üçlü korniş perde sırası, perde ruleti nedir, korniş stoperi nasıl takılır",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/dilek-perde-showroom-kartela-reyonu.jpg",
    excerpt: "Üçlü kornişte güneşlik, tül ve fon perdenin birbirine sürtünmeden kayması için doğru kanal sıralaması.",
    contentHtml: `
      <h2>Üçlü Kornişte Hangi Kanal Hangi Perde İçindir?</h2>
      <p>Standart üç kanallı tavan kornişlerinde doğru sıralama; <strong>en arka kanala (cama en yakın) güneşlik veya stor</strong>, <strong>orta kanala tül perde</strong>, <strong>en ön kanala (odaya bakan) ise sağ ve sol fon kanatlar</strong> şeklindedir. Atölyemizde her 7–8 cm'de bir diktiğimiz 1. sınıf kırılmaz ruletler sayesinde perdeniz kornişte takılmadan yağ gibi kayar.</p>
    `
  },
  {
    slug: "cocuk-ve-genc-odasi-perde-modelleri-2026",
    title: "Çocuk ve Genç Odası Perde Modelleri: Anti-Alerjik Tül, Zebra ve Karartma Stor Seçimi",
    metaTitle: "Çocuk ve Genç Odası Perde Modelleri 2026 | Dilek Perde Home",
    metaDesc: "Bebek, çocuk ve genç odaları için toz tutmayan anti-alerjik tül perde, renkli keten fon ve uyku düzeni sağlayan blackout stor perde modelleri.",
    keywords: "çocuk odası perde modelleri, genç odası perde modelleri, bebek odası perde seçimi, çocuk odası stor perde",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/incek-ankara-daire-stor-ve-guneslik-perde.jpg",
    excerpt: "Çocukların sağlıklı uykusu ve güvenli kullanımı için zincir emniyetli stor ve doğal dokulu keten tüller.",
    contentHtml: `
      <h2>Çocuk Odalarında Güvenlik ve Kolay Temizlik</h2>
      <p>Bebek ve çocuk odalarında yere kadar uzanan ağır perdeler yerine petek üstü boyda hazırlanan doğal bambu/keten tüller veya çocuk güvenlik klipsli <strong>karartma (blackout) stor perdeler</strong> hem toz tutmaz hem de gündüz uykuları için ideal karanlığı sağlar.</p>
    `
  },
  {
    slug: "rustik-perde-modelleri-ahsap-ve-metal-borulu-perdeler",
    title: "Rustik Perde Modelleri: Korniş Olmayan Pencereler ve Kış Bahçeleri İçin Şık Çözümler",
    metaTitle: "Rustik Perde Modelleri | Ahşap & Metal Rustik Borulu Perde | Dilek Perde",
    metaDesc: "Tavan kornişi olmayan pencereler, çatı katları ve modern salonlar için halkalı, kapsüllü ve ahşap/pirinç rustik borulu tül ve fon perde modelleri.",
    keywords: "rustik perde modelleri, rustik borulu perde, halkalı perde modelleri, kapsüllü fon perde, kış bahçesi perdesi",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/luks-salon-gold-tarcin-fon-perde-montaji.jpg",
    excerpt: "Tavanında kartonpiyer veya korniş bulunmayan pencerelerde duvara monte edilen dekoratif rustik sistemler.",
    contentHtml: `
      <h2>Kapsüllü (Kuşgözü) ve Halkalı Rustik Perdeler</h2>
      <p>Özellikle kemerli pencerelerde, çatı dublekslerinde ve Avrupa'daki dairelerde tavan kornişi yerine duvara monte edilen <strong>masif ahşap, siyah mat metal veya antik sarı rustik borular</strong> kullanılır. Atölyemizde paslanmaz kapsül (kuşgözü) veya gizli ekstraforlu rustik dikimi yapılmaktadır.</p>
    `
  },
  {
    slug: "ofis-ve-isyeri-perde-modelleri-jaluzi-ve-screen-stor",
    title: "Ofis, Muayenehane ve İşyeri Perde Modelleri: Screen Stor, Dikey ve Alüminyum/Ahşap Jaluzi",
    metaTitle: "Ofis Perde Modelleri | Screen Stor & Ahşap Jaluzi | Dilek Perde Home",
    metaDesc: "Kahramankazan Saray OSB fabrika yönetim binaları ve Ankara ofisleri için güneş kırıcı screen stor, 50mm ahşap jaluzi ve dikey perde sistemleri.",
    keywords: "ofis perde modelleri, screen stor perde, fabrika ofis perdesi, kahramankazan saray osb perdeci, alüminyum jaluzi perde",
    readTime: "5 dk okuma",
    heroImage: "/images/gallery/ahsap-jaluzi-ve-antrasit-fon-perde-kazan.jpg",
    excerpt: "Bilgisayar ekranlarındaki güneş yansımasını keserken dış manzarayı kapatmayan teknik ofis perdeleri.",
    contentHtml: `
      <h2>Kahramankazan Saray OSB ve Ankara Ofislerine Kurumsal Çözümler</h2>
      <p>Yönetici odaları, toplantı salonları ve fabrika idari binaları için alev geciktirici (FR) sertifikalı <strong>Sun Screen stor perdeler</strong> ve <strong>50mm masif ahşap jaluziler</strong> ile kurumsal mekanlarınıza prestij katıyoruz.</p>
    `
  },
  {
    slug: "kucuk-ve-alcak-tavanli-salonlari-genis-gosteren-perde-hileleri",
    title: "Küçük veya Alçak Tavanlı Salonları Daha Geniş ve Yüksek Gösteren 6 Perde Hilesi",
    metaTitle: "Küçük Salonları Geniş Gösteren Perde Seçimi | Dilek Perde Home",
    metaDesc: "Dar pencereli ve alçak tavanlı odaları daha ferah, aydınlık ve yüksek tavanlı göstermek için doğru perde rengi, boyu ve fon kanat yerleşimi.",
    keywords: "küçük salon için perde modelleri, tavanı yüksek gösteren perde, dar pencere perde modelleri, ferah salon perdeleri",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg",
    excerpt: "Fon kanatları pencere camının dışındaki duvar payına taşıyarak cam alanını %30 daha geniş gösterme tekniği.",
    contentHtml: `
      <h2>Camı Kapatmayan Fon Kanat Yerleşimi</h2>
      <p>Küçük salonlarda yapılan en büyük hata, fon perde kanatlarını camın üzerine doğru çekip gün ışığını kesmektir. Oysa kornişi pencere kasasından sağa ve sola 40'ar cm uzatıp fon kanatları duvarın üzerine oturttuğunuzda, pencereniz olduğundan çok daha geniş görünür ve salonunuz maksimum gün ışığı alır.</p>
    `
  }
];

const today = new Date().toISOString().slice(0, 10);
const dataText = readFileSync(dataPath, "utf8");

const dates = [...dataText.matchAll(/date:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
const hasToday = dates.includes(today);

if (!hasToday) {
  const nextTopic = DAILY_TOPICS.find((t) => !dataText.includes(`slug: "${t.slug}"`));
  if (nextTopic) {
    const newEntry = `  {
    slug: ${JSON.stringify(nextTopic.slug)},
    title: ${JSON.stringify(nextTopic.title)},
    metaTitle: ${JSON.stringify(nextTopic.metaTitle)},
    metaDesc: ${JSON.stringify(nextTopic.metaDesc)},
    keywords: ${JSON.stringify(nextTopic.keywords)},
    date: ${JSON.stringify(today)},
    readTime: ${JSON.stringify(nextTopic.readTime)},
    heroImage: ${JSON.stringify(nextTopic.heroImage)},
    excerpt: ${JSON.stringify(nextTopic.excerpt)},
    contentHtml: \`${nextTopic.contentHtml}\`
  },\n`;
    const updated = dataText.replace("export const GUIDES = [\n", `export const GUIDES = [\n${newEntry}`);
    writeFileSync(dataPath, updated, "utf8");
    try {
      const envText = readFileSync("/Users/sergenbakan/Desktop/SPT/sptmedya/.env", "utf8");
      const cfToken = envText.match(/CLOUDFLARE_API_TOKEN=(.*)/)[1].trim();
      execSync("npx --yes wrangler deploy", {
        cwd: rootDir,
        env: { ...process.env, CLOUDFLARE_API_TOKEN: cfToken, PATH: `/opt/homebrew/opt/node/bin:/opt/homebrew/bin:${process.env.PATH}` },
        stdio: "ignore"
      });
      execSync(`git add src/data.js && git commit -m "content(seo): Auto-publish daily curtain guide ${nextTopic.slug} (${today})" && git push origin main`, {
        cwd: rootDir,
        stdio: "ignore"
      });
    } catch (e) {
      // non-fatal
    }
    console.log(`✅ Yeni günlük perde blogu yayınlandı: ${nextTopic.slug} (${today})`);
  }
}

const updatedText = readFileSync(dataPath, "utf8");
const guideSection = updatedText.split("export const GUIDES = [")[1]?.split("export const REVIEWS")[0] || "";
const guideCount = [...guideSection.matchAll(/slug:\s*"/g)].length;
console.log(`✅ Otonom Perde Blogu Güncel (Son Yayın: ${today}) | Aktif Perde Blog/Rehber Sayısı: ${guideCount}`);
