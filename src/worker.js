import { SITE, GALLERY_ITEMS, COLLECTIONS, REGIONS, GUIDES, REVIEWS } from "./data.js";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function baseSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HomeGoodsStore", "LocalBusiness", "Store"],
        "@id": `${SITE.domain}/#organization`,
        name: SITE.name,
        alternateName: ["Dilek Perde", "Dilek Perde Ev Tekstil", "Kahramankazan Dilek Perde"],
        legalName: SITE.legalName,
        url: SITE.domain,
        logo: `${SITE.domain}/images/logo.svg`,
        image: [
          `${SITE.domain}/images/gallery/kahramankazan-dilek-perde-magaza-vitrin.jpg`,
          `${SITE.domain}/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg`,
          `${SITE.domain}/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg`
        ],
        description: "Kahramankazan, Ankara ve Türkiye genelinde özel dikim tül perde, kadife ve keten fon perde, Plisell cam balkon plise perde, 50mm doğal ahşap jaluzi, 3 boyutlu dikey tül ve zebra/stor perde tasarım mağazası.",
        telephone: SITE.phoneRaw,
        priceRange: "₺₺",
         founder: {
          "@type": "Person",
          name: SITE.owner
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.district,
          addressRegion: SITE.address.city,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng
        },
        hasMap: SITE.googleShareUrl,
        sameAs: [
          SITE.instagramUrl,
          SITE.googleShareUrl,
          `https://www.google.com/search?kgmid=${SITE.kgmid}`
        ],
        areaServed: [
          { "@type": "City", name: "Kahramankazan" },
          { "@type": "AdministrativeArea", name: "Ankara" },
          { "@type": "Country", name: "Türkiye" },
          { "@type": "Country", name: "Almanya" },
          { "@type": "Country", name: "Fransa" }
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "19:30"
          }
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "48",
          bestRating: "5",
          worstRating: "1"
        },
        review: REVIEWS.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
          reviewBody: r.text
        }))
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.domain}/#website`,
        url: SITE.domain,
        name: SITE.name,
        publisher: { "@id": `${SITE.domain}/#organization` },
        inLanguage: "tr-TR"
      }
    ]
  };
}

function calculatorWidgetHtml() {
  return `
  <section class="calc-section" id="hesaplama">
    <div class="container">
      <div class="calc-grid">
        <div class="calc-info">
          <span class="eyebrow">PRATİK METRAJ &amp; PİLE REHBERİ</span>
          <h2>Pencereniz İçin Ne Kadar Kumaş Gider?</h2>
          <p>Perde dikiminde kumaş miktarı; pencerenizin genişliğine ve seçeceğiniz <strong>pile sıklığına</strong> göre belirlenir. Yan taraftaki hesaplama aracımızla pencerenizin en ve boy ölçüsünü girerek ihtiyacınız olan net kumaş metrajını görebilir, ölçünüzü tek tıkla <strong>Dilek Hanım'a WhatsApp üzerinden</strong> ileterek güncel kumaş alternatifleriyle net fiyat alabilirsiniz.</p>
          <div class="calc-badges">
            <div class="c-badge">
              <strong>1x3 Sık (Kanun) Pile</strong>
              <span>1 metre cama 3 metre tül kullanılır. Salonlar için en tok ve zengin duruştur.</span>
            </div>
            <div class="c-badge">
              <strong>1x2.5 Orta Pile / Boru Pile</strong>
              <span>1 metre cama 2.5 metre kumaş kullanılır. Oturma odası ve mutfaklar için idealdir.</span>
            </div>
            <div class="c-badge">
              <strong>m² Mekanizmalı Sistemler</strong>
              <span>Plise cam balkon, ahşap jaluzi, zebra ve stor perdeler En x Boy (m²) üzerinden hesaplanır.</span>
            </div>
          </div>
        </div>
        <div class="calc-card">
          <h3>Ölçü &amp; Kumaş Metrajı Hesaplayıcı</h3>
          <div class="form-row">
            <label for="c-type">Perde Türü Seçin</label>
            <select id="c-type">
              <option value="tul">Tül Perde (Keten / Grek / Kapsül / Kruvaze)</option>
              <option value="fon">Fon Perde (Kadife / Keten / Blackout)</option>
              <option value="plise">Plise (Plisell) Cam Balkon Perdesi</option>
              <option value="jaluzi">50mm Doğal Ahşap Jaluzi</option>
              <option value="dikey">3 Boyutlu / Akıllı Dikey Tül Perde</option>
              <option value="zebra">Bambu Zebra / Stor Güneşlik</option>
            </select>
          </div>
          <div class="form-two">
            <div class="form-row">
              <label for="c-width">Korniş / Cam Eni (cm)</label>
              <input type="number" id="c-width" value="300" min="40" max="1200" step="5" />
            </div>
            <div class="form-row">
              <label for="c-height">Tavan - Zemin Boyu (cm)</label>
              <input type="number" id="c-height" value="265" min="50" max="600" step="5" />
            </div>
          </div>
          <div class="form-row" id="pile-row">
            <label for="c-pile">Pile Sıklığı</label>
            <select id="c-pile">
              <option value="3" selected>1x3 Sık Pile (Salon Standardı — En Dolgun Duruş)</option>
              <option value="2.5">1x2.5 Normal Pile (Dengeli Döküm)</option>
              <option value="2">1x2 Seyrek / Spor Pile (Modern Sade)</option>
            </select>
          </div>
          <div class="calc-result" id="calc-result">
            <div class="res-top">
              <div>
                <span class="res-label">Gereken Net Kumaş / Alan</span>
                <strong class="res-val" id="res-qty">9,00 Metre Tül</strong>
              </div>
              <div>
                <span class="res-label">Önerilen Dikiş Tipi</span>
                <strong class="res-sub" id="res-note">Etek Kurşunlu 1x3 Kanun Pile</strong>
              </div>
            </div>
            <p class="res-disclaimer">Seçeceğiniz kumaş serisine (Brillant, Keten, İtalyan Kadife, Plisell) göre net fiyat teklifi almak için ölçünüzü doğrudan gönderebilirsiniz:</p>
            <a href="${SITE.whatsappUrl}" id="calc-wa-btn" target="_blank" rel="noopener" class="btn btn-wa-full">
              <span>📲 Bu Ölçü İçin WhatsApp'tan Fiyat Al (0551 402 27 07)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script>
    (function(){
      var tEl = document.getElementById('c-type');
      var wEl = document.getElementById('c-width');
      var hEl = document.getElementById('c-height');
      var pEl = document.getElementById('c-pile');
      var pRow = document.getElementById('pile-row');
      var qEl = document.getElementById('res-qty');
      var nEl = document.getElementById('res-note');
      var waBtn = document.getElementById('calc-wa-btn');
      if(!tEl) return;
      function update(){
        var type = tEl.value;
        var typeText = tEl.options[tEl.selectedIndex].text;
        var w = Math.max(40, parseFloat(wEl.value || 300));
        var h = Math.max(50, parseFloat(hEl.value || 265));
        var pile = parseFloat(pEl.value || 3);
        var qtyStr = '';
        var noteStr = '';
        if(type === 'tul'){
          pRow.style.display = 'block';
          var mt = ((w / 100) * pile).toFixed(2).replace('.', ',');
          qtyStr = mt + ' Metre Kumaş (+40cm Yan Pay)';
          noteStr = '1x' + pile + ' Pile • Boy: ' + h + ' cm';
        } else if(type === 'fon'){
          pRow.style.display = 'block';
          var boyM = ((h + 25) / 100);
          var ciftKanat = (boyM * 2 * (pile >= 2.5 ? 1.2 : 1)).toFixed(2).replace('.', ',');
          qtyStr = ciftKanat + ' Metre (Çift Kanat Fon)';
          noteStr = 'Sağ-Sol 2 Kanat Boru/Kanun Pile';
        } else {
          pRow.style.display = 'none';
          var m2 = Math.max(1.5, (w / 100) * (h / 100)).toFixed(2).replace('.', ',');
          qtyStr = m2 + ' m² Net Uygulama Alanı';
          noteStr = w + ' cm x ' + h + ' cm Özel Kasa Üretim';
        }
        qEl.textContent = qtyStr;
        nEl.textContent = noteStr;
        var msg = 'Merhaba Dilek Hanım, dilekperdehome.com üzerinden ölçü hesapladım:\\n'
          + '• Perde Türü: ' + typeText + '\\n'
          + '• Ölçü: En ' + w + ' cm x Boy ' + h + ' cm\\n'
          + '• Hesaplanan: ' + qtyStr + ' (' + noteStr + ')\\n'
          + 'Uygun kumaş ve fiyat alternatiflerini paylaşabilir misiniz?';
        waBtn.href = 'https://wa.me/905514022707?text=' + encodeURIComponent(msg);
      }
      tEl.addEventListener('change', update);
      wEl.addEventListener('input', update);
      hEl.addEventListener('input', update);
      pEl.addEventListener('change', update);
      update();
    })();
  </script>`;
}

