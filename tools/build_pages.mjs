import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;

const header = (active) => `
  <div class="page-loader" aria-hidden="true"><img src="/assets/vrs-logo.png" alt="" /><span></span></div>
  <header class="site-header" data-header>
    <div class="header-top shell">
      <a class="brand" href="/" aria-label="VRS Creative ana sayfa"><img src="/assets/vrs-logo.png" alt="VRS Creative" /></a>
      <div class="header-contact">
        <a href="tel:+905476060616"><small>TELEFON</small><strong>0547 606 06 16</strong></a>
        <a href="mailto:info@vrscreative.com"><small>E-POSTA</small><strong>info@vrscreative.com</strong></a>
      </div>
      <div class="header-actions">
        <a class="header-cta" href="https://wa.me/905476060616?text=Merhaba%2C%20VRS%20Creative%20i%C3%A7in%20teklif%20almak%20istiyorum." target="_blank" rel="noreferrer">WHATSAPP’TAN TEKLİF AL <span>↗</span></a>
        <button class="menu-toggle" type="button" aria-label="Menüyü aç veya kapat" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span><em>MENÜ</em></button>
      </div>
    </div>
    <div class="header-line"></div>
    <nav class="main-nav shell" id="main-nav" aria-label="Ana menü">
      <a href="/" class="${active === "home" ? "is-active" : ""}">ANASAYFA</a>
      <a href="/hakkimizda/" class="${active === "corporate" ? "is-active" : ""}">HAKKIMIZDA</a>
      <div class="nav-item has-dropdown ${active === "services" ? "is-active" : ""}">
        <button class="nav-parent" type="button" aria-expanded="false" data-services-link>HİZMETLER <span>⌄</span></button>
        <div class="submenu"><a href="/tabela-hizmetleri/">Tabela Sistemleri</a><a href="/baski-giydirme/">Baskı &amp; Giydirme</a></div>
      </div>
      <a href="/sss/" class="${active === "faq" ? "is-active" : ""}">SIKÇA SORULAN SORULAR</a>
      <a href="/iletisim/" class="${active === "contact" ? "is-active" : ""}">İLETİŞİM</a>
    </nav>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand"><img src="/assets/vrs-logo.png" alt="VRS Creative" /><p>Tabela, baskı, giydirme ve kurumsal uygulama çözümleri.</p></div>
      <div><h3>Kurumsal</h3><a href="/hakkimizda/">Hakkımızda</a><a href="/sss/">Sıkça Sorulan Sorular</a><a href="/iletisim/">İletişim</a></div>
      <div><h3>Hizmetler</h3><a href="/tabela-hizmetleri/">Tabela Sistemleri</a><a href="/baski-giydirme/">Baskı &amp; Giydirme</a><a href="/#hizmetler">Tüm Hizmetler</a></div>
      <div><h3>İletişim</h3><a href="tel:+905476060616">0547 606 06 16</a><a href="mailto:info@vrscreative.com">info@vrscreative.com</a><p>Küçükbakkalköy, Mavideniz Sk. No:2<br />34750 Ataşehir / İstanbul</p><p class="working-hours">Pazartesi–Cuma: 09.00–18.00<br />Cumartesi: 10.00–13.00<br />Pazar: Kapalı</p></div>
    </div>
    <div class="shell footer-bottom"><span>© 2026 VRS Creative</span><span>Tasarım • Üretim • Uygulama</span></div>
  </footer>
  <button class="back-top" type="button" aria-label="Sayfanın başına dön">↑</button>
  <script src="/script.js?v=20261023-1"></script>`;

const hero = (title, subtitle, image, parent = "Başlangıç") => `
  <section class="page-hero" style="--page-image: url('/assets/${image}')">
    <div class="page-hero-overlay"></div>
    <div class="shell page-hero-copy"><p>VRS CREATIVE</p><h1>${title}</h1><span>${subtitle}</span><nav aria-label="Sayfa yolu"><a href="${parent === "Hizmetler" ? "/#hizmetler" : "/"}">${parent}</a><i>»</i><b>${title}</b></nav></div>
  </section>`;

