import { SITE, GALLERY_ITEMS, COLLECTIONS, REGIONS, GUIDES, REVIEWS, SEO_KEYWORDS } from "./data.js";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const ICONS = {
  phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  arrowRight: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  instagram: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
};

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
          `${SITE.domain}/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg`,
          `${SITE.domain}/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg`,
          `${SITE.domain}/images/gallery/klasik-salon-antrasit-fon-ve-pileli-tul-perde.jpg`
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
          <div class="kicker">TEKNİK METRAJ &amp; PİLE CETVELİ</div>
          <h2>Pencereniz İçin Gereken Kumaş Metrajını Hesaplayın</h2>
          <p>Özel dikim perdede kullanılacak net kumaş miktarı; korniş genişliğine ve tercih edilen <strong>pile oranına</strong> göre belirlenir. Pencerenizin en ve boy ölçüsünü girerek teknik metrajı görebilir, ölçünüzü doğrudan atölyemize ileterek seçtiğiniz kumaş serisine göre net fiyat teklifi alabilirsiniz.</p>
          <div class="calc-specs">
            <div class="spec-row">
              <span class="spec-idx">01</span>
              <div>
                <strong>1x3 Sık (Kanun) Pile Standardı</strong>
                <span>1 metre korniş genişliği için 3 metre kumaş kullanılır. Salonlarda en tok ve derinlikli dökümü sağlar.</span>
              </div>
            </div>
            <div class="spec-row">
              <span class="spec-idx">02</span>
              <div>
                <strong>1x2.5 Orta Pile / Boru Pile</strong>
                <span>1 metre genişlik için 2.5 metre kumaş kullanılır. Oturma odası, mutfak ve kalın dokulu keten tüller için dengelidir.</span>
              </div>
            </div>
            <div class="spec-row">
              <span class="spec-idx">03</span>
              <div>
                <strong>Mekanizmalı Sistemler (m²)</strong>
                <span>Plisell cam balkon, 50mm masif ahşap jaluzi, zebra ve stor perdeler En x Boy (m²) üzerinden ölçülendirilir.</span>
              </div>
            </div>
          </div>
        </div>
        <div class="calc-card">
          <div class="calc-card-head">
            <span>ATÖLYE ÖLÇÜ FORMU</span>
            <small>MİLİMETRİK HESAPLAMA</small>
          </div>
          <h3>Metraj &amp; Pile Hesaplayıcı</h3>
          <div class="form-row">
            <label for="c-type">Ürün Grubu</label>
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
              <label for="c-width">Korniş / Cam Genişliği (cm)</label>
              <input type="number" id="c-width" value="300" min="40" max="1200" step="5" />
            </div>
            <div class="form-row">
              <label for="c-height">Tavan – Zemin Yüksekliği (cm)</label>
              <input type="number" id="c-height" value="265" min="50" max="600" step="5" />
            </div>
          </div>
          <div class="form-row" id="pile-row">
            <label for="c-pile">Pile Oranı</label>
            <select id="c-pile">
              <option value="3" selected>1x3 Sık Pile (Salon Standardı — Tam Dolgun Duruş)</option>
              <option value="2.5">1x2.5 Orta Pile (Dengeli Döküm)</option>
              <option value="2">1x2 Seyrek / Amerikan Pile (Sade Form)</option>
            </select>
          </div>
          <div class="calc-result" id="calc-result">
            <div class="res-top">
              <div>
                <span class="res-label">Hesaplanan Net Metraj / Alan</span>
                <strong class="res-val" id="res-qty">9,00 Metre Tül</strong>
              </div>
              <div>
                <span class="res-label">Atölye Dikim Standardı</span>
                <strong class="res-sub" id="res-note">Etek Kurşunlu 1x3 Kanun Pile</strong>
              </div>
            </div>
            <p class="res-disclaimer">Brillant, keten, İtalyan kadife veya Plisell kartela alternatifleriyle bu ölçünün net maliyetini öğrenmek için doğrudan bilgi alabilirsiniz:</p>
            <a href="${SITE.whatsappUrl}" id="calc-wa-btn" target="_blank" rel="noopener" class="btn btn-primary btn-full">
              ${ICONS.whatsapp}
              <span>Bu Ölçü İçin Fiyat Teklifi İste (${escapeHtml(SITE.phoneDisplay)})</span>
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
          noteStr = '1x' + pile + ' Pile • Yükseklik: ' + h + ' cm';
        } else if(type === 'fon'){
          pRow.style.display = 'block';
          var boyM = ((h + 25) / 100);
          var ciftKanat = (boyM * 2 * (pile >= 2.5 ? 1.2 : 1)).toFixed(2).replace('.', ',');
          qtyStr = ciftKanat + ' Metre (Çift Kanat Fon)';
          noteStr = 'Sağ-Sol 2 Kanat Boru / Kanun Pile';
        } else {
          pRow.style.display = 'none';
          var m2 = Math.max(1.5, (w / 100) * (h / 100)).toFixed(2).replace('.', ',');
          qtyStr = m2 + ' m² Net Uygulama Alanı';
          noteStr = w + ' cm x ' + h + ' cm Alüminyum Kasa';
        }
        qEl.textContent = qtyStr;
        nEl.textContent = noteStr;
        var msg = 'Merhaba Dilek Hanım, dilekperdehome.com üzerinden ölçü hesapladım:\\n'
          + '• Ürün Grubu: ' + typeText + '\\n'
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