function renderLayout({ title, description, canonicalPath = "/", extraSchema = null, bodyContent }) {
  const canonicalUrl = `${SITE.domain}${canonicalPath}`;
  const schemas = [baseSchema()];
  if (extraSchema) schemas.push(extraSchema);

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="google-site-verification" content="h4lWn2OfmVRUE4BinkQwjrJp5_1pJxxvj3hKGKcxzQk" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="tr-TR" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="theme-color" content="#6B1220" />
  <meta name="geo.region" content="TR-06" />
  <meta name="geo.placename" content="Kahramankazan, Ankara" />
  <meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}" />
  <meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="tr_TR" />
  <meta property="og:site_name" content="${escapeHtml(SITE.name)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${SITE.domain}/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${SITE.domain}/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  ${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n  ")}

  <style>
    :root {
      --claret: #6B1220;
      --claret-dark: #4A0B15;
      --claret-soft: #8A1C2D;
      --gold: #C59B52;
      --gold-light: #E6C98F;
      --gold-dark: #8C6528;
      --ivory: #FAF7F2;
      --sand: #F2ECE1;
      --ink: #1E1916;
      --muted: #5C534C;
      --line: #E4DACB;
      --white: #FFFFFF;
      --wa: #1F8E4D;
      --serif: 'Cormorant Garamond', Georgia, serif;
      --sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--sans);
      background: var(--ivory);
      color: var(--ink);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    img, video { max-width: 100%; display: block; }
    .container { max-width: 1260px; margin: 0 auto; padding: 0 22px; }

    /* Top Atelier Announcement Bar */
    .topbar {
      background: linear-gradient(90deg, var(--claret-dark), var(--claret), var(--claret-dark));
      color: #FAF5EC;
      font-size: 13px;
      padding: 9px 0;
      border-bottom: 1px solid rgba(230, 201, 143, 0.35);
    }
    .topbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .topbar a:hover { color: var(--gold-light); }
    .ig-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,0.12);
      padding: 3px 10px;
      border-radius: 99px;
      font-weight: 600;
      border: 1px solid rgba(230,201,143,0.35);
    }

    /* Main Header */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(250, 247, 242, 0.96);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--line);
      box-shadow: 0 4px 20px rgba(30, 25, 22, 0.04);
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      gap: 20px;
    }
    .brand-logo img {
      height: 62px;
      width: auto;
    }
    .main-nav {
      display: flex;
      align-items: center;
      gap: 24px;
      font-size: 14.5px;
      font-weight: 600;
      color: var(--ink);
    }
    .main-nav a {
      position: relative;
      padding: 6px 0;
      transition: color 0.2s;
    }
    .main-nav a:hover { color: var(--claret); }
    .header-cta {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 22px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.22s ease;
      cursor: pointer;
      border: none;
    }
    .btn-claret {
      background: linear-gradient(135deg, var(--claret-soft), var(--claret-dark));
      color: var(--white);
      box-shadow: 0 8px 22px rgba(107, 18, 32, 0.24);
    }
    .btn-claret:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(107, 18, 32, 0.34);
    }
    .btn-outline {
      background: var(--white);
      color: var(--claret);
      border: 1.5px solid rgba(107, 18, 32, 0.28);
    }
    .btn-outline:hover {
      border-color: var(--claret);
      background: #FDF9F4;
    }
    .btn-wa {
      background: var(--wa);
      color: var(--white);
      box-shadow: 0 8px 20px rgba(31, 142, 77, 0.25);
    }
    .btn-wa:hover {
      transform: translateY(-2px);
      background: #18773f;
    }

    /* Hero Section */
    .hero {
      padding: 46px 0 64px;
      background:
        radial-gradient(circle at 12% 18%, rgba(197, 155, 82, 0.13), transparent 42%),
        radial-gradient(circle at 88% 15%, rgba(107, 18, 32, 0.08), transparent 40%),
        linear-gradient(180deg, #FAF7F2 0%, #F3EDE2 100%);
      border-bottom: 1px solid var(--line);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 44px;
      align-items: center;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--claret);
      background: rgba(107, 18, 32, 0.08);
      border: 1px solid rgba(107, 18, 32, 0.18);
      padding: 6px 14px;
      border-radius: 99px;
      margin-bottom: 18px;
    }
    .hero h1 {
      font-family: var(--serif);
      font-size: clamp(36px, 4.6vw, 58px);
      line-height: 1.08;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 18px;
    }
    .hero h1 em {
      color: var(--claret);
      font-style: italic;
    }
    .hero-lead {
      font-size: 17px;
      color: var(--muted);
      margin-bottom: 26px;
      max-width: 610px;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 30px;
    }
    .trust-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      padding-top: 22px;
      border-top: 1px solid var(--line);
    }
    .trust-item strong {
      display: block;
      font-family: var(--serif);
      font-size: 28px;
      color: var(--claret);
      line-height: 1.1;
    }
    .trust-item span {
      font-size: 13px;
      color: var(--muted);
      font-weight: 500;
    }

    /* Hero Visual Collage */
    .hero-Showcase {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 14px;
      align-items: stretch;
    }
    .hero-main-card {
      position: relative;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 22px 48px rgba(30, 25, 22, 0.16);
      border: 3px solid var(--white);
      aspect-ratio: 9 / 14;
      background: #231b18;
    }
    .hero-main-card img, .hero-main-card video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .hero-side-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .hero-sub-card {
      position: relative;
      flex: 1;
      border-radius: 18px;
      overflow: hidden;
      border: 3px solid var(--white);
      box-shadow: 0 14px 32px rgba(30, 25, 22, 0.12);
      min-height: 190px;
    }
    .hero-sub-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .img-tag {
      position: absolute;
      left: 12px;
      bottom: 12px;
      right: 12px;
      background: rgba(24, 17, 15, 0.78);
      backdrop-filter: blur(8px);
      color: #FAF5EC;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid rgba(230, 201, 143, 0.35);
    }
    .img-tag small {
      display: block;
      color: var(--gold-light);
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Section Headers */
    section { padding: 72px 0; }
    .sec-head {
      text-align: center;
      max-width: 760px;
      margin: 0 auto 44px;
    }
    .sec-head h2 {
      font-family: var(--serif);
      font-size: clamp(30px, 3.6vw, 44px);
      color: var(--ink);
      line-height: 1.15;
      margin-bottom: 12px;
    }
    .sec-head p {
      color: var(--muted);
      font-size: 16px;
    }

    /* Collections Grid */
    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
      gap: 24px;
    }
    .col-card {
      background: var(--white);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid var(--line);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      display: flex;
      flex-direction: column;
    }
    .col-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(30, 25, 22, 0.1);
    }
    .col-img {
      position: relative;
      aspect-ratio: 4 / 4.6;
      overflow: hidden;
      background: #231c19;
    }
    .col-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease;
    }
    .col-card:hover .col-img img { transform: scale(1.05); }
    .col-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: var(--claret);
      color: var(--white);
      font-size: 11px;
      font-weight: 700;
      padding: 5px 11px;
      border-radius: 99px;
      letter-spacing: 0.5px;
    }
    .col-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .col-body h3 {
      font-family: var(--serif);
      font-size: 24px;
      margin-bottom: 8px;
      color: var(--ink);
    }
    .col-body p {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 16px;
      flex: 1;
    }
    .col-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid var(--line);
      font-size: 13px;
      font-weight: 700;
      color: var(--claret);
    }

    /* Gallery Section */
    .gallery-sec { background: var(--sand); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .filter-bar {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 32px;
    }
    .filter-btn {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 9px 18px;
      border-radius: 99px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--muted);
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-btn.active, .filter-btn:hover {
      background: var(--claret);
      color: var(--white);
      border-color: var(--claret);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
      gap: 20px;
    }
    .gal-card {
      background: var(--white);
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid var(--line);
      box-shadow: 0 8px 22px rgba(30,25,22,0.05);
      display: flex;
      flex-direction: column;
    }
    .gal-media {
      position: relative;
      aspect-ratio: 9 / 13;
      overflow: hidden;
      background: #1b1513;
    }
    .gal-media img, .gal-media video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .gal-loc {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(24, 17, 15, 0.78);
      color: var(--gold-light);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
    }
    .gal-info {
      padding: 16px 18px;
    }
    .gal-info h3 {
      font-size: 15.5px;
      font-weight: 700;
      margin-bottom: 6px;
      color: var(--ink);
    }
    .gal-info p {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.5;
    }

    /* Calculator */
    .calc-section {
      background: linear-gradient(135deg, #241316 0%, #3E1019 55%, #231619 100%);
      color: #FAF5EC;
    }
    .calc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 44px;
      align-items: center;
    }
    .calc-info .eyebrow {
      background: rgba(230, 201, 143, 0.15);
      color: var(--gold-light);
      border-color: rgba(230, 201, 143, 0.35);
    }
    .calc-info h2 {
      font-family: var(--serif);
      font-size: clamp(30px, 3.6vw, 44px);
      margin-bottom: 14px;
      color: var(--white);
    }
    .calc-info p {
      color: rgba(250, 245, 236, 0.82);
      margin-bottom: 24px;
      font-size: 15.5px;
    }
    .calc-badges {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .c-badge {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(230,201,143,0.22);
      padding: 13px 16px;
      border-radius: 14px;
    }
    .c-badge strong {
      display: block;
      color: var(--gold-light);
      font-size: 14.5px;
      margin-bottom: 2px;
    }
    .c-badge span {
      font-size: 13px;
      color: rgba(250,245,236,0.78);
    }
    .calc-card {
      background: var(--white);
      color: var(--ink);
      padding: 32px;
      border-radius: 24px;
      box-shadow: 0 24px 54px rgba(0,0,0,0.3);
    }
    .calc-card h3 {
      font-family: var(--serif);
      font-size: 28px;
      margin-bottom: 18px;
      color: var(--claret);
    }
    .form-row { margin-bottom: 14px; }
    .form-row label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 6px;
      color: var(--ink);
    }
    .form-row select, .form-row input {
      width: 100%;
      padding: 12px 14px;
      border: 1.5px solid var(--line);
      border-radius: 12px;
      font-size: 14.5px;
      font-family: var(--sans);
      background: var(--ivory);
    }
    .form-two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .calc-result {
      margin-top: 18px;
      padding: 18px;
      border-radius: 16px;
      background: #F8F3EA;
      border: 1px solid var(--line);
    }
    .res-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 12px;
    }
    .res-label {
      display: block;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--muted);
    }
    .res-val {
      font-size: 18px;
      color: var(--claret);
      font-weight: 800;
    }
    .res-sub {
      font-size: 14px;
      color: var(--ink);
    }
    .res-disclaimer {
      font-size: 12.5px;
      color: var(--muted);
      margin-bottom: 12px;
    }
    .btn-wa-full {
      width: 100%;
      background: var(--wa);
      color: var(--white);
      padding: 14px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 700;
    }

    /* Reviews & Store Location */
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 20px;
    }
    .rev-card {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 24px;
      border-radius: 18px;
    }
    .rev-stars { color: #E59819; font-size: 16px; margin-bottom: 10px; }
    .rev-card p { font-size: 14.5px; color: var(--ink); margin-bottom: 14px; font-style: italic; }
    .rev-meta { font-size: 13px; color: var(--muted); font-weight: 600; }

    /* Regional Links Pill Cloud */
    .region-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
    }
    .region-pill {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 11px 20px;
      border-radius: 99px;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .region-pill:hover {
      border-color: var(--claret);
      color: var(--claret);
      transform: translateY(-2px);
    }

    /* Article / Detail Page Content */
    .page-hero {
      padding: 48px 0;
      background: linear-gradient(180deg, #F5EFE4 0%, #FAF7F2 100%);
      border-bottom: 1px solid var(--line);
    }
    .breadcrumb {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .breadcrumb a { color: var(--claret); font-weight: 600; }
    .prose {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 22px;
      padding: 36px;
    }
    .prose h2 {
      font-family: var(--serif);
      font-size: 30px;
      color: var(--claret);
      margin: 24px 0 12px;
    }
    .prose h2:first-child { margin-top: 0; }
    .prose h3 {
      font-family: var(--serif);
      font-size: 23px;
      margin: 20px 0 10px;
    }
    .prose p { margin-bottom: 14px; color: var(--ink); }
    .prose ul, .prose ol { margin: 0 0 18px 22px; }
    .prose li { margin-bottom: 8px; }

    /* Footer */
    .site-footer {
      background: #1B1314;
      color: #E9E0D4;
      padding: 64px 0 32px;
      border-top: 3px solid var(--gold);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr 1fr 1.1fr;
      gap: 36px;
      margin-bottom: 44px;
    }
    .footer-col h4 {
      font-family: var(--serif);
      font-size: 22px;
      color: var(--gold-light);
      margin-bottom: 16px;
    }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 9px; font-size: 14px; color: rgba(233,224,212,0.8); }
    .footer-col a:hover { color: var(--gold-light); }
    .footer-bottom {
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 13px;
      color: rgba(233,224,212,0.65);
    }

    /* Sticky Mobile Call/WhatsApp Bar */
    .floating-bar {
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 999;
      display: flex;
      gap: 10px;
    }
    .float-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 20px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 12px 28px rgba(0,0,0,0.25);
    }

    @media (max-width: 960px) {
      .hero-grid, .calc-grid, .footer-grid { grid-template-columns: 1fr; }
      .main-nav { display: none; }
      .trust-strip { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .hero-Showcase { grid-template-columns: 1fr; }
      .form-two, .res-top { grid-template-columns: 1fr; }
      .header-cta .btn-outline { display: none; }
    }
  </style>
</head>
<body>
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-left">
        <span>📍 ${escapeHtml(SITE.address.full)}</span>
        <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener">🗺️ Google Haritalar Yol Tarifi</a>
      </div>
      <div class="topbar-right">
        <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" class="ig-pill">
          📸 Instagram ${escapeHtml(SITE.instagramHandle)} (${escapeHtml(SITE.instagramFollowers)} Takipçi • ${escapeHtml(SITE.instagramPosts)} Uygulama)
        </a>
        <a href="tel:${SITE.phoneRaw}"><strong>☎️ Sipariş &amp; Ölçü (Dilek Hanım): ${escapeHtml(SITE.phoneDisplay)}</strong></a>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo" aria-label="${escapeHtml(SITE.name)} Ana Sayfa">
        <img src="/images/logo.svg" alt="${escapeHtml(SITE.name)} Logo" width="275" height="62" />
      </a>
      <nav class="main-nav" aria-label="Ana Menü">
        <a href="/">Ana Sayfa</a>
        <a href="/#koleksiyonlar">Perde Modelleri</a>
        <a href="/uygulamalarimiz">Gerçek Uygulamalarımız</a>
        <a href="/perde-olcu-ve-fiyat-hesaplama">Ölçü &amp; Metraj Hesapla</a>
        <a href="/bolge/kahramankazan-perdeci">Hizmet Bölgeleri</a>
        <a href="/hakkimizda">Hakkımızda</a>
        <a href="/iletisim">İletişim</a>
      </nav>
      <div class="header-cta">
        <a href="tel:${SITE.phoneRaw}" class="btn btn-outline">☎️ ${escapeHtml(SITE.phoneDisplay)}</a>
        <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-wa">💬 WhatsApp Ölçü &amp; Fiyat</a>
      </div>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <img src="/images/logo-light.svg" alt="${escapeHtml(SITE.name)}" width="250" height="56" style="margin-bottom:14px" />
          <p style="font-size:14px;color:rgba(233,224,212,0.82);margin-bottom:14px">
            Kahramankazan'daki mağazamız ve özel dikim atölyemizle; salon, mutfak, yatak odası, cam balkon ve villa projeleriniz için tül, fon, Plisell plise, ahşap jaluzi ve stor perde tasarımları üretiyoruz.
          </p>
          <p style="font-size:13px;color:var(--gold-light)">
            Rideau textile de maison • Vorhang und Heimtext • Curtain &amp; Home Textile
          </p>
        </div>
        <div class="footer-col">
          <h4>Koleksiyonlarımız</h4>
          <ul>
            ${COLLECTIONS.map((c) => `<li><a href="/koleksiyon/${c.slug}">${escapeHtml(c.shortTitle)}</a></li>`).join("")}
            <li><a href="/perde-olcu-ve-fiyat-hesaplama">Perde Ölçü &amp; Fiyat Hesaplama</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Hizmet Bölgelerimiz</h4>
          <ul>
            ${REGIONS.map((r) => `<li><a href="/bolge/${r.slug}">${escapeHtml(r.name)} Perde Tasarım</a></li>`).join("")}
            ${GUIDES.map((g) => `<li><a href="/rehber/${g.slug}">${escapeHtml(g.title.split("?")[0])}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Mağaza &amp; İletişim</h4>
          <ul>
            <li>📍 <strong>Adres:</strong> ${escapeHtml(SITE.address.full)}</li>
            <li>☎️ <strong>Dilek Hanım:</strong> <a href="tel:${SITE.phoneRaw}">${escapeHtml(SITE.phoneDisplay)}</a></li>
            <li>📸 <strong>Instagram:</strong> <a href="${SITE.instagramUrl}" target="_blank" rel="noopener">${escapeHtml(SITE.instagramHandle)}</a></li>
            <li>🗺️ <strong>Konum:</strong> <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener">Google İşletme &amp; Harita Kaydımız</a></li>
            <li>🕒 <strong>Çalışma Saatleri:</strong> ${escapeHtml(SITE.hours)}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${escapeHtml(SITE.name)} (${escapeHtml(SITE.legalName)}). Tüm hakları saklıdır.</span>
        <span>Kahramankazan / Ankara • Türkiye &amp; Avrupa Özel Dikim Gönderim</span>
      </div>
    </div>
  </footer>

  <div class="floating-bar">
    <a href="tel:${SITE.phoneRaw}" class="float-btn btn-claret">☎️ Hemen Ara</a>
    <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="float-btn btn-wa">💬 WhatsApp Sipariş</a>
  </div>
</body>
</html>`;
}

function renderHomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Kahramankazan ve Ankara'da eve gelip ücretsiz ölçü alıyor musunuz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet. Kahramankazan merkez, Ars Evleri, Yeşilova, Satıkadın, Kayı mahalleleri başta olmak üzere Eryaman, İncek, Batıkent, Çayyolu ve Ankara genelinde kartela numunelerimizle evinize gelerek ücretsiz lazerli ölçü alıyoruz."
        }
      },
      {
        "@type": "Question",
        name: "Dilek Perde Home mağazası tam olarak nerede?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mağazamız Kahramankazan merkezde, Atatürk Mahallesi Kazım Karabekir Caddesi No: 12/A - 12/B (06980 Kahramankazan / Ankara) adresinde hizmet vermektedir. 0551 402 27 07 numaralı telefondan Dilek Hanım'a doğrudan ulaşabilirsiniz."
        }
      },
      {
        "@type": "Question",
        name: "Şehir dışına ve Avrupa'ya (Almanya, Fransa) özel dikim perde gönderiyor musunuz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet. WhatsApp üzerinden görüntülü görüşme ile mağazamızdaki kumaşları canlı olarak seçebilir, verdiğiniz ölçülere göre kornişe veya Avrupa tipi ray/rustik sistemine hazır dikilmiş ve ütülenmiş olarak Türkiye'nin 81 iline ve Avrupa'ya kargo ile teslim alabilirsiniz."
        }
      }
    ]
  };

  const bodyContent = `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">✦ KAHRAMANKAZAN &amp; ANKARA ÖZEL DİKİM PERDE ATÖLYESİ</span>
          <h1>Evinizin Işığını ve Ruhunu Değiştiren <em>Usta İşi Perdeler</em></h1>
          <p class="hero-lead">
            Kahramankazan Kazım Karabekir Caddesi'ndeki showroomumuzda <strong>Dilek Hanım</strong>'ın birebir tasarım danışmanlığıyla; ütü istemeyen keten tüller, İtalyan kadife fonlar, <strong>Plisell cam balkon perdeleri</strong>, <strong>50mm doğal ahşap jaluzi</strong> ve <strong>3 boyutlu dikey tül</strong> koleksiyonlarını evinizin ölçüsüne özel dikiyor ve monte ediyoruz.
          </p>
          <div class="hero-actions">
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-wa">💬 WhatsApp'tan Ücretsiz Ölçü &amp; Fiyat Al</a>
            <a href="tel:${SITE.phoneRaw}" class="btn btn-claret">☎️ Dilek Hanım: ${escapeHtml(SITE.phoneDisplay)}</a>
            <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener" class="btn btn-outline">📍 Mağaza Yol Tarifi</a>
          </div>
          <div class="trust-strip">
            <div class="trust-item">
              <strong>704+</strong>
              <span>Instagram'da Paylaşılan Gerçek Ev &amp; Villa Teslimatı</span>
            </div>
            <div class="trust-item">
              <strong>7.580+</strong>
              <span>@dilek_perde_home Mutlu Takipçi &amp; Müşteri Ailesi</span>
            </div>
            <div class="trust-item">
              <strong>%100</strong>
              <span>Ücretsiz Yerinde Keşif, Lazer Ölçü &amp; Garantili Montaj</span>
            </div>
          </div>
        </div>

        <div class="hero-Showcase">
          <div class="hero-main-card">
            <video autoplay loop muted playsinline poster="/images/gallery/kahramankazan-dilek-perde-magaza-vitrin.jpg">
              <source src="/images/gallery/showroom-vitrin-tur.mp4" type="video/mp4" />
            </video>
            <div class="img-tag">
              <small>CANLI MAĞAZA VİTRİNİ • KAHRAMANKAZAN</small>
              Atatürk Mah. Kazım Karabekir Cad. No:12/A-B Showroomumuz
            </div>
          </div>
          <div class="hero-side-stack">
            <div class="hero-sub-card">
              <img src="/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg" alt="Kahramankazan Salon Vizon Fon ve Keten Tül Perde Uygulaması" />
              <div class="img-tag">
                <small>SALON UYGULAMASI</small>
                Vizon Fon &amp; 1x3 Sık Pile Keten Tül
              </div>
            </div>
            <div class="hero-sub-card">
              <img src="/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg" alt="Kahramankazan Villa İtalyan Kruvaze Tül Perde Çalışması" />
              <div class="img-tag">
                <small>VİLLA PROJESİ</small>
                İtalyan Kruvaze Tül &amp; Özel Braçol
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="koleksiyonlar">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">ÖZEL DİKİM KOLEKSİYONLARIMIZ</span>
          <h2>Her Odaya, Her Pencereye Özel Perde Çözümleri</h2>
          <p>Brillant yetkili koleksiyonları ve özenle seçilmiş keten, kadife, bambu ve Plisell mekanizmalı sistemlerimizle tanışın.</p>
        </div>
        <div class="collections-grid">
          ${COLLECTIONS.map((col) => `
            <article class="col-card">
              <a href="/koleksiyon/${col.slug}" class="col-img">
                <img src="${col.heroImage}" alt="${escapeHtml(col.title)}" loading="lazy" />
                <span class="col-badge">${escapeHtml(col.badge)}</span>
              </a>
              <div class="col-body">
                <h3><a href="/koleksiyon/${col.slug}">${escapeHtml(col.shortTitle)}</a></h3>
                <p>${escapeHtml(col.summary)}</p>
                <div class="col-foot">
                  <span>${escapeHtml(col.priceHint.slice(0, 38))}...</span>
                  <a href="/koleksiyon/${col.slug}">Detaylı İncele →</a>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="gallery-sec" id="uygulamalar">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">📸 @dilek_perde_home GERÇEK TESLİMATLARIMIZ</span>
          <h2>Kahramankazan ve Ankara'da Teslim Ettiğimiz Evlerden Kareler</h2>
          <p>Sitemizdeki tüm fotoğraflar stok görsel değil; bizzat kendi atölyemizde dikip müşterilerimizin evlerine monte ettiğimiz gerçek işlerimizdir.</p>
        </div>

        <div class="filter-bar">
          <button class="filter-btn active" data-filter="all">Tümü (16 Gerçek Uygulama)</button>
          <button class="filter-btn" data-filter="Salon Perdeleri">Salon &amp; Kruvaze</button>
          <button class="filter-btn" data-filter="Fon Perdeler">Kadife &amp; Keten Fon</button>
          <button class="filter-btn" data-filter="Mutfak & Balkon">Mutfak &amp; 3 Boyutlu Tül</button>
          <button class="filter-btn" data-filter="Stor & Cam Balkon">Stor &amp; Cam Balkon</button>
          <button class="filter-btn" data-filter="Mağaza Showroom">Mağaza &amp; Showroom</button>
        </div>

        <div class="gallery-grid" id="gal-grid">
          ${GALLERY_ITEMS.map((item) => `
            <article class="gal-card" data-cat="${escapeHtml(item.category)}">
              <div class="gal-media">
                <img src="${item.image}" alt="${escapeHtml(item.title)} - ${escapeHtml(item.location)}" loading="lazy" />
                <span class="gal-loc">📍 ${escapeHtml(item.location)}</span>
              </div>
              <div class="gal-info">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
              </div>
            </article>
          `).join("")}
        </div>

        <div style="text-align:center;margin-top:36px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap">
          <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" class="btn btn-claret">📸 Instagram'da 704+ Paylaşımımızın Tamamını Gör (@dilek_perde_home)</a>
          <a href="/uygulamalarimiz" class="btn btn-outline">Tüm Uygulama Galerisini Aç →</a>
        </div>
      </div>
      <script>
        (function(){
          var btns = document.querySelectorAll('.filter-btn');
          var cards = document.querySelectorAll('#gal-grid .gal-card');
          btns.forEach(function(b){
            b.addEventListener('click', function(){
              btns.forEach(function(x){ x.classList.remove('active'); });
              b.classList.add('active');
              var f = b.getAttribute('data-filter');
              cards.forEach(function(c){
                var cat = c.getAttribute('data-cat');
                if(f === 'all' || cat === f || (f === 'Salon Perdeleri' && (cat === 'Villa & Kruvaze' || cat === '3 Boyutlu & Tül'))){
                  c.style.display = 'flex';
                } else {
                  c.style.display = 'none';
                }
              });
            });
          });
        })();
      </script>
    </section>

    ${calculatorWidgetHtml()}

    <section>
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">MÜŞTERİ DENEYİMLERİ &amp; GOOGLE İŞLETME KAYDI</span>
          <h2>Evini Dilek Perde'ye Emanet Eden Komşularımız Ne Diyor?</h2>
          <p>Kahramankazan, Ars Evleri, Yeşilova, Eryaman ve İncek'te perde dikimi ve montajı yaptığımız ailelerimizin yorumları.</p>
        </div>
        <div class="reviews-grid">
          ${REVIEWS.map((r) => `
            <div class="rev-card">
              <div class="rev-stars">★★★★★</div>
              <p>"${escapeHtml(r.text)}"</p>
              <div class="rev-meta">${escapeHtml(r.author)} — 📍 ${escapeHtml(r.location)} (${escapeHtml(r.date)})</div>
            </div>
          `).join("")}
        </div>
        <div style="text-align:center;margin-top:32px">
          <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener" class="btn btn-outline">⭐ Google İşletme Profilimizi &amp; Harita Kaydımızı İnceleyin</a>
        </div>
      </div>
    </section>

    <section style="background:var(--sand);border-top:1px solid var(--line)">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">KAHRAMANKAZAN • ANKARA • TÜRKİYE &amp; AVRUPA</span>
          <h2>Hizmet Bölgelerimiz ve Uzman Perde Rehberlerimiz</h2>
          <p>Kahramankazan ve Ankara içi ücretsiz yerinde ölçü ve montaj; Türkiye'nin 81 ili ile Almanya ve Fransa'ya kornişe takmaya hazır özel dikim kargo gönderimi.</p>
        </div>
        <div class="region-pills">
          ${REGIONS.map((r) => `<a href="/bolge/${r.slug}" class="region-pill">📍 ${escapeHtml(r.name)} Perde Tasarım</a>`).join("")}
          ${GUIDES.map((g) => `<a href="/rehber/${g.slug}" class="region-pill">📖 ${escapeHtml(g.title.split("?")[0])}</a>`).join("")}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Dilek Perde Home | Kahramankazan & Ankara Perde Modelleri, Özel Dikim Tül, Fon, Plise & Jaluzi",
    description: "Kahramankazan (Kazan) ve Ankara'da 704+ gerçek ev referansıyla özel dikim tül perde, kadife/keten fon perde, Plisell cam balkon perdesi, 50mm ahşap jaluzi ve stor perde. Ücretsiz ölçü: 0551 402 27 07.",
    canonicalPath: "/",
    extraSchema: faqSchema,
    bodyContent
  });
}