const layout = ({ title, description, active, body, scripts = "" }) => `<!doctype html>
<html lang="tr"><head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#26282b" />
  <meta name="description" content="${description}" /><title>${title} | VRS Creative</title>
  <link rel="canonical" href="https://vrscreative.com/${title === "Hakkımızda" ? "hakkimizda/" : title === "Sıkça Sorulan Sorular" ? "sss/" : title === "Tabela Sistemleri" ? "tabela-hizmetleri/" : title === "Baskı & Giydirme" ? "baski-giydirme/" : "iletisim/"}" />
  <meta property="og:type" content="website" /><meta property="og:locale" content="tr_TR" /><meta property="og:site_name" content="VRS Creative" /><meta property="og:title" content="${title} | VRS Creative" /><meta property="og:description" content="${description}" /><meta property="og:image" content="https://vrscreative.com/assets/kutu-harf.jpg" />
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"VRS Creative","url":"https://vrscreative.com/","telephone":"+905476060616","email":"info@vrscreative.com","address":{"@type":"PostalAddress","streetAddress":"Küçükbakkalköy, Mavideniz Sk. No:2","postalCode":"34750","addressLocality":"Ataşehir","addressRegion":"İstanbul","addressCountry":"TR"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"18:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"10:00","closes":"13:00"}]}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css?v=20261023-1" />
</head><body class="inner-page" data-nav="${active}">${header(active)}<main>${body}</main>${footer}${scripts}</body></html>`;

