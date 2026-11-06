#!/usr/bin/env node
/**
 * Dilek Perde Home (dilekperdehome.com) — Otonom Günlük Perde & Ev Tekstili SEO Blog Robotu
 * - Günde 2 kez (her 12 saatte bir) Cloudflare Container (kibris-akis-tur) tarafından otomatik çalıştırılır.
 * - Zengin teknik makale havuzundan (veya havuz bittiğinde Anthropic Claude API ile) kapsamlı, tablolu ve SSS şemalı yeni bir rehber yayınlar.
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
    slug: "cocuk-ve-genc-odasi-perde-modelleri-2026",
    title: "Çocuk ve Genç Odası Perde Modelleri: Anti-Alerjik Tül, Zebra ve Karartma Stor Seçimi",
    metaTitle: "Çocuk ve Genç Odası Perde Modelleri 2026 | Dilek Perde Home",
    metaDesc: "Bebek, çocuk ve genç odaları için toz tutmayan anti-alerjik tül perde, renkli keten fon ve uyku düzeni sağlayan blackout stor perde modelleri.",
    keywords: "çocuk odası perde modelleri, genç odası perde modelleri, bebek odası perde seçimi, çocuk odası stor perde",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/incek-ankara-daire-stor-ve-guneslik-perde.jpg",
    excerpt: "Çocukların sağlıklı uykusu, çalışma masası ışık kontrolü ve güvenli kullanımı için zincir emniyetli stor, doğal keten tül ve blackout karşılaştırması.",
    contentHtml: `
      <h2>Bebek, Çocuk ve Genç Odalarında Yaş Grubuna Göre Perde Planlaması</h2>
      <p>Çocuk ve genç odalarında perde seçimi yapılırken güvenlik, anti-alerjik doku (toz tutmama) ve uyku saatlerindeki karartma performansı görsellik kadar önemlidir. <strong>Dilek Perde Home</strong> olarak Kahramankazan ve Ankara'daki ailelerimize yaş grubuna göre şu teknik çözümleri öneriyoruz:</p>

      <table>
        <thead>
          <tr>
            <th>Oda Grubu</th>
            <th>Önerilen Tül / Ana Perde</th>
            <th>Güneşlik / Karartma Çözümü</th>
            <th>Güvenlik & Sağlık Kriteri</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>0–4 Yaş Bebek Odası</strong></td>
            <td>Petek üstü boyda doğal pamuk-bambu dokulu tül</td>
            <td>%100 Işık Kesen Termal Blackout Stor veya Fon</td>
            <td>Gündüz uykusu için tam karartma ve kordonsuz çocuk emniyet klipsi</td>
          </tr>
          <tr>
            <td><strong>5–11 Yaş Çocuk Odası</strong></td>
            <td>Yıkanabilir ince grek tül + tek/çift kanat keten fon</td>
            <td>Kornişe uyumlu ekru stor güneşlik</td>
            <td>Emekleme ve oyun alanında yere değmeyen (petek üstü) hijyenik boy</td>
          </tr>
          <tr>
            <td><strong>12+ Yaş Genç & Çalışma Odası</strong></td>
            <td>50mm Masif Ahşap Jaluzi, Screen Stor veya Bambu Zebra</td>
            <td>Kendinden kademeli ışık kontrolü</td>
            <td>Bilgisayar ekranındaki güneş yansımasını (parlamayı) kesen mat yüzey</td>
          </tr>
        </tbody>
      </table>

      <h2>Çocuk Odalarında Neden Petek Üstü Boy ve Doğal Dokuma Seçilmeli?</h2>
      <ul>
        <li><strong>Toz ve Akar Tutmayan Kumaş:</strong> Ağır kadife veya tüylü şönil kumaşlar yerine sık dokunmuş düz keten ve mikro-bambu tüller havadaki tozu barındırmaz; alerjik bünyeli çocuklar için idealdir.</li>
        <li><strong>Isı Verimliliği:</strong> Çocuk odalarında çalışma masası veya yatak genellikle pencere önüne yakın konumlandırılır. Petek üstünden 2 cm yukarıda biten tül perdeler kaloriferin odayı homojen ısıtmasını sağlar.</li>
        <li><strong>Çocuk Güvenlik Aparatı:</strong> Stor ve zebra perdelerin zincir mekanizmaları duvara sabitlenen gergi klipsi ile teslim edilir.</li>
      </ul>
    `,
    faqs: [
      {
        q: "Bebek odasında gündüz uykusu için blackout stor mu yoksa blackout fon perde mi daha kullanışlı?",
        a: "Tül perdenin hemen arkasındaki korniş kanalına takılan Blackout Stor Güneşlik hem gündüz tamamen yukarı toplanarak pencereyi ferah bırakır hem de indirildiğinde camı sıfır kapatarak tam karanlık sağlar."
      },
      {
        q: "Çocuk odası perdeleri kaç derecede yıkanmalı?",
        a: "Anti-alerjik bambu ve grek tüller 30–40 derecede parfümsüz bebek deterjanıyla, 400 devirde yıkanıp nemli olarak kornişe asılabilir; ütü gerektirmez."
      }
    ]
  },
  {
    slug: "rustik-perde-modelleri-ahsap-ve-metal-borulu-perdeler",
    title: "Rustik Perde Modelleri: Korniş Olmayan Pencereler ve Kış Bahçeleri İçin Şık Çözümler",
    metaTitle: "Rustik Perde Modelleri | Ahşap & Metal Rustik Borulu Perde | Dilek Perde",
    metaDesc: "Tavan kornişi olmayan pencereler, çatı katları ve modern salonlar için halkalı, kapsüllü ve ahşap/pirinç rustik borulu tül ve fon perde modelleri.",
    keywords: "rustik perde modelleri, rustik borulu perde, halkalı perde modelleri, kapsüllü fon perde, kış bahçesi perdesi",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/luks-salon-gold-tarcin-fon-perde-montaji.jpg",
    excerpt: "Tavanında kartonpiyer veya korniş bulunmayan pencerelerde, çatı dublekslerinde ve taş/ahşap evlerde duvara monte edilen dekoratif rustik boru sistemleri.",
    contentHtml: `
      <h2>Hangi Pencerelerde Tavan Kornişi Yerine Rustik Perde Tercih Edilir?</h2>
      <p>Çatı dublekslerindeki eğimli tavanlarda, kemerli pencerelerde, kış bahçelerinde veya tavan yüksekliği 3 metreyi aşan taş/ahşap villalarda tavana plastik korniş takmak teknik olarak zor veya estetik açıdan uyumsuzdur. Bu mekânlarda pencere üst duvarına (alana) monte edilen <strong>masif ahşap, mat siyah demir, antik pirinç veya krom rustik borular</strong> hem taşıyıcı mekanizma hem de dekoratif bir tasarım öğesi olarak kullanılır.</p>

      <table>
        <thead>
          <tr>
            <th>Rustik Perde Sistemi</th>
            <th>Çalışma Mekanizması</th>
            <th>Önerilen Kumaş & Stil</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Kapsüllü (Kuşgözü) Rustik</strong></td>
            <td>Kumaşın üst başlığına çakılan 40mm paslanmaz metal halkalar doğrudan borunun içinden geçer</td>
            <td>Modern ve spor salonlar; doğal keten fonlar ve kalın dokulu tüllerde geniş S dalgası oluşturur</td>
          </tr>
          <tr>
            <td><strong>Ahşap / Metal Halkalı Rustik</strong></td>
            <td>Boruya dizilen seyyar halkaların altındaki klipslere ekstraforlu perde takılır</td>
            <td>Country, klasik ve rustik mobilyalı evler; ceviz, meşe ve eskitme pirinç başlıklarla kullanılır</td>
          </tr>
          <tr>
            <td><strong>Raylı (Alüminyum Kanallı) Çift Rustik</strong></td>
            <td>Dıştan yuvarlak boru görünümündedir ancak alt kısmında gizli rulet kanalı bulunur</td>
            <td>Hem tül hem fon perdenin aynı anda takılması gereken salon ve yatak odaları için en pratik sistemdir</td>
          </tr>
        </tbody>
      </table>

      <h2>Rustik Perde Montajında Duvar Payı ve Ayak Seçimi</h2>
      <ul>
        <li><strong>Çift Borulu Braketi (Ayak):</strong> Hem tül hem de fon perde kullanılacaksa, duvara tek bir sağlam metal ayak monte edilir; bu ayağın arka yuvasına ince tül borusu, ön yuvasına ise kalın (28mm–35mm) fon borusu yerleştirilir.</li>
        <li><strong>Yıkanabilir Paslanmaz Kapsül:</strong> Atölyemizde kumaşa preslenen kuşgözü kapsüller plastik değil, nikel/pirinç kaplama paslanmaz metaldir; çamaşır makinesinde yıkandığında kumaşa pas lekesi bırakmaz ve yerinden çıkmaz.</li>
      </ul>
    `,
    faqs: [
      {
        q: "2.5 metreden daha geniş pencerelerde rustik boru ortadan esneme yapar mı?",
        a: "220 cm üzeri genişliklerde borunun tam orta noktasına üçüncü bir taşıyıcı orta ayak (braket) monte ediyoruz. Böylece ağır kadife fon perdeler takılsa bile boruda milim esneme olmaz."
      },
      {
        q: "Kapsüllü rustik perdeler çamaşır makinesinde nasıl yıkanır?",
        a: "Üstteki metal halkaları üst üste toplayıp bir bez torba veya perde yıkama filesi içine bağlayarak 30 derecede güvenle yıkayabilirsiniz."
      }
    ]
  },
  {
    slug: "ofis-ve-isyeri-perde-modelleri-jaluzi-ve-screen-stor",
    title: "Ofis, Muayenehane ve İşyeri Perde Modelleri: Screen Stor, Dikey ve Alüminyum/Ahşap Jaluzi",
    metaTitle: "Ofis Perde Modelleri | Screen Stor & Ahşap Jaluzi | Dilek Perde Home",
    metaDesc: "Kahramankazan Saray OSB fabrika yönetim binaları ve Ankara ofisleri için güneş kırıcı screen stor, 50mm ahşap jaluzi ve dikey perde sistemleri.",
    keywords: "ofis perde modelleri, screen stor perde, fabrika ofis perdesi, kahramankazan saray osb perdeci, alüminyum jaluzi perde",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/ahsap-jaluzi-ve-antrasit-fon-perde-kazan.jpg",
    excerpt: "Kahramankazan Saray OSB fabrika idari binaları, klinikler ve Ankara ofislerinde bilgisayar ekranı parlamasını kesen kurumsal perde çözümleri.",
    contentHtml: `
      <h2>Kurumsal Ofis ve Fabrika Yönetim Binalarında Doğru Perde Seçimi</h2>
      <p>Çalışma alanlarında perde seçimi ev tekstilinden farklı olarak <strong>ekran yansıması (glare) kontrolü, alev geciktiricilik (FR sertifikası), akustik konfor ve kurumsal prestij</strong> kriterlerine dayanır. <strong>Dilek Perde Home</strong> olarak Kahramankazan Saray OSB, Keresteciler Sanayi Sitesi ve Ankara genelindeki şirket merkezlerine faturalı, anahtar teslim kurumsal perde projeleri uyguluyoruz.</p>

      <table>
        <thead>
          <tr>
            <th>Kurumsal Mekân Tipi</th>
            <th>En Uygun Perde Sistemi</th>
            <th>Teknik Avantajı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Yönetici & Makam Odaları</strong></td>
            <td>50mm Masif Ihlamur Ahşap Jaluzi (Ceviz / Antrasit / Siyah)</td>
            <td>Deri ve ahşap ofis mobilyalarıyla üst düzey prestij sağlar, ışık açısını milimetrik yönetir</td>
          </tr>
          <tr>
            <td><strong>Açık Ofis & Mühendislik Katları</strong></td>
            <td>%3 – %5 Açıklıklı Sun Screen (Güneş Kırıcı) Stor Perde</td>
            <td>Gündüz dışarıdaki manzarayı kapatmadan bilgisayar ekranlarındaki güneş parlamasını ve ısıyı %85 keser</td>
          </tr>
          <tr>
            <td><strong>Toplantı & Sunum Salonları</strong></td>
            <td>Motorlu veya Zincirli %100 Blackout Stor Perde</td>
            <td>Projeksiyon ve LED ekran sunumları sırasında odayı saniyeler içinde tam karartır</td>
          </tr>
          <tr>
            <td><strong>Klinik, Muayenehane & Laboratuvar</strong></td>
            <td>25mm Mikro Alüminyum Jaluzi veya PVC Dikey Perde</td>
            <td>Dezenfektanla silinebilir, bakteri ve toz barındırmaz, hijyen yönetmeliğine tam uyumludur</td>
          </tr>
        </tbody>
      </table>

      <h2>Sun Screen (Güneş Kırıcı) Kumaş Teknolojisi Nedir?</h2>
      <p>Cam cepheli modern ofis binalarında klasik stor perdeyi indirdiğinizde oda kararır ve gündüz vakti tepe aydınlatmalarını yakmak zorunda kalırsınız. Oysa fiberglas ve PVC kaplı teknik ipliklerle dokunan <strong>Sun Screen stor perdeler</strong> mikro gözenekli yapısı sayesinde zararlı UV ışınlarını ve sera ısısını bloke ederken, içeriden dışarının net şekilde görünmesine izin verir; aynı zamanda gündüz dışarıdan içerinin görünmesini engeller.</p>
    `,
    faqs: [
      {
        q: "Fabrika ve kurumsal ofis projeleri için yerinde keşif ve kurumsal fatura kesiyor musunuz?",
        a: "Evet. Saray OSB, Kahramankazan ve Ankara genelindeki tüm fabrika, okul, klinik ve ofis projelerinde aynı gün ücretsiz metraj keşfi yapıyor, kurumsal teklif dosyası ve e-Fatura ile teslimat sağlıyoruz."
      },
      {
        q: "Şirket logolu (dijital baskılı) stor perde üretiminiz var mı?",
        a: "Evet, dış cepheye bakan ofis camlarınız veya mağaza vitrinleriniz için yüksek çözünürlüklü kurumsal logo baskılı stor ve screen perde üretimi yapmaktayız."
      }
    ]
  },
  {
    slug: "kucuk-ve-alcak-tavanli-salonlari-genis-gosteren-perde-hileleri",
    title: "Küçük veya Alçak Tavanlı Salonları Daha Geniş ve Yüksek Gösteren 6 Perde Hilesi",
    metaTitle: "Küçük Salonları Geniş Gösteren Perde Seçimi | Dilek Perde Home",
    metaDesc: "Dar pencereli ve alçak tavanlı odaları daha ferah, aydınlık ve yüksek tavanlı göstermek için doğru perde rengi, boyu ve fon kanat yerleşimi.",
    keywords: "küçük salon için perde modelleri, tavanı yüksek gösteren perde, dar pencere perde modelleri, ferah salon perdeleri",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/kahramankazan-villa-italyan-kruvaze-tul-perde.jpg",
    excerpt: "Fon kanatları pencere camının dışındaki duvar payına taşıyarak cam alanını %30 daha geniş ve tavanı daha yüksek gösterme teknikleri.",
    contentHtml: `
      <h2>Dar Pencereli ve Alçak Tavanlı Odalarda Mimari İllüzyon Teknikleri</h2>
      <p>Metrekaresi küçük olan salonlarda veya tavan yüksekliği 255 cm'nin altında kalan dairelerde yanlış perde seçimi odayı olduğundan daha basık gösterebilir. <strong>Dilek Perde Home</strong> tasarım ekibimizin küçük salonları ferahlatmak için uyguladığı 6 iç mimari kural:</p>

      <table>
        <thead>
          <tr>
            <th>Yapılan Yaygın Hata</th>
            <th>Doğru Mimari Uygulama</th>
            <th>Odaya Kazandırdığı Etki</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fon kanatları pencere camının üstüne gelecek şekilde asmak</td>
            <td>Kornişi pencereden sağa-sola 45 cm uzatıp fonları sağır duvarın üstüne asmak</td>
            <td>Pencere camı tamamen açık kalır; cam olduğundan 80–90 cm daha geniş algılanır ve gün ışığı %35 artar</td>
          </tr>
          <tr>
            <td>Petek üstünde biten kısa salon tülü kullanmak</td>
            <td>Tavandan zemine kadar kesintisiz inen (-2 cm) tam boy dikey dokulu tül kullanmak</td>
            <td>Dikey çizgiler gözü yukarıdan aşağıya yönlendirerek tavanı 20–30 cm daha yüksek gösterir</td>
          </tr>
          <tr>
            <td>Duvar rengiyle zıt, çok koyu ve desenli ağır fonlar seçmek</td>
            <td>Duvar boyasından sadece 1–2 ton koyu (krem, taş, açık vizon) monokrom fon seçmek</td>
            <td>Duvar ile perde arasındaki keskin sınır kalkar, salonun derinlik algısı büyür</td>
          </tr>
        </tbody>
      </table>

      <h2>Küçük Salonlarda Dikey Dokulu Keten ve Boru Pile Avantajı</h2>
      <ul>
        <li><strong>Dikey Çizgili ve Kapsül Tüller:</strong> Enine desenli (yatay şeritli) tüller odayı basıklaştırırken, kendinden dikey yağmur çizgili keten tüller tavana yükseklik katar.</li>
        <li><strong>60–70 cm Dar Formlu Boru Pile Fonlar:</strong> Küçük odalarda 100 cm genişliğinde devasa fon kanatlar yerine, 4–5 boru pileden oluşan 65 cm'lik zarif dikey kanatlar çok daha dengeli durur.</li>
      </ul>
    `,
    faqs: [
      {
        q: "Küçük salonda kruvaze perde kullanılır mı?",
        a: "Eğer pencereniz 2 metreden darsa iki yana toplanan ağır kruvaze katmanlar camı kapatabilir. Bunun yerine 1x3 sık pile düz keten tül ve yanlarda ince boru pile fon kanatlar küçük salonu çok daha ferah gösterir."
      },
      {
        q: "Pencerenin bir tarafında kolon (duvar sıfır) varsa fon perde nasıl takılır?",
        a: "Asimetrik pencerelerde kolon olan tarafa fon takmayıp, sadece geniş duvar payı olan tarafa tek kanat fon ve mıknatıslı braçol uygulamak hem modern durur hem de camı daraltmaz."
      }
    ]
  },
  {
    slug: "keten-tul-perde-mi-grek-tul-perde-mi-karsilastirma",
    title: "Keten Tül Perde mi, Grek Tül Perde mi? Doku, Yıkama ve Işık Geçirgenliği Karşılaştırması",
    metaTitle: "Keten Tül mü Grek Tül mü? Hangisi Daha Kullanışlı? | Dilek Perde Home",
    metaDesc: "Salon ve oturma odası için keten tül perde ile grek tül perde arasındaki farklar: hangisi ütü istemez, hangisi kedi tırnağına ve yıkamaya daha dayanıklıdır?",
    keywords: "keten tül mü grek tül mü, keten tül perde kullananlar, grek tül perde özellikleri, ütü istemeyen tül perde hangisi",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/klasik-salon-antrasit-fon-ve-pileli-tul-perde.jpg",
    excerpt: "Doğal mat görünüm arayanlar için keten dokulu tül ile yoğun kullanım, çocuklu ve evcil hayvanlı evler için kırılmaz grek tülün teknik karşılaştırması.",
    contentHtml: `
      <h2>Keten Dokulu Tül ve Grek Tül Arasındaki Teknik Farklar</h2>
      <p>Mağazamıza gelen müşterilerimizin salon ve oturma odası için en çok arasında kaldığı iki temel kumaş grubu <strong>Doğal Keten Dokulu Tüller</strong> ve <strong>Grek (File Gözenekli) Tüller</strong>dir. Her iki kumaş da ütü istemeyen yeni nesil teknolojiyle üretilse de doku ve dayanım açısından farklı üstünlüklere sahiptir:</p>

      <table>
        <thead>
          <tr>
            <th>Karşılaştırma Kriteri</th>
            <th>Keten Dokulu Tül Perde</th>
            <th>Grek (File Örgü) Tül Perde</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Yüzey Görünümü</strong></td>
            <td>Tamamen mat, doğal lif geçişli (şantuklu), dingin ve sıcak görünüm</td>
            <td>Mikro geometrik gözenekli, hafif ipeksi ve tok dökümlü görünüm</td>
          </tr>
          <tr>
            <td><strong>Gündüz Mahremiyet</strong></td>
            <td>Işığı yumuşatarak kırar; 1x3 sık pilede dışarıdan içeriyi kesinlikle göstermez</td>
            <td>1x3 sık pilede yüksek mahremiyet sağlar, aynı zamanda hava sirkülasyonuna izin verir</td>
          </tr>
          <tr>
            <td><strong>Fiziksel Dayanım (Çocuk / Evcil Hayvan)</strong></td>
            <td>Normal ev kullanımında çok uzun ömürlüdür; keskin cisim takılmasına dikkat edilmelidir</td>
            <td>Kilitli örgü tekniği sayesinde tel kaçırmaz; kedi tırnağına ve çekiştirmeye en dirençli tüldür</td>
          </tr>
          <tr>
            <td><strong>Ütü ve Yıkama</strong></td>
            <td>Polyester-keten karışımlı serilerimiz 30°C / 400 devirde yıkanıp nemli asıldığında ütü istemez</td>
            <td>Kırışmaya karşı sıfır toleranslıdır; makineden çıktığı anda jilet gibi açılır</td>
          </tr>
        </tbody>
      </table>

      <h2>Hangi Odaya Hangisini Seçmelisiniz?</h2>
      <ul>
        <li><strong>Salon ve Yatak Odasında:</strong> Boucle, keten veya ahşap detaylı mobilyalarınız varsa <strong>Keten Dokulu Tül</strong> ortama çok üst düzey bir mimari sıcaklık katar.</li>
        <li><strong>Oturma Odası, Mutfak ve Balkon Kapılı Odalarda:</strong> Gün içinde sürekli açılıp kapanan, çocukların temas ettiği ve sık yıkanan pencerelerde <strong>Grek Tül</strong> yıllarca ilk günkü formunu korur.</li>
      </ul>
    `,
    faqs: [
      {
        q: "%100 saf keten tül mü yoksa polyester karışımlı keten dokulu tül mü daha kullanışlı?",
        a: "%100 saf ham keten yıkandığında ciddi oranda çeker ve ağır buharlı ütü ister. Bu nedenle ev kullanımında doğal keten görünümünü koruyan ancak yıkandığında çekme ve kırışma yapmayan 'keten dokulu mikro-pes' karışımlı 1. sınıf koleksiyonlarımızı öneriyoruz."
      }
    ]
  },
  {
    slug: "kartonpiyerli-ve-gizli-led-havuzlu-tavanlarda-perde-secimi",
    title: "Kartonpiyerli ve Gizli LED Havuzlu Tavanlarda Korniş Montajı ve Perde Seçimi",
    metaTitle: "Kartonpiyer ve LED Havuzlu Tavan Perde Modelleri | Dilek Perde Home",
    metaDesc: "Tavan gizli ışık bandı (LED havuzu) ve dar kartonpiyer boşluklarında fon ve tül perde pileleri nasıl planlanmalı? Sürtünmeyen perde rehberi.",
    keywords: "kartonpiyerli tavan perde, gizli led tavan perde, boru pile fon perde, korniş boşluğu kaç cm olmalı",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/modern-salon-vizon-fon-ve-keten-tul-perde.jpg",
    excerpt: "Yeni konut projelerindeki dar alçıpan perde bandı ve gizli LED havuzlarında perdenin kartonpiyere sürtünmesini önleyen korniş ve pile teknikleri.",
    contentHtml: `
      <h2>Dar Kartonpiyer (Perdelik) Boşluklarında Pile Sürtünmesini Önleme</h2>
      <p>Yeni nesil dairelerde tavan alçıpan uygulaması ve gizli LED ışık havuzu yapılırken, pencere ile alçıpan arasındaki <strong>perdelik boşluğu (niş genişliği)</strong> bazen 10–12 cm kadar dar bırakılabilmektedir. Bu dar alana üçlü korniş takıldığında, öne ve arkaya taşan kalın pileler alçıpana sürtünerek perdenin yürümesini zorlaştırır.</p>

      <table>
        <thead>
          <tr>
            <th>Tavan Perdelik Boşluğu</th>
            <th>Önerilen Korniş Yerleşimi</th>
            <th>Uygulanması Gereken Pile Tekniği</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>10 – 13 cm (Dar Boşluk)</strong></td>
            <td>İkili + Tekli ayrı korniş veya ince profilli alüminyum ray</td>
            <td>Öne kabarmayan yatık <strong>Kanun (Kutu) Pile</strong> veya <strong>S-Wave</strong></td>
          </tr>
          <tr>
            <td><strong>14 – 18 cm (Standart Boşluk)</strong></td>
            <td>Üçlü tavan kornişi (kalorifer peteğinden 3 cm önde)</td>
            <td>1x3 Sık Kanun Pile Tül + Boru Pile Fon</td>
          </tr>
          <tr>
            <td><strong>18 cm ve Üzeri (Geniş LED Havuzu)</strong></td>
            <td>Dörtlü korniş veya Motorlu Perde Rayı</td>
            <td>Boru pile, Amerikan çatal pile veya İtalyan kruvaze</td>
          </tr>
        </tbody>
      </table>

      <h2>Gizli LED Aydınlatma Altında Hangi Kumaşlar Daha Şık Durur?</h2>
      <p>Korniş boşluğunun içinde gizli şerit LED aydınlatma varsa, ışık doğrudan perdenin tepe noktasından aşağıya doğru süzülür (wall-washer etkisi). Bu ışık altında parlak polyester kumaşlar çiğ bir yansıma yaparken, <strong>mat keten tüller</strong> ve <strong>boru pile mat kadife fonlar</strong> derin gölge oyunları oluşturarak salonun mimari kalitesini ikiye katlar.</p>
    `,
    faqs: [
      {
        q: "Tavanımızda asma alçıpan var, ağır fon perdeleri taşır mı?",
        a: "Alçıpan tavanlarda sıradan çivi dübel kullanılırsa korniş zamanla sarkabilir. Montaj ekibimiz alçıpan arkasındaki çelik U/C profilleri tespit ederek veya özel açılır kelebek alçıpan dübelleri kullanarak en ağır kadife fonları bile güvenle taşıyan montaj yapar."
      }
    ]
  },
  {
    slug: "kadife-fon-perde-mi-keten-fon-perde-mi",
    title: "Salon Dekorasyonunda Kadife Fon Perde mi, Keten Fon Perde mi Tercih Edilmeli?",
    metaTitle: "Kadife Fon Perde mi Keten Fon Perde mi? | Dilek Perde Home",
    metaDesc: "Klasik, avangard, modern ve spor salon takımlarına göre kadife fon perde ile keten fon perde karşılaştırması ve koltuk kumaşı eşleştirme tablosu.",
    keywords: "kadife fon perde, keten fon perde, salon fon perde seçimi, mat kadife fon perde, boru pile fon",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/haki-yesil-kadife-fon-perde-ve-dikey-tul.jpg",
    excerpt: "Mobilya kumaşınızın dokusuna (boucle, nubuk, şönil veya kadife) göre doğru fon perde kumaşı seçimi ve doku kontrastı kuralları.",
    contentHtml: `
      <h2>Koltuk Dokusuna Göre Fon Kumaşı Eşleştirme Tablosu</h2>
      <p>İç mekân tekstilinde profesyonel kural, koltuk kumaşı ile fon perde kumaşının birbirini taklit etmemesi, aksine <strong>dengeli bir doku kontrastı</strong> oluşturmasıdır:</p>

      <table>
        <thead>
          <tr>
            <th>Koltuk Kumaşı Dokusu</th>
            <th>Önerilen Fon Perde Kumaşı</th>
            <th>Neden Bu Eşleşme Doğrudur?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Boucle (Bukle) & Ham Keten Koltuk</strong></td>
            <td>Mat İtalyan Kadife veya Yumuşak Şönil Fon</td>
            <td>Koltuktaki pütürlü ve mat dokuyu, kadifenin pürüzsüz ve tok dökümü dengeler</td>
          </tr>
          <tr>
            <td><strong>Kadife & Parlak Dokulu Koltuk</strong></td>
            <td>Doğal Keten veya Keten-Şantuk Fon Perde</td>
            <td>Hem koltukta hem perdede kadife kullanmak odayı ağırlaştırır; keten fon mekânı modernleştirir</td>
          </tr>
          <tr>
            <td><strong>Nubuk & Deri Detaylı Koltuk</strong></td>
            <td>Yüksek Gramajlı Balıksırtı Keten veya Mat Kadife</td>
            <td>Nubuk yüzeyin soğukluğunu sıcak tekstil dokusuyla yumuşatır ve akustiği iyileştirir</td>
          </tr>
        </tbody>
      </table>

      <h2>Isı ve Ses Yalıtımında Kadife vs. Keten Fon</h2>
      <ul>
        <li><strong>Mat Kadife Fonlar:</strong> Metrekaresi 380–450 gr ağırlığındaki sık havlı dokusuyla büyük salonlarda yankıyı (ekoyu) keser ve kış aylarında pencere kenarlarından gelen soğuğu bloke eder.</li>
        <li><strong>Keten Fonlar:</strong> Dört mevsim ferah bir görünüm sunar; özellikle boru pile dikildiğinde tavandan zemine heykelsi bir duruşla iner.</li>
      </ul>
    `,
    faqs: [
      {
        q: "Yeni nesil kadife fon perdeler parlama yapar mı?",
        a: "Eski tip parlak basma kadifelerin aksine koleksiyonumuzdaki İtalyan mat kadifeler ışığı emer, açıya göre renk değiştirmez ve son derece dingin bir matlığa sahiptir."
      }
    ]
  },
  {
    slug: "motorlu-perde-ve-somfy-uzaktan-kumandali-perde-sistemleri",
    title: "Motorlu Tül, Fon ve Stor Perde Sistemleri: Yüksek Tavan ve Villalar İçin Otomasyon",
    metaTitle: "Motorlu Perde Sistemleri & Uzaktan Kumandalı Perde | Dilek Perde Home",
    metaDesc: "Villa, dubleks salon ve ofisler için uzaktan kumandalı ve akıllı ev uyumlu motorlu tül, fon, stor ve ahşap jaluzi sistemleri.",
    keywords: "motorlu perde sistemleri, uzaktan kumandalı perde, somfy motorlu perde ankara, yüksek tavan villa perdesi",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/ars-evleri-panoramik-salon-kruvaze-tul-perde.jpg",
    excerpt: "3.5 metre üzeri galeri boşlukları, dubleks villalar ve geniş panoramik cam cephelerde tek tuşla sessiz perde kontrolü ve akıllı ev entegrasyonu.",
    contentHtml: `
      <h2>Yüksek Tavanlı Mekânlarda Neden Motorlu Perde Rayı Kullanılmalı?</h2>
      <p>Galeri boşluklu dubleks dairelerde, 4–6 metre tavan yüksekliğine sahip villalarda ve geniş panoramik teras camlarında yüksek gramajlı tül ve fon perdeleri elle çekmeye çalışmak hem vagonları zorlar hem de kumaşın çekilen kenarını yıpratır. Sessiz triger kayışlı <strong>motorlu alüminyum ray sistemlerimiz</strong> ile perdelerinizi uzaktan kumanda, duvar butonu veya akıllı telefon uygulaması üzerinden tek dokunuşla açıp kapatabilirsiniz.</p>

      <table>
        <thead>
          <tr>
            <th>Motorlu Sistem Türü</th>
            <th>Güç & Bağlantı Tipi</th>
            <th>Öne Çıkan Özellikler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Motorlu Kayışlı Tül & Fon Rayı</strong></td>
            <td>220V Kablolu veya Şarjlı Li-Ion Bataryalı</td>
            <td>Touch-Motion (kumaşı elinizle 5 cm çektiğinizde motor otomatik devreye girer), elektrik kesintisinde manuel kullanım</td>
          </tr>
          <tr>
            <td><strong>Motorlu Stor & Blackout Perde</strong></td>
            <td>Alüminyum boru içi gizli tüp motor (Somfy / Becker / Mosel)</td>
            <td>Tek kumanda ile 5 ila 15 ayrı pencereyi aynı anda veya tek tek hizalama imkânı</td>
          </tr>
          <tr>
            <td><strong>Motorlu 50mm Ahşap Jaluzi</strong></td>
            <td>Kasa içi sessiz tilt & lift motoru</td>
            <td>Ağır masif ahşap bantları zorlanmadan yukarı toplar ve güneş açısına göre yatırır</td>
          </tr>
        </tbody>
      </table>

      <h2>Elektrik Hattı Çekilmemiş Evlerde Şarjlı (Akülü) Motor Çözümü</h2>
      <p>Tadilat yapmadan mevcut evinize motorlu perde yaptırmak istiyorsanız, pencere kenarına elektrik kablosu çekmeye gerek yoktur. Dahili lityum-iyon bataryalı motorlarımız tek şarjla <strong>6 ila 8 ay boyunca</strong> günlük kullanım sunar; yılda sadece iki kez powerbank veya uzun şarj adaptörüyle olduğu yerde şarj edilir.</p>
    `,
    faqs: [
      {
        q: "Elektrik kesildiğinde motorlu tül ve fon perdeleri elle açabilir miyiz?",
        a: "Evet, kullandığımız yeni nesil motorlu raylarda 'manuel serbest bırakma debriyajı' bulunur; elektrik kesintisinde perdeyi normal perde gibi elinizle çekerek açıp kapatabilirsiniz."
      }
    ]
  },
  {
    slug: "kis-bahcesi-ve-veranda-perde-modelleri-isi-yalitimli",
    title: "Kış Bahçesi, Veranda ve Teras Kapama Alanları İçin Isı Yalıtımlı Perde Çözümleri",
    metaTitle: "Kış Bahçesi Perde Modelleri | Tavan Plise & Zip Perde | Dilek Perde Home",
    metaDesc: "Cam tavanlı kış bahçeleri ve verandalar için güneşi ve soğuğu kesen tavan plise perde, ahşap jaluzi ve termal stor sistemleri.",
    keywords: "kış bahçesi perdesi, cam tavan perdesi, ısı yalıtımlı plise perde, veranda perdesi ankara",
    readTime: "7 dk okuma",
    heroImage: "/images/gallery/cam-balkon-ve-mutfak-antrasit-stor-perde.jpg",
    excerpt: "Cam balkon, kış bahçesi ve teras kapamalarda yazın sera etkisini, kışın ise camdan gelen soğuğu kesen hücreli (Honeycomb) ve reflektif kumaşlar.",
    contentHtml: `
      <h2>Kış Bahçelerinde Yazın Sera Etkisini, Kışın Soğuğu Kesen Sistemler</h2>
      <p>Üç cephesi ve tavanı camla kapatılmış kış bahçeleri ile teras verandalarında en büyük problem, yazın güneş altında içerisinin aşırı ısınması (sera etkisi), kış akşamlarında ise geniş cam yüzeylerden soğuk yayılmasıdır. <strong>Dilek Perde Home</strong> olarak kış bahçesinin hem tavan camlarına hem de dikey açılır cephelerine özel termal perde sistemleri uyguluyoruz.</p>

      <table>
        <thead>
          <tr>
            <th>Kış Bahçesi Bölümü</th>
            <th>Önerilen Perde Sistemi</th>
            <th>Isı ve Işık Yalıtım Performansı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cam Tavan (Eğimli / Yatay)</strong></td>
            <td>Çelik Telli Gergin Tavan Plise (Plisell) veya Motorlu Zip/Tavan Stor</td>
            <td>Reflektif üst yüzey güneş ışığını camdan içeri girmeden geri yansıtır; sarkma yapmaz</td>
          </tr>
          <tr>
            <td><strong>Katlanır / Sürgülü Yan Camlar</strong></td>
            <td>Honeycomb (Çift Katlı Petek) Plise Perde veya Sun Screen Stor</td>
            <td>Hücreli hava kanalları sayesinde çift cam etkisi yaratarak ısı kaybını %45 azaltır</td>
          </tr>
          <tr>
            <td><strong>Dekoratif İç Cephe</strong></td>
            <td>50mm Polywood Jaluzi veya Su İtici Dış Mekân Keten Fonlar</td>
            <td>Nemden ve sıcaklık farkından etkilenmeyen dört mevsim salon konforu sağlar</td>
          </tr>
        </tbody>
      </table>
    `,
    faqs: [
      {
        q: "Cam tavan plise perdeler yüksekte olduğu için nasıl açılıp kapanır?",
        a: "Tavan plise perdelerimiz teleskopik uzatma çubuğu (isteka) ile yerden zahmetsizce açılıp kapatılabildiği gibi, uzaktan kumandalı motorlu olarak da üretilebilmektedir."
      }
    ]
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
        max_tokens: 3500,
        messages: [
          {
            role: "user",
            content: `Sen Ankara Kahramankazan merkezli kurumsal "Dilek Perde Home" (dilekperdehome.com) özel dikim perde ve ev tekstili tasarım atölyesinin baş içerik editörüsün.
Daha önce yazılmamış, Google'da yüksek aranma hacmine sahip yeni ve kapsamlı bir perde/ev tekstili teknik rehber makalesi üret.
Mevcut slug listesi (bunları kesinlikle tekrarlama): ${existingSlugs.slice(0, 35).join(", ")}
Kurallar:
- İçerik zayıf veya tek paragraf OLMAMALI; en az 3 adet <h2> alt başlık, detaylı bir HTML karşılaştırma/ölçü tablosu (<table><thead>...</thead><tbody>...</tbody></table>) ve maddeli listeler (<ul>/<ol>) içermelidir.
- Kesinlikle emoji kullanma, kurumsal ve teknik terzilik dili kullan.
Sadece geçerli bir JSON objesi döndür (markdown kod bloğu olmadan):
{
  "slug": "ornek-seo-uyumlu-slug",
  "title": "Başlık (60-78 karakter)",
  "metaTitle": "SEO Başlığı | Dilek Perde Home",
  "metaDesc": "140-158 karakter meta açıklama",
  "keywords": "virgülle ayrılmış 6 anahtar kelime",
  "readTime": "7 dk okuma",
  "excerpt": "Detaylı 1-2 cümlelik özet",
  "contentHtml": "<h2>...</h2><p>...</p><table>...</table><h2>...</h2><ul><li>...</li></ul>",
  "faqs": [
    { "q": "Sık sorulan teknik soru 1?", "a": "Detaylı uzman cevabı 1" },
    { "q": "Sık sorulan teknik soru 2?", "a": "Detaylı uzman cevabı 2" }
  ]
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
    ...slugs.slice(0, 35).map((s) => `https://${host}/rehber/${s}`)
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
  const existingSlugs = [...guideSection.matchAll(/"?slug"?:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dates = [...guideSection.matchAll(/"?date"?:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
  const todayCount = dates.filter((d) => d === today).length;

  // Günde en fazla 2 yeni makale (veya --force ile hemen yayınla)
  if (force || todayCount < 2) {
    let nextTopic = DAILY_TOPICS.find((t) => !existingSlugs.includes(t.slug));
    if (!nextTopic) {
      nextTopic = await generateTopicWithClaude(existingSlugs);
    }
    if (nextTopic) {
      const entryObj = {
        slug: nextTopic.slug,
        title: nextTopic.title,
        metaTitle: nextTopic.metaTitle,
        metaDesc: nextTopic.metaDesc,
        keywords: nextTopic.keywords,
        date: today,
        readTime: nextTopic.readTime || "7 dk okuma",
        heroImage: nextTopic.heroImage || GALLERY_POOL[0],
        excerpt: nextTopic.excerpt,
        contentHtml: nextTopic.contentHtml,
        faqs: nextTopic.faqs || []
      };
      const serialized = "  " + JSON.stringify(entryObj, null, 2).replace(/\n/g, "\n  ") + ",\n";
      const updated = dataText.replace(/export const GUIDES = \[\r?\n/, `export const GUIDES = [\n${serialized}`);
      writeFileSync(dataPath, updated, "utf8");
      existingSlugs.unshift(nextTopic.slug);
      console.log(`Yeni gunluk perde rehberi eklendi: /rehber/${nextTopic.slug} (${today})`);
    }
  }

  await pingSearchEngines(existingSlugs);
  console.log(`Arama motoru (IndexNow + Sitemap) bildirimleri tamamlandi. Toplam aktif makale: ${existingSlugs.length}`);
}

main();