function renderCollectionPage(col) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: col.title,
    image: `${SITE.domain}${col.heroImage}`,
    description: col.metaDesc,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TRY",
      lowPrice: "450",
      highPrice: "18500",
      offerCount: "25",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE.name }
    }
  };

  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / <a href="/#koleksiyonlar">Koleksiyonlar</a> / ${escapeHtml(col.shortTitle)}</div>
        <span class="eyebrow">${escapeHtml(col.badge)}</span>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4.2vw,50px);margin-bottom:12px">${escapeHtml(col.title)}</h1>
        <p style="font-size:17px;color:var(--muted);max-width:760px">${escapeHtml(col.summary)}</p>
      </div>
    </div>

    <section>
      <div class="container" style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:36px;align-items:start">
        <div class="prose">
          ${col.bodyHtml}
          <h3>Öne Çıkan Atölye ve Kumaş Özelliklerimiz</h3>
          <ul>
            ${col.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
          </ul>
          ${col.faqs.length ? `
            <h2>Sıkça Sorulan Sorular</h2>
            ${col.faqs.map((f) => `
              <div style="margin-bottom:16px;padding:16px;background:var(--ivory);border-radius:12px;border:1px solid var(--line)">
                <strong style="display:block;color:var(--claret);margin-bottom:6px">${escapeHtml(f.q)}</strong>
                <p style="margin:0;font-size:14.5px">${escapeHtml(f.a)}</p>
              </div>
            `).join("")}
          ` : ""}
        </div>

        <aside style="display:flex;flex-direction:column;gap:20px">
          <div style="background:var(--white);padding:16px;border-radius:20px;border:1px solid var(--line)">
            <img src="${col.heroImage}" alt="${escapeHtml(col.title)}" style="border-radius:14px;width:100%;aspect-ratio:4/4.8;object-fit:cover;margin-bottom:12px" />
            <img src="${col.secondaryImage}" alt="${escapeHtml(col.shortTitle)} Uygulama Örneği" style="border-radius:14px;width:100%;aspect-ratio:4/3.5;object-fit:cover" />
          </div>
          <div style="background:var(--claret);color:var(--white);padding:26px;border-radius:20px">
            <h3 style="font-family:var(--serif);font-size:26px;margin-bottom:10px">Ücretsiz Ölçü &amp; Kartela Randevusu</h3>
            <p style="font-size:14px;opacity:0.9;margin-bottom:18px">Kahramankazan ve Ankara genelinde kartela numunelerimizle evinize geliyor, koltuk ve halınıza en uygun modeli birlikte seçiyoruz.</p>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-wa" style="width:100%;margin-bottom:10px">💬 WhatsApp'tan Fiyat Sor</a>
            <a href="tel:${SITE.phoneRaw}" class="btn btn-outline" style="width:100%">☎️ ${escapeHtml(SITE.phoneDisplay)}</a>
          </div>
        </aside>
      </div>
    </section>

    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: col.metaTitle,
    description: col.metaDesc,
    canonicalPath: `/koleksiyon/${col.slug}`,
    extraSchema: schema,
    bodyContent
  });
}