const pages = {
  "hakkimizda": layout({
    title: "Hakkımızda",
    description: "VRS Creative tasarım, tabela, baskı ve uygulama yaklaşımı.",
    active: "faq",
    body: `${hero("Hakkımızda", "Tasarım, üretim ve uygulama aynı çizgide.", "kutu-harf.jpg")}
      <section class="inner-section"><div class="shell about-intro">
        <div class="about-copy reveal"><div class="section-number"><b>01</b><span></span><em>VRS CREATIVE</em></div><h2>Fikirden sahaya<br />tek bir ekip.</h2><p class="inner-lead">VRS Creative, markaların fiziksel dünyadaki görünürlüğünü tabela, baskı ve yüzey uygulamalarıyla güçlendiren bir tasarım ve uygulama markasıdır.</p><p>Tasarım, üretim ve uygulama süreçlerini tek noktadan yönetiyoruz. Projeyi keşif ve ölçülendirmeden başlayarak malzeme seçimi, üretim koordinasyonu ve montaj adımlarıyla aynı akışta ele alırız.</p></div>
        <figure class="about-photo reveal"><img src="/assets/lightbox.jpg" alt="VRS Creative lightbox tabela uygulaması" /><figcaption>ATAŞEHİR / İSTANBUL</figcaption></figure>
      </div></section>
      <section class="value-section"><div class="shell"><div class="value-grid">
        <article class="reveal"><b>01</b><h3>Tasarım</h3><p>Markanın dili, mekânın ölçüsü ve görünürlük hedefi aynı tasarım kararında buluşur.</p></article>
        <article class="reveal"><b>02</b><h3>Üretim</h3><p>Malzeme, baskı, aydınlatma ve bağlantı detayları uygulamaya özel planlanır.</p></article>
        <article class="reveal"><b>03</b><h3>Uygulama</h3><p>Saha koordinasyonu ve montaj adımları temiz, güvenli ve kontrollü yürütülür.</p></article>
      </div></div></section>
      <section class="split-showcase"><img src="/assets/cephe-giydirme.jpg" alt="VRS Creative cephe giydirme" /><div><p>MARKANIN SAHA DİLİ</p><h2>Her temas noktasında<br />tutarlı görünürlük.</h2><ul><li>Tabela ve yönlendirme sistemleri</li><li>Dijital baskı ve yüzey uygulamaları</li><li>Araç ve cephe giydirme</li><li>Keşif, üretim ve saha montajı</li></ul><a class="outline-button light" href="/iletisim/">PROJE TALEBİ OLUŞTURUN <span>→</span></a></div></section>`
  }),

  "sss": layout({
    title: "Sıkça Sorulan Sorular",
    description: "VRS Creative tabela ve baskı hizmetleri hakkında sıkça sorulan sorular.",
    active: "corporate",
    body: `${hero("Sıkça Sorulan Sorular", "Projeniz başlamadan önce merak edilenler.", "dijital-baski.jpg")}
      <section class="inner-section"><div class="shell faq-layout"><div class="faq-heading reveal"><div class="section-number"><b>01</b><span></span><em>DESTEK MERKEZİ</em></div><h2>Merak ettiklerinizi<br />yanıtlıyoruz.</h2><p>Projenizin ölçüsü ve uygulama koşulları sonucu değiştirebilir. Buradaki yanıtlar genel bilgilendirme içindir.</p><a class="outline-button dark" href="/iletisim/">BİZE ULAŞIN <span>→</span></a></div>
        <div class="faq-list">
          <details open class="reveal"><summary>Tabela proje süreci nasıl ilerliyor?<i>+</i></summary><p>İhtiyaç ve ölçü bilgisiyle başlarız. Keşif gerekiyorsa alanı inceler, ardından tasarım, malzeme seçimi, üretim ve montaj planını netleştiririz.</p></details>
          <details class="reveal"><summary>Keşif ve ölçülendirme hizmeti veriyor musunuz?<i>+</i></summary><p>Evet. Uygulama alanının erişim, montaj ve görünürlük koşullarını değerlendirmek için keşif planlanabilir.</p></details>
          <details class="reveal"><summary>Tasarım desteği sunuyor musunuz?<i>+</i></summary><p>Evet. Hazır kurumsal kimliğinizi üretime uyarlayabilir veya uygulama alanına özel görsel çözüm hazırlayabiliriz.</p></details>
          <details class="reveal"><summary>Işıklı ve ışıksız tabela üretimi var mı?<i>+</i></summary><p>Kutu harf, lightbox, totem, yönlendirme ve cephe tabelaları ışıklı veya ışıksız alternatiflerle projelendirilebilir.</p></details>
          <details class="reveal"><summary>Baskı hizmetleri neleri kapsıyor?<i>+</i></summary><p>Folyo, branda, one-way vision, geniş format baskı, cam uygulaması, araç ve cephe giydirme çözümleri sunulur.</p></details>
          <details class="reveal"><summary>Montaj hizmetiniz var mı?<i>+</i></summary><p>Evet. Projenin niteliğine göre nakliye, montaj ve saha koordinasyonu teklif kapsamına alınabilir.</p></details>
          <details class="reveal"><summary>Teslim süresi ne kadar?<i>+</i></summary><p>Süre; ölçü, malzeme, adet ve saha koşullarına bağlıdır. Takvim, proje detayları netleştikten sonra paylaşılır.</p></details>
          <details class="reveal"><summary>Fiyatlandırma nasıl yapılıyor?<i>+</i></summary><p>Fiyat; ölçü, malzeme, aydınlatma, baskı, montaj ve erişim koşullarına göre proje bazında hesaplanır.</p></details>
        </div></div></section>`
  }),

  "tabela-hizmetleri": layout({
    title: "Tabela Sistemleri",
    description: "Kutu harf, lightbox, totem ve yönlendirme tabela çözümleri.",
    active: "services",
    body: `${hero("Tabela Sistemleri", "Gündüz net, gece güçlü uygulamalar.", "totem-tabela.jpg", "Hizmetler")}
      <section class="inner-section service-detail"><div class="shell"><div class="inner-heading reveal"><div class="section-number"><b>01</b><span></span><em>TABELA HİZMETLERİ</em></div><h2>Mekâna ve markaya<br />özel sistemler.</h2><p>Her tabela türünü görüş mesafesi, cephe oranı, ışık ihtiyacı ve montaj koşullarına göre projelendiriyoruz.</p></div>
        <div class="detail-grid">
          <article class="detail-card reveal"><img src="/assets/kutu-harf.jpg" alt="Kutu harf tabela" /><span>01</span><h3>Kutu Harf Tabela</h3><p><b>Malzemeler:</b> Pleksi, alüminyum, paslanmaz çelik ve LED aydınlatma seçenekleri.</p><p><b>Kullanım:</b> Cephe, giriş, vitrin ve iç mekân logo uygulamaları.</p><p><b>Fiyatı etkileyenler:</b> Harf ölçüsü, malzeme, aydınlatma, montaj yüksekliği ve adet.</p></article>
          <article class="detail-card reveal"><img src="/assets/lightbox.jpg" alt="Lightbox tabela" /><span>02</span><h3>Lightbox Sistemleri</h3><p><b>Malzemeler:</b> Alüminyum kasa, germe vinil veya akrilik yüzey ve LED modül.</p><p><b>Kullanım:</b> Vitrin, cephe, koridor ve yönlendirme alanları.</p><p><b>Fiyatı etkileyenler:</b> Ölçü, tek ya da çift taraflı kullanım, baskı yüzeyi ve montaj koşulları.</p></article>
          <article class="detail-card reveal"><img src="/assets/totem-tabela.jpg" alt="Totem tabela" /><span>03</span><h3>Totem Tabela</h3><p><b>Malzemeler:</b> Çelik konstrüksiyon, alüminyum kompozit, akrilik ve LED bileşenler.</p><p><b>Kullanım:</b> Yol, otopark, tesis girişi ve marka yönlendirme noktaları.</p><p><b>Fiyatı etkileyenler:</b> Yükseklik, temel ihtiyacı, yüz sayısı, aydınlatma ve erişim koşulları.</p></article>
          <article class="detail-card reveal"><img src="/assets/cephe-giydirme.jpg" alt="Cephe tabelası" /><span>04</span><h3>Cephe Tabelaları</h3><p><b>Malzemeler:</b> Kompozit panel, kutu harf, folyo ve dış mekân baskı seçenekleri.</p><p><b>Kullanım:</b> Mağaza, ofis, iş merkezi ve bina cepheleri.</p><p><b>Fiyatı etkileyenler:</b> Cephe alanı, seçilen yüzey, uygulama yüksekliği ve montaj erişimi.</p></article>
          <article class="detail-card reveal"><img src="/assets/kutu-harf.jpg" alt="Neon LED tabela" /><span>05</span><h3>Neon LED</h3><p><b>Malzemeler:</b> Esnek neon LED, akrilik zemin ve düşük voltajlı aydınlatma ekipmanı.</p><p><b>Kullanım:</b> Vitrin, kafe, ofis, etkinlik ve iç mekân vurgu alanları.</p><p><b>Fiyatı etkileyenler:</b> Yazı uzunluğu, renk sayısı, zemin biçimi ve elektrik altyapısı.</p></article>
          <article class="detail-card reveal"><img src="/assets/totem-tabela.jpg" alt="Yönlendirme tabelaları" /><span>06</span><h3>Yönlendirme</h3><p><b>Malzemeler:</b> Alüminyum, akrilik, folyo ve modüler taşıyıcı sistemler.</p><p><b>Kullanım:</b> Kat, oda, otopark, giriş ve iç mekân bilgi akışı.</p><p><b>Fiyatı etkileyenler:</b> Adet, ölçü, ikonografi, montaj yüzeyi ve değiştirilebilir panel ihtiyacı.</p></article>
        </div></div></section>
      <section class="service-cta"><div class="shell"><p>UYGULAMA ALANINIZI PAYLAŞIN</p><h2>Ölçü ve fotoğrafla<br />hızlıca başlayalım.</h2><a class="outline-button light" href="/iletisim/">PROJE TALEBİ <span>→</span></a></div></section>`
  }),

  "baski-giydirme": layout({
    title: "Baskı & Giydirme",
    description: "Dijital baskı, araç, cephe ve cam giydirme çözümleri.",
    active: "services",
    body: `${hero("Baskı & Giydirme", "Markanızı her yüzeye taşıyan çözümler.", "arac-giydirme.jpg", "Hizmetler")}
      <section class="inner-section service-detail"><div class="shell"><div class="inner-heading reveal"><div class="section-number"><b>02</b><span></span><em>BASKI HİZMETLERİ</em></div><h2>Renk, yüzey ve ölçek<br />aynı üretim planında.</h2><p>İç ve dış mekân uygulamalarında baskı malzemesini kullanım süresi, yüzey yapısı ve görüş mesafesine göre seçiyoruz.</p></div>
        <div class="detail-grid">
          <article class="detail-card reveal"><img src="/assets/dijital-baski.jpg" alt="Dijital baskı" /><span>01</span><h3>Geniş Format Baskı</h3><p><b>Malzemeler:</b> Folyo, branda, one-way vision, poster kâğıdı ve laminasyon seçenekleri.</p><p><b>Kullanım:</b> Vitrin, kampanya alanı, yönlendirme ve dış mekân duyuruları.</p><p><b>Fiyatı etkileyenler:</b> Metraj, malzeme türü, baskı çözünürlüğü ve yüzey koruması.</p></article>
          <article class="detail-card reveal"><img src="/assets/arac-giydirme.jpg" alt="Araç giydirme" /><span>02</span><h3>Araç Giydirme</h3><p><b>Malzemeler:</b> Dökme veya polimerik folyo, baskı, laminasyon ve kesim folyo.</p><p><b>Kullanım:</b> Binek araç, ticari araç, kamyonet ve kurumsal filo görünürlüğü.</p><p><b>Fiyatı etkileyenler:</b> Araç tipi, kaplama alanı, tasarım detayları ve söküm hazırlığı.</p></article>
          <article class="detail-card reveal"><img src="/assets/cephe-giydirme.jpg" alt="Cephe giydirme" /><span>03</span><h3>Cephe Giydirme</h3><p><b>Malzemeler:</b> Vinil, branda, mesh, kompozit panel ve uygulama aparatları.</p><p><b>Kullanım:</b> Mağaza cephesi, bina yüzeyi, şantiye çevresi ve kampanya alanları.</p><p><b>Fiyatı etkileyenler:</b> Kaplama alanı, yüzey hazırlığı, yükseklik ve erişim ekipmanı.</p></article>
          <article class="detail-card reveal"><img src="/assets/dijital-baski.jpg" alt="Cam folyo uygulaması" /><span>04</span><h3>Cam &amp; Folyo</h3><p><b>Malzemeler:</b> One-way vision, kumlama folyosu, şeffaf ve opak kesim folyo.</p><p><b>Kullanım:</b> Vitrin, ofis bölmesi, cam cephe ve iç mekân yönlendirmesi.</p><p><b>Fiyatı etkileyenler:</b> Cam alanı, desen, baskı seçimi ve uygulama erişimi.</p></article>
          <article class="detail-card reveal"><img src="/assets/arac-giydirme.jpg" alt="Kurumsal araç uygulaması" /><span>05</span><h3>Kurumsal Araç Uygulaması</h3><p><b>Malzemeler:</b> Araç folyosu, reflektif seçenekler ve koruyucu laminasyon.</p><p><b>Kullanım:</b> Tekil araçlar ve marka görünürlüğü için araç filoları.</p><p><b>Fiyatı etkileyenler:</b> Araç sayısı, kaplama oranı, folyo sınıfı ve tasarım uyarlaması.</p></article>
          <article class="detail-card reveal"><img src="/assets/cephe-giydirme.jpg" alt="Branda ve afiş baskısı" /><span>06</span><h3>Branda &amp; Afiş</h3><p><b>Malzemeler:</b> Branda, mesh, kuş gözü ve farklı askı sistemleri.</p><p><b>Kullanım:</b> Cephe, etkinlik, kampanya ve geçici duyuru alanları.</p><p><b>Fiyatı etkileyenler:</b> Ölçü, metraj, kenar işçiliği, askı çözümü ve montaj ihtiyacı.</p></article>
        </div></div></section>
      <section class="service-cta print-cta"><div class="shell"><p>MARKANIZI SAHAYA ÇIKARIN</p><h2>Doğru malzeme,<br />temiz uygulama.</h2><a class="outline-button light" href="/iletisim/">TEKLİF İSTEYİN <span>→</span></a></div></section>`
  }),

  "iletisim": layout({
    title: "İletişim",
    description: "VRS Creative iletişim, konum ve proje talep formu.",
    active: "contact",
    body: `${hero("İletişim", "Projenizi birlikte netleştirelim.", "kutu-harf.jpg")}
      <section class="contact-page"><div class="map-large"><iframe title="VRS Creative konumu" src="https://www.google.com/maps?q=40.9799827,29.1123926&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="contact-info reveal"><div class="section-number light"><b>01</b><span></span><em>BİZE ULAŞIN</em></div><h2>Bizi ziyaret edin.</h2><address>Küçükbakkalköy, Mavideniz Sk. No:2<br />34750 Ataşehir / İstanbul</address><a href="tel:+905476060616">0547 606 06 16</a><a href="mailto:info@vrscreative.com">info@vrscreative.com</a><p class="working-hours light-hours"><strong>Çalışma saatleri</strong><br />Pazartesi–Cuma: 09.00–18.00<br />Cumartesi: 10.00–13.00<br />Pazar: Kapalı</p><a href="https://instagram.com/vrscreativeco/" target="_blank" rel="noreferrer">@vrscreativeco</a></div></section>
      <section class="inner-section form-section"><div class="shell form-layout"><div class="form-heading reveal"><div class="section-number"><b>02</b><span></span><em>PROJE FORMU</em></div><h2>Kısa bir mesaj<br />yeterli.</h2><p>Form, bilgilerinizi WhatsApp’ta hazır bir mesaj olarak açar; mesajı gönderme kararı size aittir.</p></div><form class="contact-form reveal" data-contact-form><label>Adınız<input name="name" required autocomplete="name" /></label><label>E-posta adresiniz <small>(isteğe bağlı)</small><input name="email" type="email" autocomplete="email" /></label><label>Konu<select name="subject"><option>Tabela Sistemleri</option><option>Baskı &amp; Giydirme</option><option>Kurumsal Uygulama</option><option>Diğer</option></select></label><label>Mesajınız<textarea name="message" rows="5" required></textarea></label><p class="form-note">Bu form doğrudan mesaj göndermez; WhatsApp’ta mesaj taslağı hazırlar.</p><button class="outline-button dark" type="submit">WHATSAPP’TA HAZIRLA <span>→</span></button></form></div></section>`
  }),
};

for (const [slug, content] of Object.entries(pages)) {
  const directory = join(root, slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), content, "utf8");
}

console.log(`Generated ${Object.keys(pages).length} pages in ${root}`);