function renderLayout({ title, description, keywords = "", canonicalPath = "/", extraSchema = null, bodyContent }) {
  const canonicalUrl = `${SITE.domain}${canonicalPath}`;
  const schemas = [baseSchema()];
  if (extraSchema) schemas.push(extraSchema);
  const kwContent = keywords ? `${keywords}, ${SEO_KEYWORDS.slice(0, 15).join(", ")}` : SEO_KEYWORDS.join(", ");

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="google-site-verification" content="h4lWn2OfmVRUE4BinkQwjrJp5_1pJxxvj3hKGKcxzQk" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="keywords" content="${escapeHtml(kwContent)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="tr-TR" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="theme-color" content="#181513" />
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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

  ${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n  ")}

  <style>
    :root {
      --claret: #5E131E;
      --claret-dark: #3F0B13;
      --bronze: #9C7A44;
      --bronze-light: #C5A367;
      --alabaster: #F9F7F3;
      --linen: #F1ECE3;
      --stone: #E5DECFE6;
      --ink: #181513;
      --charcoal: #2B2623;
      --muted: #625A52;
      --line: #DCD4C8;
      --line-dark: #332D29;
      --white: #FFFFFF;
      --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
      --sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--sans);
      background: var(--alabaster);
      color: var(--ink);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      font-size: 15px;
    }
    a { color: inherit; text-decoration: none; transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease; }
    img, video { max-width: 100%; display: block; }
    .container { max-width: 1320px; margin: 0 auto; padding: 0 28px; }

    /* Corporate Institutional Topbar */
    .topbar {
      background: var(--ink);
      color: #D8D0C5;
      font-size: 11.5px;
      letter-spacing: 0.04em;
      padding: 9px 0;
      border-bottom: 1px solid var(--line-dark);
    }
    .topbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .topbar-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .topbar-sep {
      color: #4A423C;
    }
    .topbar a:hover { color: var(--bronze-light); }

    /* Main Architectural Header */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(249, 247, 243, 0.97);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--line);
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 84px;
      gap: 24px;
    }
    .brand-logo img {
      height: 54px;
      width: auto;
    }
    .main-nav {
      display: flex;
      align-items: center;
      gap: 28px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--charcoal);
    }
    .main-nav a {
      position: relative;
      padding: 6px 0;
    }
    .main-nav a::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 1.5px;
      background: var(--claret);
      transition: width 0.25s ease;
    }
    .main-nav a:hover { color: var(--claret); }
    .main-nav a:hover::after { width: 100%; }

    .header-cta {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: 1px solid var(--line);
      padding: 9px 12px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink);
      cursor: pointer;
    }
    .mobile-menu {
      display: none;
      background: var(--white);
      border-bottom: 1px solid var(--line);
      padding: 18px 28px 24px;
    }
    .mobile-menu.open { display: block; }
    .mobile-menu a {
      display: block;
      padding: 11px 0;
      border-bottom: 1px solid var(--linen);
      font-size: 13.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Architectural Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 13px 24px;
      border-radius: 2px;
      font-weight: 600;
      font-size: 12.5px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: all 0.22s ease;
      cursor: pointer;
      border: 1px solid transparent;
    }
    .btn-primary {
      background: var(--claret);
      color: var(--white);
      border-color: var(--claret);
    }
    .btn-primary:hover {
      background: var(--claret-dark);
      border-color: var(--claret-dark);
    }
    .btn-dark {
      background: var(--ink);
      color: var(--white);
      border-color: var(--ink);
    }
    .btn-dark:hover {
      background: var(--claret);
      border-color: var(--claret);
    }
    .btn-outline {
      background: transparent;
      color: var(--ink);
      border-color: #BDB3A4;
    }
    .btn-outline:hover {
      border-color: var(--ink);
      background: var(--white);
    }
    .btn-full { width: 100%; }

    /* Editorial Kicker / Overline */
    .kicker {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--claret);
      margin-bottom: 16px;
    }
    .kicker::before {
      content: "";
      display: inline-block;
      width: 28px;
      height: 1px;
      background: var(--bronze);
    }

    /* Hero Section */
    .hero {
      padding: 56px 0 0;
      background: var(--alabaster);
      border-bottom: 1px solid var(--line);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 56px;
      align-items: center;
      padding-bottom: 56px;
    }
    .hero h1 {
      font-family: var(--serif);
      font-size: clamp(38px, 4.4vw, 60px);
      line-height: 1.08;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 22px;
      letter-spacing: -0.01em;
    }
    .hero h1 em {
      color: var(--claret);
      font-style: italic;
      font-weight: 500;
    }
    .hero-lead {
      font-size: 16px;
      color: var(--muted);
      margin-bottom: 32px;
      max-width: 590px;
      line-height: 1.75;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 36px;
    }
    .hero-meta-note {
      display: flex;
      align-items: center;
      gap: 16px;
      padding-top: 22px;
      border-top: 1px solid var(--line);
      font-size: 13px;
      color: var(--muted);
    }
    .hero-meta-note strong {
      color: var(--ink);
      font-weight: 600;
    }

    /* Hero Architectural Showcase */
    .hero-showcase {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 18px;
      align-items: stretch;
    }
    .showcase-primary {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    .showcase-primary-img {
      aspect-ratio: 4 / 5.2;
      overflow: hidden;
      background: #231E1B;
    }
    .showcase-primary-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .showcase-secondary-col {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .showcase-secondary {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .showcase-secondary-img {
      flex: 1;
      min-height: 195px;
      overflow: hidden;
      background: #231E1B;
    }
    .showcase-secondary-img img, .showcase-secondary-img video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .showcase-caption {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
      font-size: 11.5px;
      color: var(--muted);
    }
    .showcase-caption strong {
      color: var(--ink);
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .showcase-caption span {
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--bronze);
      font-weight: 600;
    }

    /* Corporate Ledger Bar */
    .ledger-bar {
      border-top: 1px solid var(--line);
      background: var(--linen);
    }
    .ledger-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    .ledger-cell {
      padding: 26px 24px;
      border-right: 1px solid var(--line);
    }
    .ledger-cell:last-child { border-right: none; }
    .ledger-num {
      display: block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--bronze);
      margin-bottom: 6px;
    }
    .ledger-cell strong {
      display: block;
      font-family: var(--serif);
      font-size: 21px;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 4px;
    }
    .ledger-cell p {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.5;
    }

    /* Section Foundations */
    section { padding: 84px 0; }
    .sec-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 32px;
      margin-bottom: 48px;
      padding-bottom: 22px;
      border-bottom: 1px solid var(--line);
      flex-wrap: wrap;
    }
    .sec-header-left { max-width: 720px; }
    .sec-header h2 {
      font-family: var(--serif);
      font-size: clamp(30px, 3.4vw, 44px);
      font-weight: 600;
      color: var(--ink);
      line-height: 1.12;
      margin-bottom: 10px;
    }
    .sec-header p {
      color: var(--muted);
      font-size: 15.5px;
    }

    /* Collections Lookbook Grid */
    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 28px;
    }
    .col-card {
      background: var(--white);
      border: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      transition: border-color 0.25s ease, transform 0.25s ease;
    }
    .col-card:hover {
      border-color: var(--bronze);
      transform: translateY(-3px);
    }
    .col-img {
      position: relative;
      aspect-ratio: 4 / 3.2;
      overflow: hidden;
      background: #231c19;
    }
    .col-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      transition: transform 0.55s ease;
    }
    .col-card:hover .col-img img { transform: scale(1.04); }
    .col-index {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(24, 21, 19, 0.88);
      color: #F5F1EA;
      font-size: 10.5px;
      font-weight: 600;
      padding: 5px 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .col-body {
      padding: 26px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .col-body h3 {
      font-family: var(--serif);
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 10px;
      color: var(--ink);
      line-height: 1.2;
    }
    .col-body p {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 20px;
      flex: 1;
      line-height: 1.65;
    }
    .col-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid var(--linen);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--claret);
    }
    .col-foot span {
      color: var(--muted);
      font-weight: 500;
      text-transform: none;
      letter-spacing: 0;
      font-size: 12.5px;
    }

    /* Portfolio / Real Installations Section */
    .gallery-sec {
      background: var(--linen);
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 36px;
    }
    .filter-btn {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 10px 18px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-btn.active, .filter-btn:hover {
      background: var(--ink);
      color: var(--white);
      border-color: var(--ink);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 24px;
    }
    .gal-card {
      background: var(--white);
      border: 1px solid var(--line);
      display: flex;
      flex-direction: column;
    }
    .gal-media {
      position: relative;
      aspect-ratio: 4 / 4.6;
      overflow: hidden;
      background: #1b1513;
    }
    .gal-media img, .gal-media video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
    .gal-loc {
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(24, 21, 19, 0.86);
      color: #EFECE6;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 6px 12px;
    }
    .gal-info {
      padding: 18px 20px;
    }
    .gal-info h3 {
      font-family: var(--serif);
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--ink);
      line-height: 1.25;
    }
    .gal-info p {
      font-size: 13.5px;
      color: var(--muted);
      line-height: 1.55;
    }

    /* Technical Calculator Section */
    .calc-section {
      background: var(--ink);
      color: #F2ECE1;
      border-bottom: 1px solid var(--line-dark);
    }
    .calc-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 56px;
      align-items: center;
    }
    .calc-info .kicker { color: var(--bronze-light); }
    .calc-info h2 {
      font-family: var(--serif);
      font-size: clamp(30px, 3.5vw, 44px);
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--white);
      line-height: 1.15;
    }
    .calc-info p {
      color: #C6BDB1;
      margin-bottom: 28px;
      font-size: 15px;
      line-height: 1.7;
    }
    .calc-specs {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--line-dark);
    }
    .spec-row {
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--line-dark);
    }
    .spec-idx {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--bronze-light);
      padding-top: 3px;
    }
    .spec-row strong {
      display: block;
      color: var(--white);
      font-size: 14.5px;
      margin-bottom: 3px;
    }
    .spec-row span {
      font-size: 13px;
      color: #B4AA9E;
    }
    .calc-card {
      background: var(--alabaster);
      color: var(--ink);
      padding: 36px;
      border: 1px solid var(--bronze);
    }
    .calc-card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--line);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--bronze);
    }
    .calc-card h3 {
      font-family: var(--serif);
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 20px;
      color: var(--ink);
    }
    .form-row { margin-bottom: 16px; }
    .form-row label {
      display: block;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 7px;
      color: var(--charcoal);
    }
    .form-row select, .form-row input {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #C8BEB0;
      border-radius: 2px;
      font-size: 14px;
      font-family: var(--sans);
      background: var(--white);
      color: var(--ink);
    }
    .form-two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .calc-result {
      margin-top: 20px;
      padding: 20px;
      background: var(--linen);
      border: 1px solid var(--line);
    }
    .res-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 14px;
    }
    .res-label {
      display: block;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .res-val {
      font-family: var(--serif);
      font-size: 22px;
      color: var(--claret);
      font-weight: 700;
    }
    .res-sub {
      font-size: 13.5px;
      color: var(--ink);
      font-weight: 600;
    }
    .res-disclaimer {
      font-size: 12.5px;
      color: var(--muted);
      margin-bottom: 14px;
    }

    /* Client Testimonials & Showroom Strip */
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
    }
    .rev-card {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .rev-quote {
      font-family: var(--serif);
      font-size: 19px;
      line-height: 1.55;
      color: var(--ink);
      margin-bottom: 20px;
      font-style: italic;
    }
    .rev-meta {
      padding-top: 14px;
      border-top: 1px solid var(--linen);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--muted);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* Regional Service Directory */
    .region-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .region-card {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 18px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--ink);
    }
    .region-card:hover {
      border-color: var(--claret);
      color: var(--claret);
    }
    .region-card span {
      font-size: 11px;
      color: var(--bronze);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Inner Pages & Editorial Prose */
    .page-hero {
      padding: 52px 0;
      background: var(--linen);
      border-bottom: 1px solid var(--line);
    }
    .breadcrumb {
      font-size: 11.5px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .breadcrumb a { color: var(--claret); font-weight: 600; }
    .prose {
      background: var(--white);
      border: 1px solid var(--line);
      padding: 42px;
    }
    .prose h2 {
      font-family: var(--serif);
      font-size: 30px;
      font-weight: 600;
      color: var(--ink);
      margin: 28px 0 12px;
      line-height: 1.2;
    }
    .prose h2:first-child { margin-top: 0; }
    .prose h3 {
      font-family: var(--serif);
      font-size: 23px;
      font-weight: 600;
      margin: 22px 0 10px;
      color: var(--claret);
    }
    .prose p { margin-bottom: 16px; color: var(--charcoal); line-height: 1.75; }
    .prose ul, .prose ol { margin: 0 0 20px 22px; }
    .prose li { margin-bottom: 9px; color: var(--charcoal); }

    /* Corporate Footer */
    .site-footer {
      background: var(--ink);
      color: #D8D0C5;
      padding: 72px 0 36px;
      border-top: 2px solid var(--bronze);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.35fr 1fr 1fr 1.15fr;
      gap: 40px;
      margin-bottom: 52px;
    }
    .footer-col h4 {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--bronze-light);
      margin-bottom: 20px;
    }
    .footer-col ul { list-style: none; }
    .footer-col li {
      margin-bottom: 10px;
      font-size: 13.5px;
      color: #B8AFA3;
      line-height: 1.55;
    }
    .footer-col a:hover { color: var(--white); }
    .footer-bottom {
      padding-top: 26px;
      border-top: 1px solid var(--line-dark);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12px;
      color: #8C8277;
      letter-spacing: 0.03em;
    }

    /* Discreet Corporate Contact Bar */
    .floating-bar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
      display: flex;
      gap: 8px;
    }
    .float-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 18px;
      border-radius: 2px;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-shadow: 0 10px 26px rgba(0,0,0,0.22);
    }

    @media (max-width: 1024px) {
      .hero-grid, .calc-grid, .footer-grid { grid-template-columns: 1fr; }
      .ledger-grid { grid-template-columns: 1fr 1fr; }
      .ledger-cell { border-bottom: 1px solid var(--line); }
      .main-nav { display: none; }
      .mobile-toggle { display: inline-flex; }
    }
    @media (max-width: 640px) {
      .hero-showcase, .ledger-grid, .form-two, .res-top, .collections-grid { grid-template-columns: 1fr; }
      .header-cta .btn-outline { display: none; }
      .prose { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-left">
        <span class="topbar-item">${ICONS.pin} <span>${escapeHtml(SITE.address.full)}</span></span>
        <span class="topbar-sep">|</span>
        <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener">Harita &amp; Yol Tarifi</a>
      </div>
      <div class="topbar-right">
        <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" class="topbar-item">
          ${ICONS.instagram}
          <span>${escapeHtml(SITE.instagramHandle)}</span>
        </a>
        <span class="topbar-sep">|</span>
        <a href="tel:${SITE.phoneRaw}" class="topbar-item">
          ${ICONS.phone}
          <strong>Danışma &amp; Ölçü Hattı: ${escapeHtml(SITE.phoneDisplay)}</strong>
        </a>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo" aria-label="${escapeHtml(SITE.name)} Ana Sayfa">
        <img src="/images/logo.svg" alt="${escapeHtml(SITE.name)} Logo" width="270" height="54" />
      </a>
      <nav class="main-nav" aria-label="Ana Menü">
        <a href="/">Ana Sayfa</a>
        <a href="/#koleksiyonlar">Koleksiyonlar</a>
        <a href="/uygulamalarimiz">Referans Projeler</a>
        <a href="/perde-olcu-ve-fiyat-hesaplama">Metraj Hesaplama</a>
        <a href="/rehber">Atölye Notları</a>
        <a href="/hakkimizda">Kurumsal</a>
        <a href="/iletisim">İletişim</a>
      </nav>
      <div class="header-cta">
        <a href="tel:${SITE.phoneRaw}" class="btn btn-outline">${ICONS.phone} <span>${escapeHtml(SITE.phoneDisplay)}</span></a>
        <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary">${ICONS.whatsapp} <span>Ücretsiz Keşif</span></a>
        <button class="mobile-toggle" id="mobile-menu-btn" aria-label="Menüyü Aç">Menü</button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      <a href="/">Ana Sayfa</a>
      <a href="/#koleksiyonlar">Koleksiyonlar</a>
      <a href="/uygulamalarimiz">Referans Projeler</a>
      <a href="/perde-olcu-ve-fiyat-hesaplama">Teknik Metraj Hesaplama</a>
      <a href="/rehber">Atölye Notları &amp; Rehber</a>
      <a href="/bolge/kahramankazan-perdeci">Hizmet Bölgeleri</a>
      <a href="/hakkimizda">Kurumsal</a>
      <a href="/iletisim">İletişim &amp; Mağaza Konumu</a>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <img src="/images/logo-light.svg" alt="${escapeHtml(SITE.name)}" width="250" height="50" style="margin-bottom:18px" />
          <p style="font-size:13.5px;color:#B8AFA3;margin-bottom:16px;line-height:1.7">
            Kahramankazan Atatürk Mahallesi Kazım Karabekir Caddesi'ndeki showroomumuz ve özel dikim atölyemizle; konut, villa ve kurumsal projeler için tül, fon, Plisell plise, masif ahşap jaluzi ve mekanizmalı perde sistemleri üretiyoruz.
          </p>
          <p style="font-size:11.5px;letter-spacing:0.12em;text-transform:uppercase;color:var(--bronze-light)">
            Rideau Textile de Maison • Vorhang und Heimtext
          </p>
        </div>
        <div class="footer-col">
          <h4>Ürün Koleksiyonları</h4>
          <ul>
            ${COLLECTIONS.map((c) => `<li><a href="/koleksiyon/${c.slug}">${escapeHtml(c.shortTitle)}</a></li>`).join("")}
            <li><a href="/perde-olcu-ve-fiyat-hesaplama">Teknik Metraj &amp; Pile Hesaplama</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Hizmet Bölgeleri</h4>
          <ul>
            ${REGIONS.map((r) => `<li><a href="/bolge/${r.slug}">${escapeHtml(r.name)}</a></li>`).join("")}
            <li><a href="/rehber">Atölye &amp; Dekorasyon Rehberi</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Showroom &amp; Atölye</h4>
          <ul>
            <li><strong style="color:#F5F1EA">Adres:</strong> ${escapeHtml(SITE.address.full)}</li>
            <li><strong style="color:#F5F1EA">Telefon:</strong> <a href="tel:${SITE.phoneRaw}">${escapeHtml(SITE.phoneDisplay)}</a> (${escapeHtml(SITE.owner)})</li>
            <li><strong style="color:#F5F1EA">Instagram:</strong> <a href="${SITE.instagramUrl}" target="_blank" rel="noopener">${escapeHtml(SITE.instagramHandle)}</a></li>
            <li><strong style="color:#F5F1EA">Harita:</strong> <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener">Google Haritalar Konumu</a></li>
            <li><strong style="color:#F5F1EA">Çalışma Saatleri:</strong> ${escapeHtml(SITE.hours)}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${escapeHtml(SITE.name)} — ${escapeHtml(SITE.legalName)}. Tüm hakları saklıdır.</span>
        <span>Kahramankazan / Ankara • Türkiye &amp; Avrupa Özel Dikim Sevk</span>
      </div>
    </div>
  </footer>

  <div class="floating-bar">
    <a href="tel:${SITE.phoneRaw}" class="float-btn btn-dark">${ICONS.phone} <span>${escapeHtml(SITE.phoneDisplay)}</span></a>
    <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="float-btn btn-primary">${ICONS.whatsapp} <span>WhatsApp</span></a>
  </div>

  <script>
    (function(){
      var btn = document.getElementById('mobile-menu-btn');
      var menu = document.getElementById('mobile-menu');
      if(btn && menu){
        btn.addEventListener('click', function(){
          menu.classList.toggle('open');
        });
      }
    })();
  </script>
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
          <div class="kicker">KAHRAMANKAZAN &amp; ANKARA • ÖZEL DİKİM PERDE ATÖLYESİ</div>
          <h1>Mekânın Işığını ve Mimarisini Tamamlayan <em>Özel Dikim Perdeler</em></h1>
          <p class="hero-lead">
            Kahramankazan Kazım Karabekir Caddesi'ndeki mağazamız ve dikim atölyemizde; yüksek gramajlı keten ve grek tülleri, İtalyan kadife fonları, <strong>Plisell cam balkon sistemlerini</strong> ve <strong>50mm masif ahşap jaluzileri</strong> pencerelerinizin ölçüsüne özel hazırlıyor, kendi montaj ekibimizle teslim ediyoruz.
          </p>
          <div class="hero-actions">
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary">
              ${ICONS.whatsapp}
              <span>Ücretsiz Keşif &amp; Ölçü Randevusu</span>
            </a>
            <a href="tel:${SITE.phoneRaw}" class="btn btn-dark">
              ${ICONS.phone}
              <span>${escapeHtml(SITE.phoneDisplay)}</span>
            </a>
            <a href="/uygulamalarimiz" class="btn btn-outline">
              <span>Referans Uygulamalar</span>
              ${ICONS.arrowRight}
            </a>
          </div>
          <div class="hero-meta-note">
            <span><strong>Showroom:</strong> Atatürk Mah. Kazım Karabekir Cad. No: 12/A–B, Kahramankazan</span>
            <span>•</span>
            <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener" style="color:var(--claret);font-weight:600">Yol Tarifi Al →</a>
          </div>
        </div>

        <div class="hero-showcase">
          <div class="showcase-primary">
            <div class="showcase-primary-img">
              <img src="/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg" alt="Modern Salon Vizon Fon ve 1x3 Sık Pile Keten Tül Uygulaması" />
            </div>
            <div class="showcase-caption">
              <strong>Vizon Fon &amp; 1x3 Kanun Pile Keten Tül</strong>
              <span>SALON PROJESİ</span>
            </div>
          </div>
          <div class="showcase-secondary-col">
            <div class="showcase-secondary">
              <div class="showcase-secondary-img">
                <img src="/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg" alt="Kahramankazan Villa Panoramik İtalyan Kruvaze Tül Uygulaması" />
              </div>
              <div class="showcase-caption">
                <strong>Panoramik İtalyan Kruvaze Tül</strong>
                <span>VİLLA UYGULAMASI</span>
              </div>
            </div>
            <div class="showcase-secondary">
              <div class="showcase-secondary-img">
                <img src="/images/gallery/klasik-salon-antrasit-fon-ve-pileli-tul-perde.jpg" alt="Antrasit Fon ve Etek Kurşunlu Salon Tülü" />
              </div>
              <div class="showcase-caption">
                <strong>Antrasit Kanat Fon &amp; Dikey Dokulu Tül</strong>
                <span>KONUT PROJESİ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ledger-bar">
        <div class="container ledger-grid">
          <div class="ledger-cell">
            <span class="ledger-num">STANDART 01</span>
            <strong>Yerinde Kartela &amp; Işık Analizi</strong>
            <p>Kumaş dokularını mağaza spotu altında değil, kendi salonunuzun doğal gün ışığında ve mobilyalarınızın yanında seçiyoruz.</p>
          </div>
          <div class="ledger-cell">
            <span class="ledger-num">STANDART 02</span>
            <strong>Tam Metraj &amp; Etek Kurşunlu Dikim</strong>
            <p>1x3 sık kanun pile ve boru pile dikimlerde metrajdan ödün vermiyor, etek kurşunuyla ütüsüz formunu koruyan tüller üretiyoruz.</p>
          </div>
          <div class="ledger-cell">
            <span class="ledger-num">STANDART 03</span>
            <strong>700+ Gerçek Konut &amp; Villa Teslimatı</strong>
            <p>Kahramankazan, Ars Evleri, Eryaman, İncek ve Çayyolu'nda yüzlerce ailenin tüm daire perde tasarımını tamamladık.</p>
          </div>
          <div class="ledger-cell">
            <span class="ledger-num">STANDART 04</span>
            <strong>Türkiye &amp; Avrupa Özel Gönderim</strong>
            <p>Görüntülü kumaş seçimiyle Türkiye'nin 81 iline ve Almanya, Fransa, Hollanda'daki evlerin ray sistemine uyumlu dikim yapıyoruz.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="koleksiyonlar">
      <div class="container">
        <div class="sec-header">
          <div class="sec-header-left">
            <div class="kicker">ÜRÜN GRUPLARI &amp; KOLEKSİYONLAR</div>
            <h2>Mekâna Özel Dikim ve Mekanizmalı Perde Sistemleri</h2>
            <p>Brillant yetkili koleksiyonları ile seçkin keten, kadife, bambu, Plisell ve masif ıhlamur ağacı jaluzi serilerimiz.</p>
          </div>
          <a href="/perde-olcu-ve-fiyat-hesaplama" class="btn btn-outline">Metraj &amp; Pile Hesapla ${ICONS.arrowRight}</a>
        </div>
        <div class="collections-grid">
          ${COLLECTIONS.map((col, idx) => `
            <article class="col-card">
              <a href="/koleksiyon/${col.slug}" class="col-img">
                <img src="${col.heroImage}" alt="${escapeHtml(col.title)}" loading="lazy" />
                <span class="col-index">0${idx + 1} / ${escapeHtml(col.badge)}</span>
              </a>
              <div class="col-body">
                <h3><a href="/koleksiyon/${col.slug}">${escapeHtml(col.shortTitle)}</a></h3>
                <p>${escapeHtml(col.summary)}</p>
                <div class="col-foot">
                  <span>${escapeHtml(col.priceHint.slice(0, 42))}</span>
                  <a href="/koleksiyon/${col.slug}">İncele →</a>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="gallery-sec" id="uygulamalar">
      <div class="container">
        <div class="sec-header">
          <div class="sec-header-left">
            <div class="kicker">PORTFOLYO &amp; GERÇEK TESLİMATLAR</div>
            <h2>Atölyemizden Çıkan Konut ve Villa Uygulamaları</h2>
            <p>Sitemizde yer alan tüm görseller stok fotoğraf değil; Kahramankazan ve Ankara genelinde bizzat dikimini ve montajını gerçekleştirdiğimiz projelerdir.</p>
          </div>
          <a href="/uygulamalarimiz" class="btn btn-dark">Tüm Portfolyoyu Gör ${ICONS.arrowRight}</a>
        </div>

        <div class="filter-bar">
          <button class="filter-btn active" data-filter="all">Tümü (${GALLERY_ITEMS.length} Proje)</button>
          <button class="filter-btn" data-filter="Salon Perdeleri">Salon &amp; Kruvaze</button>
          <button class="filter-btn" data-filter="Fon Perdeler">Kadife &amp; Keten Fon</button>
          <button class="filter-btn" data-filter="Mutfak & Balkon">Mutfak &amp; 3 Boyutlu Tül</button>
          <button class="filter-btn" data-filter="Stor & Cam Balkon">Stor &amp; Cam Balkon</button>
          <button class="filter-btn" data-filter="Mağaza Showroom">Showroom &amp; Kartela</button>
        </div>

        <div class="gallery-grid" id="gal-grid">
          ${GALLERY_ITEMS.map((item) => `
            <article class="gal-card" data-cat="${escapeHtml(item.category)}">
              <div class="gal-media">
                <img src="${item.image}" alt="${escapeHtml(item.title)} - ${escapeHtml(item.location)}" loading="lazy" />
                <span class="gal-loc">${escapeHtml(item.location)}</span>
              </div>
              <div class="gal-info">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
              </div>
            </article>
          `).join("")}
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
        <div class="sec-header">
          <div class="sec-header-left">
            <div class="kicker">MÜŞTERİ REFERANSLARI</div>
            <h2>Teslim Ettiğimiz Projelerden Geri Bildirimler</h2>
            <p>Kahramankazan, Ars Evleri, Yeşilova, Eryaman ve İncek'te perde tasarım ve montaj hizmeti sunduğumuz müşterilerimizin değerlendirmeleri.</p>
          </div>
          <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener" class="btn btn-outline">Google İşletme Kaydımız ${ICONS.arrowRight}</a>
        </div>
        <div class="reviews-grid">
          ${REVIEWS.map((r) => `
            <div class="rev-card">
              <p class="rev-quote">"${escapeHtml(r.text)}"</p>
              <div class="rev-meta">
                <span>${escapeHtml(r.author)}</span>
                <span>${escapeHtml(r.location)} • ${escapeHtml(r.date)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section id="rehberler" style="background:var(--linen);border-top:1px solid var(--line)">
      <div class="container">
        <div class="sec-header">
          <div class="sec-header-left">
            <div class="kicker">ATÖLYE NOTLARI &amp; TEKNİK REHBER</div>
            <h2>Doğru Kumaş Seçimi, Ölçü Alma ve Bakım Kılavuzu</h2>
            <p>Perde metrajı hesaplama, pile oranları, kumaş dokuları ve yıkama standartları üzerine uzman incelemelerimiz.</p>
          </div>
          <a href="/rehber" class="btn btn-outline">Tüm Makaleler (${GUIDES.length}) ${ICONS.arrowRight}</a>
        </div>
        <div class="collections-grid">
          ${GUIDES.slice(0, 6).map((g, idx) => `
            <article class="col-card">
              <a href="/rehber/${g.slug}" class="col-img">
                <img src="${g.heroImage}" alt="${escapeHtml(g.title)}" loading="lazy" />
                <span class="col-index">REHBER 0${idx + 1} • ${escapeHtml(g.readTime)}</span>
              </a>
              <div class="col-body">
                <h3><a href="/rehber/${g.slug}">${escapeHtml(g.title)}</a></h3>
                <p>${escapeHtml(g.excerpt)}</p>
                <div class="col-foot">
                  <span>${escapeHtml(g.date)}</span>
                  <a href="/rehber/${g.slug}">Makaleyi Oku →</a>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section style="background:var(--alabaster);border-top:1px solid var(--line)">
      <div class="container">
        <div class="sec-header">
          <div class="sec-header-left">
            <div class="kicker">HİZMET BÖLGELERİMİZ</div>
            <h2>Yerinde Keşif, Ölçü ve Montaj Ağımız</h2>
            <p>Kahramankazan ve Ankara genelinde kendi servis aracımızla yerinde kartela sunumu; Türkiye'nin 81 ili ve Avrupa'ya kornişe hazır özel dikim gönderim.</p>
          </div>
          <a href="/iletisim" class="btn btn-primary">Mağaza İletişim &amp; Konum</a>
        </div>
        <div class="region-grid">
          ${REGIONS.map((r) => `
            <a href="/bolge/${r.slug}" class="region-card">
              <strong>${escapeHtml(r.name)}</strong>
              <span>Keşif &amp; Montaj →</span>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Dilek Perde Home | Kahramankazan & Ankara Özel Dikim Perde, Tül, Fon, Plise & Ahşap Jaluzi",
    description: "Kahramankazan ve Ankara'da özel dikim tül perde, kadife/keten fon perde, Plisell cam balkon perdesi, 50mm masif ahşap jaluzi ve stor perde tasarım atölyesi. Ücretsiz keşif: 0551 402 27 07.",
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
        <div class="kicker">${escapeHtml(col.badge)}</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:14px">${escapeHtml(col.title)}</h1>
        <p style="font-size:16px;color:var(--muted);max-width:760px">${escapeHtml(col.summary)}</p>
      </div>
    </div>

    <section>
      <div class="container" style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:40px;align-items:start">
        <div class="prose">
          ${col.bodyHtml}
          <h3>Atölye ve Kumaş Standartlarımız</h3>
          <ul>
            ${col.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
          </ul>
          ${col.faqs.length ? `
            <h2>Sıkça Sorulan Sorular</h2>
            ${col.faqs.map((f) => `
              <div style="margin-bottom:16px;padding:20px;background:var(--alabaster);border:1px solid var(--line)">
                <strong style="display:block;color:var(--ink);margin-bottom:6px;font-size:15.5px">${escapeHtml(f.q)}</strong>
                <p style="margin:0;font-size:14.5px;color:var(--muted)">${escapeHtml(f.a)}</p>
              </div>
            `).join("")}
          ` : ""}
        </div>

        <aside style="display:flex;flex-direction:column;gap:24px">
          <div style="background:var(--white);padding:14px;border:1px solid var(--line)">
            <img src="${col.heroImage}" alt="${escapeHtml(col.title)}" style="width:100%;aspect-ratio:4/4.5;object-fit:cover;object-position:center top;margin-bottom:14px" />
            <img src="${col.secondaryImage}" alt="${escapeHtml(col.shortTitle)} Uygulama Örneği" style="width:100%;aspect-ratio:4/3.2;object-fit:cover;object-position:center top" />
          </div>
          <div style="background:var(--ink);color:var(--white);padding:32px;border:1px solid var(--bronze)">
            <div class="kicker" style="color:var(--bronze-light)">ÜCRETSİZ KEŞİF &amp; KARTELA</div>
            <h3 style="font-family:var(--serif);font-size:28px;font-weight:600;margin-bottom:12px">Evinizin Işığında Birlikte Seçelim</h3>
            <p style="font-size:14px;color:#C6BDB1;margin-bottom:22px;line-height:1.65">Kahramankazan ve Ankara genelinde kartela numunelerimizle adresinize geliyor, mobilya ve duvar tonunuza en uygun dokuyu yerinde belirliyoruz.</p>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-full" style="margin-bottom:10px">${ICONS.whatsapp} <span>WhatsApp'tan Fiyat Teklifi Al</span></a>
            <a href="tel:${SITE.phoneRaw}" class="btn btn-outline btn-full" style="color:var(--white);border-color:#4A423C">${ICONS.phone} <span>${escapeHtml(SITE.phoneDisplay)}</span></a>
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
        <div class="kicker">${escapeHtml(reg.name.toUpperCase())} • YERİNDE KEŞİF &amp; MONTAJ</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:14px">${escapeHtml(reg.title)}</h1>
        <p style="font-size:16px;color:var(--muted);max-width:780px">${escapeHtml(reg.intro)}</p>
      </div>
    </div>

    <section>
      <div class="container" style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:40px;align-items:start">
        <div class="prose">
          <h2>${escapeHtml(reg.name)} Bölgesinde Sunduğumuz Perde ve Ev Tekstili Hizmetleri</h2>
          <p><strong>Dilek Perde Home</strong> olarak Kahramankazan Atatürk Mahallesi Kazım Karabekir Caddesi No: 12/A–B adresindeki showroomumuz ve özel dikim atölyemizle, <strong>${escapeHtml(reg.name)}</strong> bölgesindeki konut, villa ve kurumsal projelere aracısız atölye standartlarıyla hizmet veriyoruz.</p>
          <ul>
            <li><strong>Özel Dikim Tül Perdeler:</strong> Keten dokulu, grek, bambu, kapsül tül ve İtalyan kruvaze salon tülleri.</li>
            <li><strong>Kadife, Keten ve Blackout Fon Perdeler:</strong> Koltuk takımınızla birebir renk uyumunda boru pile ve kanun pile fon kanatlar.</li>
            <li><strong>Plisell Cam Balkon Perdesi:</strong> Katlanır ve sürgülü cam balkonlara milimetrik uyumlu, alttan ve üstten açılır ısı yalıtımlı plise perdeler.</li>
            <li><strong>50mm Doğal Ahşap Jaluzi &amp; Stor/Zebra:</strong> Masif ıhlamur ağacı jaluzi ve alüminyum kasalı bambu zebra perdeler.</li>
          </ul>
          <h3>Hizmet Verdiğimiz Başlıca Mahalle ve Yerleşimler</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px">
            ${reg.neighborhoods.map((n) => `<span style="background:var(--linen);border:1px solid var(--line);padding:6px 14px;font-size:12.5px;font-weight:600">${escapeHtml(n)}</span>`).join("")}
          </div>
          <h3>Çalışma Sürecimiz</h3>
          <ol>
            <li><strong>Randevu &amp; Ön Görüşme:</strong> <a href="tel:${SITE.phoneRaw}"><strong>${escapeHtml(SITE.phoneDisplay)}</strong></a> numaralı telefondan veya WhatsApp üzerinden bize ulaşırsınız.</li>
            <li><strong>Yerinde Kartela Sunumu &amp; Lazer Ölçü:</strong> Evinizin kendi ışığında koltuk ve duvar renginize göre kumaşları birlikte seçer, pencerelerinizi milimetrik ölçeriz.</li>
            <li><strong>Atölye Dikimi &amp; Profesyonel Montaj:</strong> Seçtiğiniz kumaşlar kendi ustalarımız tarafından dikilir, buharlı ütüden geçirilir ve korniş/mekanizma montajıyla eksiksiz teslim edilir.</li>
          </ol>
        </div>
        <aside style="display:flex;flex-direction:column;gap:24px">
          <div style="background:var(--white);padding:14px;border:1px solid var(--line)">
            <img src="${reg.heroImage}" alt="${escapeHtml(reg.title)}" style="width:100%;aspect-ratio:4/4.5;object-fit:cover;object-position:center top" />
          </div>
          <div style="background:var(--ink);color:var(--white);padding:32px;border:1px solid var(--bronze)">
            <div class="kicker" style="color:var(--bronze-light)">KEŞİF RANDEVUSU</div>
            <h3 style="font-family:var(--serif);font-size:28px;font-weight:600;margin-bottom:10px">${escapeHtml(reg.name)} Ölçü Hattı</h3>
            <p style="font-size:14px;color:#C6BDB1;margin-bottom:20px">Ücretsiz yerinde keşif ve kartela sunumu için doğrudan iletişime geçin:</p>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-full" style="margin-bottom:10px">${ICONS.whatsapp} <span>WhatsApp'tan Randevu Al</span></a>
            <a href="tel:${SITE.phoneRaw}" class="btn btn-outline btn-full" style="color:var(--white);border-color:#4A423C">${ICONS.phone} <span>${escapeHtml(SITE.phoneDisplay)}</span></a>
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
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.metaDesc,
    keywords: guide.keywords || SEO_KEYWORDS.join(", "),
    image: `${SITE.domain}${guide.heroImage}`,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { "@type": "Person", name: SITE.owner },
    publisher: { "@id": `${SITE.domain}/#organization` }
  };

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 4);

  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / <a href="/rehber">Atölye Notları &amp; Rehber</a> / ${escapeHtml(guide.title)}</div>
        <div class="kicker">ATÖLYE REHBERİ • ${escapeHtml(guide.readTime)}</div>
        <h1 style="font-family:var(--serif);font-size:clamp(32px,4vw,48px);font-weight:600;margin-bottom:12px">${escapeHtml(guide.title)}</h1>
        <p style="font-size:16px;color:var(--muted);max-width:760px">${escapeHtml(guide.excerpt)}</p>
      </div>
    </div>
    <section>
      <div class="container" style="max-width:940px">
        <div class="prose">
          <img src="${guide.heroImage}" alt="${escapeHtml(guide.title)}" style="width:100%;max-height:460px;object-fit:cover;object-position:center top;margin-bottom:28px;border:1px solid var(--line)" />
          ${guide.contentHtml}
          <div style="margin-top:32px;padding:26px;background:var(--linen);border:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
            <div>
              <strong style="display:block;font-family:var(--serif);font-size:22px;color:var(--ink)">Pencereniz için doğru kumaş ve ölçüyü birlikte belirleyelim</strong>
              <span style="font-size:14px;color:var(--muted)">Kahramankazan showroomumuza bekleriz veya WhatsApp'tan pencere fotoğrafınızı iletebilirsiniz.</span>
            </div>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary">${ICONS.whatsapp} <span>Danışma Hattı (${escapeHtml(SITE.phoneDisplay)})</span></a>
          </div>
          <h3 style="margin-top:36px">İlgili Diğer Teknik Rehberler</h3>
          <ul>
            ${otherGuides.map((og) => `<li><a href="/rehber/${og.slug}" style="color:var(--claret);font-weight:600">${escapeHtml(og.title)}</a></li>`).join("")}
          </ul>
        </div>
      </div>
    </section>
    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: guide.metaTitle,
    description: guide.metaDesc,
    keywords: guide.keywords || "",
    canonicalPath: `/rehber/${guide.slug}`,
    extraSchema: schema,
    bodyContent
  });
}

function renderGuidesIndexPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Atölye Notları &amp; Dekorasyon Rehberi</div>
        <div class="kicker">TEKNİK KILAVUZ &amp; DEKORASYON NOTLARI (${GUIDES.length} MAKALE)</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:12px">Perde Modelleri, Ölçü Alma ve Kumaş Seçim Rehberi</h1>
        <p style="font-size:16px;color:var(--muted);max-width:780px">Kahramankazan ve Ankara'daki perde atölyemizin deneyimiyle hazırlanan; tül, fon, cam balkon plise, ahşap jaluzi ve mekanizmalı perde incelemeleri.</p>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="collections-grid">
          ${GUIDES.map((g, idx) => `
            <article class="col-card">
              <a href="/rehber/${g.slug}" class="col-img">
                <img src="${g.heroImage}" alt="${escapeHtml(g.title)}" loading="lazy" />
                <span class="col-index">MAKALE ${idx + 1} • ${escapeHtml(g.readTime)}</span>
              </a>
              <div class="col-body">
                <h3><a href="/rehber/${g.slug}">${escapeHtml(g.title)}</a></h3>
                <p>${escapeHtml(g.excerpt)}</p>
                <div class="col-foot">
                  <span>${escapeHtml(g.date)}</span>
                  <a href="/rehber/${g.slug}">Makaleyi Oku →</a>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: "Perde Rehberi & Dekorasyon Notları | Dilek Perde Home",
    description: "Tül perde, fon perde, cam balkon plise perde, 50mm ahşap jaluzi, perde ölçüsü alma ve yıkama rehberleri. Dilek Perde Home uzman kılavuzu.",
    canonicalPath: "/rehber",
    bodyContent
  });
}

function renderGalleryPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Referans Projeler</div>
        <div class="kicker">UYGULAMA PORTFOLYOSU</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:12px">Teslim Ettiğimiz Konut, Villa ve Showroom Projeleri</h1>
        <p style="font-size:16px;color:var(--muted);max-width:780px">Kahramankazan merkez, Ars Evleri, Yeşilova Mahallesi, Eryaman ve İncek'te dikimini ve montajını gerçekleştirdiğimiz gerçek perde uygulamalarımız.</p>
      </div>
    </div>
    <section>
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:44px">
          <div class="gal-card">
            <div class="gal-media" style="aspect-ratio:16/10">
              <video controls autoplay loop muted playsinline poster="/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg">
                <source src="/images/gallery/showroom-vitrin-tur.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="gal-info">
              <h3>Kahramankazan Showroom &amp; Kartela Koleksiyonu (Kazım Karabekir Cad. No:12/A–B)</h3>
              <p>Yüzlerce tül, fon, ahşap jaluzi ve Plisell cam balkon kartelasını yakından inceleyebileceğiniz mağazamız.</p>
            </div>
          </div>
          <div class="gal-card">
            <div class="gal-media" style="aspect-ratio:16/10">
              <video controls autoplay loop muted playsinline poster="/images/gallery/cam-balkon-ve-mutfak-antrasit-stor-perde.jpg">
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
                <span class="gal-loc">${escapeHtml(item.location)}</span>
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
    title: "Referans Perde Uygulamalarımız | Kahramankazan & Ankara | Dilek Perde Home",
    description: "Dilek Perde Home tarafından Kahramankazan, Ars Evleri, Yeşilova, Eryaman ve İncek'te yapılan gerçek salon tül, fon, kruvaze, ahşap jaluzi ve stor perde uygulamaları.",
    canonicalPath: "/uygulamalarimiz",
    bodyContent
  });
}

function renderAboutPage() {
  const bodyContent = `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Kurumsal</div>
        <div class="kicker">KURUMSAL HİKAYEMİZ &amp; ATÖLYE DEĞERLERİMİZ</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:12px">Dilek Perde Home: Özel Dikim Geleneği ve Mimari Tekstil</h1>
        <p style="font-size:16px;color:var(--muted);max-width:780px">Her pencereyi kendi evimizin penceresi gibi ölçüyor, her dikişi yıllarca formunu koruyacak atölye disipliniyle tamamlıyoruz.</p>
      </div>
    </div>
    <section>
      <div class="container" style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:40px;align-items:start">
        <div class="prose">
          <h2>Doğru Kumaş, Tam Metraj ve Kusursuz İşçilik</h2>
          <p><strong>Dilek Perde Home</strong>, kurucumuz <strong>Dilek Hanım</strong> yönetiminde Ankara Kahramankazan'da (Atatürk Mahallesi, Kazım Karabekir Caddesi No: 12/A - 12/B) faaliyet gösteren kurumsal bir perde tasarım mağazası ve özel dikim atölyesidir.</p>
          <p>Hazır paket perdelerin aksine; her evin tavan yüksekliğinin, aldığı gün ışığının, koltuk ve halı dokusunun kendine özgü olduğunu biliyoruz. Bu doğrultuda mağazamızda <strong>Brillant</strong> başta olmak üzere Türkiye'nin önde gelen dokuma fabrikalarının keten, grek, kadife, şönil, bambu zebra, <strong>Plisell cam balkon</strong> ve <strong>masif ahşap jaluzi</strong> koleksiyonlarını sunuyoruz.</p>
          <h3>Atölye İlkelerimiz</h3>
          <ul>
            <li><strong>Eksiksiz Metraj ve Gerçek Pile:</strong> 1x3 sık pile sözü verdiğimizde kumaştan asla ödün vermeden tam metraj kullanırız.</li>
            <li><strong>Ütü ve Etek İşçiliği:</strong> Tüm tüllerimiz etek kurşunlu, yan dikişleri kasma yapmayan özel makinelerde dikilir ve buhar kazanlı ütüden geçerek asılır.</li>
            <li><strong>Avrupa ve Türkiye Geneli Güvenli Sipariş:</strong> Almanya, Fransa, Hollanda ve Türkiye'nin dört bir yanındaki müşterilerimize görüntülü kumaş seçimiyle özel dikim gönderim sağlıyoruz.</li>
          </ul>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <img src="/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg" alt="Dilek Perde Home Salon Uygulaması" style="border:1px solid var(--line);aspect-ratio:3/4;object-fit:cover" />
          <img src="/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg" alt="Dilek Perde Home Villa Projesi" style="border:1px solid var(--line);aspect-ratio:3/4;object-fit:cover" />
          <img src="/images/gallery/klasik-salon-antrasit-fon-ve-pileli-tul-perde.jpg" alt="Dilek Perde Fon ve Tül" style="border:1px solid var(--line);aspect-ratio:3/4;object-fit:cover" />
          <img src="/images/gallery/haki-yesil-kadife-fon-perde-ve-dikey-tul.jpg" alt="Dilek Perde Kadife Fon" style="border:1px solid var(--line);aspect-ratio:3/4;object-fit:cover" />
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Kurumsal | Dilek Perde Home — Kahramankazan & Ankara Perde Tasarım Atölyesi",
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
        <div class="kicker">KAHRAMANKAZAN MERKEZ SHOWROOM</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:12px">İletişim, Keşif Randevusu &amp; Yol Tarifi</h1>
        <p style="font-size:16px;color:var(--muted);max-width:760px">Showroomumuzda kumaş koleksiyonlarımızı yakından inceleyebilir veya ücretsiz yerinde ölçü randevusu oluşturabilirsiniz.</p>
      </div>
    </div>
    <section>
      <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start">
        <div class="prose">
          <h2>Showroom &amp; Atölye İletişim Bilgileri</h2>
          <p><strong>Kurumsal Unvan:</strong> ${escapeHtml(SITE.name)} (${escapeHtml(SITE.legalName)})</p>
          <p><strong>Müşteri İlişkileri &amp; Tasarım:</strong> ${escapeHtml(SITE.owner)}</p>
          <p><strong>Adres:</strong> ${escapeHtml(SITE.address.full)}</p>
          <p><strong>Telefon &amp; Keşif Hattı:</strong> <a href="tel:${SITE.phoneRaw}" style="color:var(--claret);font-weight:700;font-size:18px">${escapeHtml(SITE.phoneDisplay)}</a></p>
          <p><strong>Instagram:</strong> <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" style="color:var(--claret);font-weight:600">${escapeHtml(SITE.instagramHandle)}</a></p>
          <p><strong>Çalışma Saatleri:</strong> ${escapeHtml(SITE.hours)}</p>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:28px">
            <a href="tel:${SITE.phoneRaw}" class="btn btn-dark">${ICONS.phone} <span>Hemen Ara (${escapeHtml(SITE.phoneDisplay)})</span></a>
            <a href="${SITE.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary">${ICONS.whatsapp} <span>WhatsApp'tan Mesaj Gönder</span></a>
            <a href="${SITE.googleShareUrl}" target="_blank" rel="noopener" class="btn btn-outline">${ICONS.pin} <span>Google Haritalar'da Aç</span></a>
          </div>
        </div>
        <div style="background:var(--white);padding:16px;border:1px solid var(--line)">
          <iframe
            title="Dilek Perde Home Kahramankazan Harita Konumu"
            src="https://www.google.com/maps?q=Atat%C3%BCrk+Mahallesi,+Kaz%C4%B1m+Karabekir+Caddesi+No:12,+Kahramankazan,+Ankara&output=embed"
            width="100%"
            height="430"
            style="border:0"
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
        <div class="breadcrumb"><a href="/">Ana Sayfa</a> / Teknik Metraj &amp; Pile Hesaplama</div>
        <div class="kicker">TEKNİK METRAJ CETVELİ</div>
        <h1 style="font-family:var(--serif);font-size:clamp(34px,4.2vw,52px);font-weight:600;margin-bottom:12px">Perde Ölçü, Pile Sıklığı (1x3 / 1x2.5) ve Kumaş Metrajı Hesaplama</h1>
        <p style="font-size:16px;color:var(--muted);max-width:780px">Pencerenizin en ve boy ölçüsünü girerek tül, fon, plise cam balkon, ahşap jaluzi ve zebra perde için gereken net kumaş miktarını hesaplayın.</p>
      </div>
    </div>
    ${calculatorWidgetHtml()}
  `;

  return renderLayout({
    title: "Perde Ölçü ve Metraj Hesaplama Cetveli (1x3 Sık Pile) | Dilek Perde Home",
    description: "Cama kaç metre tül ve fon perde gider? 1x3 sık pile, 1x2.5 normal pile tül perde ve m² cam balkon plise, zebra, ahşap jaluzi perde hesaplama aracı.",
    canonicalPath: "/perde-olcu-ve-fiyat-hesaplama",
    bodyContent
  });
}

function renderSitemap() {
  const urls = [
    ["/", "1.0", "daily"],
    ["/rehber", "0.9", "daily"],
    ["/uygulamalarimiz", "0.9", "weekly"],
    ["/perde-olcu-ve-fiyat-hesaplama", "0.9", "weekly"],
    ["/hakkimizda", "0.8", "monthly"],
    ["/iletisim", "0.9", "monthly"],
    ...COLLECTIONS.map((c) => [`/koleksiyon/${c.slug}`, "0.9", "weekly"]),
    ...REGIONS.map((r) => [`/bolge/${r.slug}`, "0.9", "weekly"]),
    ...GUIDES.map((g) => [`/rehber/${g.slug}`, "0.8", "weekly"])
  ];
  const today = new Date().toISOString().slice(0, 10);
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
    } else if (path === "/rehber" || path === "/blog") {
      html = renderGuidesIndexPage();
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