function renderRegionPage(reg) {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Hizmet Bölgeleri / ${escapeHtml(reg.name)}</div>
        <span class="eyebrow">📍 ${escapeHtml(reg.name.toUpperCase())} ÖZEL DİKİM PERDE &amp; MONTAJ</span>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4.2vw,50px);margin-bottom:12px">${escapeHtml(reg.title)}</h1>
        <p style="font-size:17px;color:var(--muted);max-width:780px">${escapeHtml(reg.intro)}</p>
      </div>
    </div>

    <section>
      <div class="container" style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:36px;align-items:start">
        <div class="prose">
          <h2>${escapeHtml(reg.name)} Bölgesinde Sunduğumuz Perde ve Ev Tekstili Hizmetleri</h2>
          <p><strong>Dilek Perde Home</strong> olarak Kahramankazan Atatürk Mahallesi Kazım Karabekir Caddesi No: 12/A-B adresindeki mağazamız ve kendi dikim atölyemizle, <strong>${escapeHtml(reg.name)}</strong> bölgesindeki daire, villa ve iş yerlerine aracısız atölye fiyatlarıyla hizmet veriyoruz.</p>
          <ul>
            <li><strong>Ütü İstemeyen Tül Perdeler:</strong> Keten dokulu, grek, bambu, kapsül tül ve İtalyan kruvaze salon tülleri.</li>
            <li><strong>Kadife, Keten ve Blackout Fon Perdeler:</strong> Koltuk takımınızla birebir renk uyumunda boru pile ve kanun pile fon kanatlar.</li>
            <li><strong>Plisell Cam Balkon Perdesi:</strong> Katlanır ve sürgülü cam balkonlara milimetrik uyumlu, alttan ve üstten açılır ısı yalıtımlı plise perdeler.</li>
            <li><strong>50mm Doğal Ahşap Jaluzi &amp; Stor/Zebra:</strong> Masif ıhlamur ağacı jaluzi ve alüminyum kasalı bambu zebra perdeler.</li>
          </ul>
          <h3>Hizmet Verdiğimiz Başlıca Mahalle ve Noktalar</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">
            ${reg.neighborhoods.map((n) => `<span style="background:var(--sand);padding:6px 14px;border-radius:99px;font-size:13px;font-weight:600">📍 ${escapeHtml(n)}</span>`).join("")}
          </div>
          <h3>Nasıl Çalışıyoruz?</h3>
          <ol>
            <li><strong>İletişim &amp; Randevu:</strong> <a href="tel:${SITE.phoneRaw}"><strong>${escapeHtml(SITE.phoneDisplay)}</strong></a> numaralı telefondan veya WhatsApp üzerinden bize ulaşırsınız.</li>
            <li><strong>Yerinde Kartela Sunumu &amp; Lazer Ölçü:</strong> Evinizin kendi ışığında koltuk ve duvar renginize göre kumaşları birlikte seçer, pencerelerinizi milimetrik ölçeriz.</li>
            <li><strong>Özel Atölye Dikimi &amp; Montaj:</strong> Seçtiğiniz kumaşlar kendi ustalarımız tarafından dikilir, ütülenir ve korniş/mekanizma montajıyla eksiksiz teslim edilir.</li>
          </ol>
        </div>
        <aside style="display:flex;flex-direction:column;gap:20px">
          <div style="background:var(--white);padding:16px;border-radius:20px;border:1px solid var(--line)">
            <img src="${reg.heroImage}" alt="${escapeHtml(reg.title)}" style="border-radius:14px;width:100%;aspect-ratio:4/4.8;object-fit:cover" />
          </div>
          <div style="background:var(--claret);color:var(--white);padding:26px;border-radius:20px">
            <h3 style="font-family:var(--serif);font-size:26px;margin-bottom:10px">${escapeHtml(reg.name)} Ücretsiz Ölçü Hattı</h3>
            <p style="font-size:14px;opacity:0.9;margin-bottom:18px">Dilek Hanım ile doğrudan görüşerek ücretsiz keşif randevusu oluşturun:</p>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-wa" style="width:100%;margin-bottom:10px">💬 WhatsApp'tan Randevu Al</a>
            <a href="tel:${SITE.phoneRaw}" class="btn btn-outline" style="width:100%">☎️ ${escapeHtml(SITE.phoneDisplay)}</a>
          </div>
        </aside>
      </div>
    </section>

    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: reg.metaTitle,
    description: reg.metaDesc,
    canonicalPath: `/bolge/${reg.slug}`,
    bodyContent
  });
}

