#!/usr/bin/env node
/**
 * Dilek Perde Home (dilekperdehome.com) — Otonom Günlük Perde & Ev Tekstili SEO Blog Robotu
 * - Günde 2 kez (her 12 saatte bir) Cloudflare Container (kibris-akis-tur) tarafından otomatik çalıştırılır.
 * - Zengin teknik makale havuzundan (veya havuz bittiğinde Anthropic Claude API ile) yeni bir rehber yayınlar.
 * - Sitemap.xml'i günceller, IndexNow (Bing/Yandex) ve Google Sitemap servislerine otomatik bildirim atar.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const dataPath = join(rootDir, "src/data.js");

const GALLERY_POOL = [
  "/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg",
  "/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg",
  "/images/gallery/klasik-salon-antrasit-fon-ve-pileli-tul-perde.jpg",
  "/images/gallery/haki-yesil-kadife-fon-perde-ve-dikey-tul.jpg",
  "/images/gallery/ars-evleri-panoramik-salon-kruvaze-tul-perde.jpg",
  "/images/gallery/eryaman-yemek-odasi-kruvaze-tul-perde.jpg",
  "/images/gallery/cam-balkon-ve-mutfak-antrasit-stor-perde.jpg",
  "/images/gallery/incek-ankara-daire-stor-ve-guneslik-perde.jpg",
  "/images/gallery/luks-salon-gold-tarcin-fon-perde-montaji.jpg",
  "/images/gallery/mutfak-kruvaze-tul-ve-zebra-perde-kazan.jpg",
  "/images/gallery/yesilova-mahallesi-uc-boyutlu-bracollu-tul-perde.jpg",
  "/images/gallery/ahsap-jaluzi-ve-antrasit-fon-perde-kazan.jpg"
];

const DAILY_TOPICS = [
  {
    slug: "kornise-perde-nasil-takilir-rulet-ve-stoper-rehberi",
    title: "Kornişe Perde Nasıl Takılır? Rulet Sıklığı, Korniş Stoperi ve Pratik Asma Teknikleri",
    metaTitle: "Kornişe Perde Nasıl Takılır? Kolay Perde Asma Rehberi | Dilek Perde Home",
    metaDesc: "Üçlü ve dörtlü korniş kanallarına tül, güneşlik ve fon perde hangi sırayla takılır? Rulet kancası ve stoper kullanımı.",
    keywords: "kornişe perde nasıl takılır, üçlü korniş perde sırası, perde ruleti nedir, korniş stoperi nasıl takılır",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg",
    excerpt: "Üçlü kornişte güneşlik, tül ve fon perdenin birbirine sürtünmeden kayması için doğru kanal sıralaması.",
    contentHtml: `
      <h2>Üçlü Kornişte Hangi Kanal Hangi Perde İçindir?</h2>
      <p>Standart üç kanallı tavan kornişlerinde doğru sıralama; <strong>en arka kanala (cama en yakın) güneşlik veya stor</strong>, <strong>orta kanala tül perde</strong>, <strong>en ön kanala (odaya bakan) ise sağ ve sol fon kanatlar</strong> şeklindedir. Atölyemizde her 7–8 cm'de bir diktiğimiz 1. sınıf kırılmaz ruletler sayesinde perdeniz kornişte takılmadan rahatça hareket eder.</p>
      <h3>Stoper (Durdurucu) Kullanımının Önemi</h3>
      <p>Perdenin ilk ve son ruletinden sonra korniş kanalına takılan plastik stoperler, perdeyi çekerken raydan çıkmasını önler ve yan duvar paylarının her zaman simetrik durmasını sağlar.</p>
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
      <h3>Genç Odalarında Minimalist Kombinasyonlar</h3>
      <p>Çalışma masasının pencere önünde yer aldığı genç odalarında 50mm ahşap jaluzi veya antrasit/krem screen stor perdeler, bilgisayar ekranındaki güneş parlamasını keserken odanın modern çizgisini tamamlar.</p>
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
  },
  {
    slug: "keten-tul-perde-mi-grek-tul-perde-mi-karsilastirma",
    title: "Keten Tül Perde mi, Grek Tül Perde mi? Doku, Yıkama ve Işık Geçirgenliği Karşılaştırması",
    metaTitle: "Keten Tül mü Grek Tül mü? Hangisi Daha Kullanışlı? | Dilek Perde Home",
    metaDesc: "Salon ve oturma odası için keten tül perde ile grek tül perde arasındaki farklar: hangisi ütü istemez, hangisi daha dayanıklıdır?",
    keywords: "keten tül mü grek tül mü, keten tül perde kullananlar, grek tül perde özellikleri, ütü istemeyen tül perde hangisi",
    readTime: "5 dk okuma",
    heroImage: "/images/gallery/klasik-salon-antrasit-fon-ve-pileli-tul-perde.jpg",
    excerpt: "Doğal mat görünüm arayanlar için keten tül, yoğun kullanım ve çocuklu evler için kırılmaz grek tül analizi.",
    contentHtml: `
      <h2>Keten Dokulu Tül ve Grek Tül Arasındaki Temel Farklar</h2>
      <p>Mağazamızda müşterilerimizin en sık karşılaştırdığı iki ana tül grubu <strong>keten dokulu tüller</strong> ve <strong>grek (file gözenekli) tüller</strong>dir:</p>
      <ul>
        <li><strong>Doğal Keten Dokulu Tüller:</strong> İnce şantuklu ve mat yüzeyiyle salona çok dingin, mimari bir hava katar. Polyester-keten karışımlı yeni nesil dokumalarımız 30°C'de yıkanıp nemli asıldığında ütü istemez.</li>
        <li><strong>Grek Dokuma Tüller:</strong> Örgü tekniği sayesinde çekmeye, takılmaya ve güneş yanığına karşı en dirençli tül grubudur. Hava sirkülasyonunu kesmediği için balkon kapılı odalarda ve mutfaklarda yıllarca ilk günkü formunu korur.</li>
      </ul>
    `
  },
  {
    slug: "kartonpiyerli-ve-gizli-led-havuzlu-tavanlarda-perde-secimi",
    title: "Kartonpiyerli ve Gizli LED Havuzlu Tavanlarda Korniş Montajı ve Perde Seçimi",
    metaTitle: "Kartonpiyer ve LED Havuzlu Tavan Perde Modelleri | Dilek Perde Home",
    metaDesc: "Tavan gizli ışık bandı (LED havuzu) ve dar kartonpiyer boşluklarında fon ve tül perde pileleri nasıl planlanmalı?",
    keywords: "kartonpiyerli tavan perde, gizli led tavan perde, boru pile fon perde, korniş boşluğu kaç cm olmalı",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg",
    excerpt: "Gizli ışık bantlarından süzülen aydınlatmanın perde dokusu üzerinde yarattığı gölge ve derinlik etkisi.",
    contentHtml: `
      <h2>Dar Kartonpiyer Boşluklarında Pile Sürtünmesini Önleme</h2>
      <p>Yeni konut projelerinde tavan alçıpan ve gizli LED havuzu ile pencere arasındaki korniş boşluğu bazen 10–12 cm kadar dar bırakılabilmektedir. Bu tip tavanlarda kaba duran büzgülü ekstraforlar yerine <strong>yatık kanun pile</strong> ve <strong>boru pile fon dikimi</strong> uygulanarak perdenin LED havuzuna sürtünmeden akıcı şekilde çalışması sağlanır.</p>
    `
  },
  {
    slug: "kadife-fon-perde-mi-keten-fon-perde-mi",
    title: "Salon Dekorasyonunda Kadife Fon Perde mi, Keten Fon Perde mi Tercih Edilmeli?",
    metaTitle: "Kadife Fon Perde mi Keten Fon Perde mi? | Dilek Perde Home",
    metaDesc: "Klasik, avangard, modern ve spor salon takımlarına göre kadife fon perde ile keten fon perde karşılaştırması.",
    keywords: "kadife fon perde, keten fon perde, salon fon perde seçimi, mat kadife fon perde, boru pile fon",
    readTime: "5 dk okuma",
    heroImage: "/images/gallery/haki-yesil-kadife-fon-perde-ve-dikey-tul.jpg",
    excerpt: "Mobilya kumaşınızın dokusuna (boucle, nubuk, şönil veya kadife) göre doğru fon perde eşleştirmesi.",
    contentHtml: `
      <h2>Koltuk Dokusuna Göre Fon Kumaşı Eşleştirme</h2>
      <p>İç mekân tekstilinde kural, koltuk kumaşı ile fon perde kumaşının birbirini boğmamasıdır:</p>
      <ul>
        <li><strong>Boucle ve Keten Koltuklarda:</strong> Mat İtalyan kadife fon perdeler yumuşak bir doku kontrastı oluşturarak odaya sıcaklık katar.</li>
        <li><strong>Kadife ve Nubuk Koltuklarda:</strong> Doğal keten veya kendinden dokulu şönil fon perdeler seçilerek mekândaki parlaklık dengelenir.</li>
      </ul>
    `
  },
  {
    slug: "motorlu-perde-ve-somfy-uzaktan-kumandali-perde-sistemleri",
    title: "Motorlu Tül, Fon ve Stor Perde Sistemleri: Yüksek Tavan ve Villalar İçin Otomasyon",
    metaTitle: "Motorlu Perde Sistemleri & Uzaktan Kumandalı Perde | Dilek Perde Home",
    metaDesc: "Villa, dubleks salon ve ofisler için uzaktan kumandalı ve akıllı ev uyumlu motorlu tül, fon, stor ve ahşap jaluzi sistemleri.",
    keywords: "motorlu perde sistemleri, uzaktan kumandalı perde, somfy motorlu perde ankara, yüksek tavan villa perdesi",
    readTime: "5 dk okuma",
    heroImage: "/images/gallery/ars-evleri-panoramik-salon-kruvaze-tul-perde.jpg",
    excerpt: "4 metre üzeri galeri boşlukları ve geniş panoramik cam cephelerde tek tuşla sessiz perde kontrolü.",
    contentHtml: `
      <h2>Yüksek Tavanlı Mekânlarda Motorlu Ray Konforu</h2>
      <p>Galeri boşluklu dubleks dairelerde ve geniş teras camlarında ağır gramajlı fon ve tülleri elle çekmek zamanla kumaşı yıpratabilir. Sessiz kayışlı <strong>motorlu alüminyum ray sistemlerimiz</strong> ile perdelerinizi uzaktan kumanda veya telefon uygulaması üzerinden tek dokunuşla açıp kapatabilirsiniz.</p>
    `
  },
  {
    slug: "kis-bahcesi-ve-veranda-perde-modelleri-isi-yalitimli",
    title: "Kış Bahçesi, Veranda ve Teras Kapama Alanları İçin Isı Yalıtımlı Perde Çözümleri",
    metaTitle: "Kış Bahçesi Perde Modelleri | Tavan Plise & Zip Perde | Dilek Perde Home",
    metaDesc: "Cam tavanlı kış bahçeleri ve verandalar için güneşi ve soğuğu kesen tavan plise perde, ahşap jaluzi ve termal stor sistemleri.",
    keywords: "kış bahçesi perdesi, cam tavan perdesi, ısı yalıtımlı plise perde, veranda perdesi ankara",
    readTime: "4 dk okuma",
    heroImage: "/images/gallery/cam-balkon-ve-mutfak-antrasit-stor-perde.jpg",
    excerpt: "Cam balkon ve kış bahçelerinde yazın sera etkisini, kışın ise camdan gelen soğuğu kesen hücreli kumaşlar.",
    contentHtml: `
      <h2>Kış Bahçelerinde Işık ve Sıcaklık Kontrolü</h2>
      <p>Üç cephesi veya tavanı cam olan kış bahçelerinde yaz aylarında içerisi aşırı ısınabilir. Güneş ışınlarını geri yansıtan reflektif arkalıklı <strong>Plisell cam balkon perdeleri</strong> ve <strong>screen stor sistemleri</strong>, dış manzarayı tamamen kapatmadan iç mekân sıcaklığını dengede tutar.</p>
    `
  }
];

async function generateTopicWithClaude(existingSlugs) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: `Sen Ankara Kahramankazan merkezli kurumsal "Dilek Perde Home" (dilekperdehome.com) özel dikim perde ve ev tekstili tasarım atölyesinin uzman içerik editörüsün.
Daha önce yazılmamış, Google'da yüksek aranma hacmine sahip yeni bir perde/ev tekstili rehber makalesi üret.
Mevcut slug listesi (bunları tekrarlama): ${existingSlugs.slice(0, 30).join(", ")}
Sadece geçerli bir JSON objesi döndür (markdown bloğu olmadan):
{
  "slug": "ornek-seo-uyumlu-slug",
  "title": "Başlık (60-75 karakter)",
  "metaTitle": "SEO Başlığı | Dilek Perde Home",
  "metaDesc": "140-155 karakter meta açıklama",
  "keywords": "virgülle ayrılmış 6 anahtar kelime",
  "readTime": "4 dk okuma",
  "excerpt": "Tek cümlelik özet",
  "contentHtml": "<h2>...</h2><p>...</p><h3>...</h3><ul><li>...</li></ul>"
}`
          }
        ]
      })
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data.content?.[0]?.text || "").trim().replace(/^```json\s*|\s*```$/g, "");
    const parsed = JSON.parse(text);
    if (parsed && parsed.slug && parsed.title && parsed.contentHtml) {
      parsed.heroImage = GALLERY_POOL[existingSlugs.length % GALLERY_POOL.length];
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

async function pingSearchEngines(slugs) {
  const host = "dilekperdehome.com";
  const sitemapUrl = `https://${host}/sitemap.xml`;
  const urlList = [
    `https://${host}/`,
    `https://${host}/rehber`,
    ...slugs.slice(0, 30).map((s) => `https://${host}/rehber/${s}`)
  ];

  // 1. IndexNow (Bing, Yandex, Seznam, Naver anlık indeksleme protokolü)
  for (const endpoint of ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"]) {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host,
          key: "dilekperdeindexnow2026",
          keyLocation: `https://${host}/dilekperdeindexnow2026.txt`,
          urlList
        })
      });
    } catch {
      // ignore network error
    }
  }

  // 2. Sitemap Ping & Warmup
  for (const pingUrl of [
    sitemapUrl,
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ]) {
    try {
      await fetch(pingUrl);
    } catch {
      // ignore
    }
  }
}

async function main() {
  const force = process.argv.includes("--force");
  const today = new Date().toISOString().slice(0, 10);
  const dataText = readFileSync(dataPath, "utf8");

  const guideSection = dataText.split("export const GUIDES = [")[1]?.split("export const REVIEWS")[0] || "";
  const existingSlugs = [...guideSection.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dates = [...guideSection.matchAll(/date:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
  const todayCount = dates.filter((d) => d === today).length;

  // Günde en fazla 2 yeni makale (veya --force ile hemen yayınla)
  if (force || todayCount < 2) {
    let nextTopic = DAILY_TOPICS.find((t) => !existingSlugs.includes(t.slug));
    if (!nextTopic) {
      nextTopic = await generateTopicWithClaude(existingSlugs);
    }
    if (nextTopic) {
      const newEntry = `  {
    slug: ${JSON.stringify(nextTopic.slug)},
    title: ${JSON.stringify(nextTopic.title)},
    metaTitle: ${JSON.stringify(nextTopic.metaTitle)},
    metaDesc: ${JSON.stringify(nextTopic.metaDesc)},
    keywords: ${JSON.stringify(nextTopic.keywords)},
    date: ${JSON.stringify(today)},
    readTime: ${JSON.stringify(nextTopic.readTime || "4 dk okuma")},
    heroImage: ${JSON.stringify(nextTopic.heroImage || GALLERY_POOL[0])},
    excerpt: ${JSON.stringify(nextTopic.excerpt)},
    contentHtml: \`${nextTopic.contentHtml}\`
  },\n`;
      const updated = dataText.replace("export const GUIDES = [\n", `export const GUIDES = [\n${newEntry}`);
      writeFileSync(dataPath, updated, "utf8");
      existingSlugs.unshift(nextTopic.slug);
      console.log(`Yeni gunluk perde rehberi eklendi: /rehber/${nextTopic.slug} (${today})`);
    }
  }

  await pingSearchEngines(existingSlugs);
  console.log(`Arama motoru (IndexNow + Sitemap) bildirimleri tamamlandi. Toplam aktif makale: ${existingSlugs.length}`);
}

main();