function renderGuidePage(guide) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDesc,
    image: `${SITE.domain}${guide.heroImage}`,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { "@type": "Person", name: SITE.owner },
    publisher: { "@id": `${SITE.domain}/#organization` }
  };

  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Perde Rehberi / ${escapeHtml(guide.title)}</div>
        <span class="eyebrow">📖 DİLEK PERDE HOME UZMAN REHBERİ • ${escapeHtml(guide.readTime)}</span>
        <h1 style="font-family:var(--serif);font-size:clamp(30px,4vw,46px);margin-bottom:12px">${escapeHtml(guide.title)}</h1>
        <p style="font-size:17px;color:var(--muted);max-width:760px">${escapeHtml(guide.excerpt)}</p>
      </div>
    </div>
    <section>
      <div class="container" style="max-width:900px">
        <div class="prose">
          ${guide.contentHtml}
          <div style="margin-top:28px;padding:22px;background:var(--sand);border-radius:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
            <div>
              <strong style="display:block;font-size:17px;color:var(--claret)">Pencereniz için doğru kumaş ve ölçüyü birlikte belirleyelim</strong>
              <span style="font-size:14px;color:var(--muted)">Kahramankazan mağazamıza bekleriz veya WhatsApp'tan pencere fotoğrafınızı gönderebilirsiniz.</span>
            </div>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-wa">💬 Dilek Hanım'a Sor (${escapeHtml(SITE.phoneDisplay)})</a>
          </div>
        </div>
      </div>
    </section>
    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: guide.metaTitle,
    description: guide.metaDesc,
    canonicalPath: `/rehber/${guide.slug}`,
    extraSchema: schema,
    bodyContent
  });
}

function renderGalleryPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Gerçek Uygulamalarımız</div>
        <span class="eyebrow">📸 @dilek_perde_home UYGULAMA PORTFOLYOSU</span>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4.2vw,50px);margin-bottom:12px">Gerçek Ev, Villa ve Cam Balkon Perde Teslimatlarımız</h1>
        <p style="font-size:17px;color:var(--muted);max-width:780px">Kahramankazan merkez, Ars Evleri, Yeşilova Mahallesi, Eryaman ve İncek'te bizzat dikimini ve montajını gerçekleştirdiğimiz perde uygulamalarımız.</p>
      </div>
    </div>
    <section>
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:40px">
          <div class="gal-card">
            <div class="gal-media" style="aspect-ratio:16/10">
              <video controls autoplay loop muted playsinline poster="/images/gallery/kahramankazan-dilek-perde-magaza-vitrin.jpg">
                <source src="/images/gallery/showroom-vitrin-tur.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="gal-info">
              <h3>Kahramankazan Mağaza &amp; Showroom Turu (Kazım Karabekir Cad. No:12/A-B)</h3>
              <p>Yüzlerce tül, fon, ahşap jaluzi ve Plisell cam balkon kartelasını canlı inceleyebileceğiniz mağazamız.</p>
            </div>
          </div>
          <div class="gal-card">
            <div class="gal-media" style="aspect-ratio:16/10">
              <video controls autoplay loop muted playsinline poster="/images/gallery/incek-ankara-daire-stor-ve-guneslik-perde.jpg">
                <source src="/images/gallery/incek-daire-uygulama.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="gal-info">
              <h3>İncek / Ankara Komple Daire Stor &amp; Tül Perde Teslimatımız</h3>
              <p>Panoramik pencerelerde alüminyum kasalı gri stor güneşlik ve salon perde montajımız.</p>
            </div>
          </div>
        </div>
        <div class="gallery-grid">
          ${GALLERY_ITEMS.map((item) => `
            <article class="gal-card">
              <div class="gal-media">
                <img src="${item.image}" alt="${escapeHtml(item.title)} - ${escapeHtml(item.location)}" loading="lazy" />
                <span class="gal-loc">📍 ${escapeHtml(item.location)}</span>
              </div>
              <div class="gal-info">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Gerçek Perde Uygulamalarımız (@dilek_perde_home) | Kahramankazan & Ankara | Dilek Perde Home",
    description: "Dilek Perde Home tarafından Kahramankazan, Ars Evleri, Yeşilova, Eryaman ve İncek'te yapılan gerçek salon tül, fon, kruvaze, ahşap jaluzi ve stor perde uygulamaları.",
    canonicalPath: "/uygulamalarimiz",
    bodyContent
  });
}

function renderAboutPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Hakkımızda</div>
        <span class="eyebrow">KURUMSAL HİKAYEMİZ &amp; ATÖLYE DEĞERLERİMİZ</span>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4.2vw,50px);margin-bottom:12px">Dilek Perde Home: Kahramankazan'dan Tüm Ankara ve Avrupa'ya Uzanan Ustalık</h1>
        <p style="font-size:17px;color:var(--muted);max-width:780px">Her pencereyi kendi evimizin penceresi gibi ölçüyor, her dikişi yıllarca bozulmadan kullanılacak titizlikle tamamlıyoruz.</p>
      </div>
    </div>
    <section>
      <div class="container" style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:36px;align-items:start">
        <div class="prose">
          <h2>Samimiyet, Doğru Kumaş ve Kusursuz İşçilik</h2>
          <p><strong>Dilek Perde Home</strong>, kurucumuz <strong>Dilek Hanım</strong> yönetiminde Ankara Kahramankazan'da (Atatürk Mahallesi, Kazım Karabekir Caddesi No: 12/A - 12/B) faaliyet gösteren butik bir perde tasarım mağazası ve özel dikim atölyesidir.</p>
          <p>Hazır paket perdelerin aksine; her evin tavan yüksekliğinin, aldığı gün ışığının, koltuk ve halı dokusunun kendine özgü olduğunu biliyoruz. Bu yüzden mağazamızda <strong>Brillant</strong> başta olmak üzere Türkiye'nin en seçkin dokuma fabrikalarının keten, grek, kadife, şönil, bambu zebra, <strong>Plisell cam balkon</strong> ve <strong>masif ahşap jaluzi</strong> koleksiyonlarını bulunduruyoruz.</p>
          <h3>Neden Yüzlerce Aile Bizi Tercih Ediyor?</h3>
          <ul>
            <li><strong>Eksiksiz Metraj ve Gerçek Pile:</strong> 1x3 sık pile sözü verdiğimizde kumaştan asla ödün vermeden tam metraj kullanırız.</li>
            <li><strong>Ütü ve Etek İşçiliği:</strong> Tüm tüllerimiz etek kurşunlu, yan dikişleri kasma yapmayan özel makinelerde dikilir ve buhar kazanlı ütüden geçerek asılır.</li>
            <li><strong>Avrupa ve Türkiye Geneli Güvenli Sipariş:</strong> Almanya, Fransa, Hollanda ve Türkiye'nin dört bir yanındaki müşterilerimize görüntülü kumaş seçimiyle özel dikim kargo gönderimi sağlıyoruz.</li>
          </ul>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <img src="/images/gallery/kahramankazan-dilek-perde-magaza-vitrin.jpg" alt="Dilek Perde Home Mağaza Vitrin" style="border-radius:16px;aspect-ratio:3/4;object-fit:cover" />
          <img src="/images/gallery/dilek-perde-showroom-danisma-masasi.jpg" alt="Dilek Perde Home Showroom" style="border-radius:16px;aspect-ratio:3/4;object-fit:cover" />
          <img src="/images/gallery/dilek-perde-brillant-yetkili-satis-magaza.jpg" alt="Dilek Perde Brillant" style="border-radius:16px;aspect-ratio:3/4;object-fit:cover" />
          <img src="/images/gallery/dilek-perde-showroom-kumas-koleksiyonu.jpg" alt="Dilek Perde Kumaş Reyonu" style="border-radius:16px;aspect-ratio:3/4;object-fit:cover" />
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Hakkımızda | Dilek Perde Home — Kahramankazan & Ankara Perde Tasarım Mağazası",
    description: "Dilek Hanım yönetimindeki Dilek Perde Home; Kahramankazan Atatürk Mah. Kazım Karabekir Cad. No:12/A-B adresindeki showroomu ve özel dikim atölyesiyle hizmetinizde.",
    canonicalPath: "/hakkimizda",
    bodyContent
  });
}

function renderContactPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / İletişim &amp; Mağaza Konumu</div>
        <span class="eyebrow">📍 KAHRAMANKAZAN MERKEZ SHOWROOM</span>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4.2vw,50px);margin-bottom:12px">İletişim, Ücretsiz Ölçü Randevusu &amp; Yol Tarifi</h1>
        <p style="font-size:17px;color:var(--muted);max-width:760px">Mağazamızda çayımızı içerken kumaşlarımızı yakından inceleyebilir veya tek telefonla ücretsiz evde ölçü randevusu oluşturabilirsiniz.</p>
      </div>
    </div>
    <section>
      <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start">
        <div class="prose">
          <h2>Mağaza İletişim Bilgilerimiz</h2>
          <p><strong>Mağaza Unvanı:</strong> ${escapeHtml(SITE.name)} (${escapeHtml(SITE.legalName)})</p>
          <p><strong>Yetkili Tasarım Danışmanı:</strong> ${escapeHtml(SITE.owner)}</p>
          <p><strong>Açık Adres:</strong> ${escapeHtml(SITE.address.full)}</p>
          <p><strong>Sipariş &amp; Ölçü Hattı:</strong> <a href="tel:${SITE.phoneRaw}" style="color:var(--claret);font-weight:800;font-size:20px">${escapeHtml(SITE.phoneDisplay)}</a></p>
          <p><strong>Instagram:</strong> <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" style="color:var(--claret);font-weight:700">${escapeHtml(SITE.instagramHandle)}</a> (${escapeHtml(SITE.instagramFollowers)} Takipçi)</p>
          <p><strong>Çalışma Saatlerimiz:</strong> ${escapeHtml(SITE.hours)}</p>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:24px">
            <a href="tel:${SITE.phoneRaw}" class="btn btn-claret">☎️ Hemen Ara (${escapeHtml(SITE.phoneDisplay)})</a>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-wa">💬 WhatsApp'tan Mesaj Gönder</a>
            <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener" class="btn btn-outline">🗺️ Google Haritalar'da Aç</a>
          </div>
        </div>
        <div style="background:var(--white);padding:18px;border-radius:22px;border:1px solid var(--line)">
          <iframe
            title="Dilek Perde Home Kahramankazan Harita Konumu"
            src="https://www.google.com/maps?q=Atat%C3%BCrk+Mahallesi,+Kaz%C4%B1m+Karabekir+Caddesi+No:12,+Kahramankazan,+Ankara&output=embed"
            width="100%"
            height="420"
            style="border:0;border-radius:14px"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "İletişim & Yol Tarifi | Dilek Perde Home — Kahramankazan / Ankara (0551 402 27 07)",
    description: "Dilek Perde Home adres: Atatürk Mahallesi, Kazım Karabekir Caddesi No: 12/A - 12/B Kahramankazan / Ankara. Sipariş ve ücretsiz ölçü hattı: 0551 402 27 07.",
    canonicalPath: "/iletisim",
    bodyContent
  });
}

function renderCalculatorPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Perde Ölçü &amp; Metraj Hesaplama</div>
        <span class="eyebrow">ONLINE PERDE METRAJ ROBOTU</span>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4.2vw,50px);margin-bottom:12px">Perde Ölçü, Pile Sıklığı (1x3 / 1x2.5) ve Kumaş Metrajı Hesaplama</h1>
        <p style="font-size:17px;color:var(--muted);max-width:780px">Pencerenizin en ve boy ölçüsünü girerek tül, fon, plise cam balkon, ahşap jaluzi ve zebra perde için gereken net kumaş miktarını saniyeler içinde hesaplayın.</p>
      </div>
    </div>
    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: "Perde Ölçü ve Fiyat Hesaplama Robotu (1x3 Sık Pile Metraj) | Dilek Perde Home",
    description: "Cama kaç metre tül ve fon perde gider? 1x3 sık pile, 1x2.5 normal pile tül perde ve m² cam balkon plise, zebra, ahşap jaluzi perde hesaplama aracı.",
    canonicalPath: "/perde-olcu-ve-fiyat-hesaplama",
    bodyContent
  });
}

function renderSitemap() {
  const urls = [
    ["/", "1.0", "daily"],
    ["/uygulamalarimiz", "0.9", "weekly"],
    ["/perde-olcu-ve-fiyat-hesaplama", "0.9", "weekly"],
    ["/hakkimizda", "0.8", "monthly"],
    ["/iletisim", "0.9", "monthly"],
    ...COLLECTIONS.map((c) => [`/koleksiyon/${c.slug}`, "0.9", "weekly"]),
    ...REGIONS.map((r) => [`/bolge/${r.slug}`, "0.9", "weekly"]),
    ...GUIDES.map((g) => [`/rehber/${g.slug}`, "0.8", "weekly"])
  ];
  const today = "2026-11-06";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, prio, freq]) => `  <url>
    <loc>${SITE.domain}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 301 Redirect www -> root domain
    if (url.hostname === "www.dilekperdehome.com") {
      url.hostname = "dilekperdehome.com";
      return Response.redirect(url.toString(), 301);
    }

    const path = url.pathname.replace(/\/+$/, "") || "/";

    // Serve static files from ./public via ASSETS binding
    if (
      path.startsWith("/images/") ||
      path === "/favicon.svg" ||
      path.endsWith(".jpg") ||
      path.endsWith(".png") ||
      path.endsWith(".svg") ||
      path.endsWith(".mp4") ||
      path.endsWith(".webp")
    ) {
      if (env && env.ASSETS) {
        return env.ASSETS.fetch(request);
      }
    }

    if (path === "/sitemap.xml") {
      return renderSitemap();
    }

    if (path === "/robots.txt") {
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\n`,
        { headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    let html = null;
    if (path === "/") {
      html = renderHomePage();
    } else if (path === "/uygulamalarimiz") {
      html = renderGalleryPage();
    } else if (path === "/hakkimizda") {
      html = renderAboutPage();
    } else if (path === "/iletisim") {
      html = renderContactPage();
    } else if (path === "/perde-olcu-ve-fiyat-hesaplama") {
      html = renderCalculatorPage();
    } else if (path.startsWith("/koleksiyon/")) {
      const slug = path.replace("/koleksiyon/", "");
      const col = COLLECTIONS.find((c) => c.slug === slug);
      if (col) html = renderCollectionPage(col);
    } else if (path.startsWith("/bolge/")) {
      const slug = path.replace("/bolge/", "");
      const reg = REGIONS.find((r) => r.slug === slug);
      if (reg) html = renderRegionPage(reg);
    } else if (path.startsWith("/rehber/")) {
      const slug = path.replace("/rehber/", "");
      const g = GUIDES.find((x) => x.slug === slug);
      if (g) html = renderGuidePage(g);
    }

    if (!html) {
      html = renderHomePage();
      return new Response(html, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=1800"
      }
    });
  }
};
