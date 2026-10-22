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
        <span class="language">TR</span>
        <button class="menu-toggle" type="button" aria-label="Menüyü aç veya kapat" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span><em>MENÜ</em></button>
      </div>
    </div>
    <div class="header-line"></div>
    <nav class="main-nav shell" id="main-nav" aria-label="Ana menü">
      <a href="/" class="${active === "home" ? "is-active" : ""}">ANASAYFA</a>
      <div class="nav-item has-dropdown ${active === "corporate" ? "is-active" : ""}">
        <button class="nav-parent" type="button" aria-expanded="false">KURUMSAL <span>⌄</span></button>
        <div class="submenu"><a href="/hakkimizda/">Hakkımızda</a><a href="/sss/">Sıkça Sorulan Sorular</a></div>
      </div>
      <div class="nav-item has-dropdown ${active === "services" ? "is-active" : ""}">
        <button class="nav-parent" type="button" aria-expanded="false">HİZMETLER <span>⌄</span></button>
        <div class="submenu"><a href="/tabela-hizmetleri/">Tabela Sistemleri</a><a href="/baski-giydirme/">Baskı &amp; Giydirme</a></div>
      </div>
      <a href="/sertifikalar/" class="${active === "certificates" ? "is-active" : ""}">SERTİFİKALAR</a>
      <a href="/makine-parkuru/" class="${active === "machines" ? "is-active" : ""}">MAKİNE PARKURU</a>
      <a href="/katalog/" class="${active === "catalog" ? "is-active" : ""}">KATALOĞUMUZ</a>
      <a href="/iletisim/" class="${active === "contact" ? "is-active" : ""}">İLETİŞİM</a>
    </nav>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand"><img src="/assets/vrs-logo.png" alt="VRS Creative" /><p>Tabela, baskı, giydirme ve kurumsal uygulama çözümleri.</p></div>
      <div><h3>Kurumsal</h3><a href="/hakkimizda/">Hakkımızda</a><a href="/sss/">Sıkça Sorulan Sorular</a><a href="/sertifikalar/">Sertifikalar</a></div>
      <div><h3>Hizmetler</h3><a href="/tabela-hizmetleri/">Tabela Sistemleri</a><a href="/baski-giydirme/">Baskı &amp; Giydirme</a><a href="/katalog/">Katalog</a></div>
      <div><h3>İletişim</h3><a href="tel:+905476060616">0547 606 06 16</a><a href="mailto:info@vrscreative.com">info@vrscreative.com</a><p>Küçükbakkalköy, Mavideniz Sk. No:2<br />34750 Ataşehir / İstanbul</p></div>
    </div>
    <div class="shell footer-bottom"><span>© 2026 VRS Creative</span><span>Tasarım • Üretim • Uygulama</span></div>
  </footer>
  <button class="back-top" type="button" aria-label="Sayfanın başına dön">↑</button>
  <script src="/script.js?v=20261017-3"></script>`;

const hero = (title, subtitle, image, parent = "Başlangıç") => `
  <section class="page-hero" style="--page-image: url('/assets/${image}')">
    <div class="page-hero-overlay"></div>
    <div class="shell page-hero-copy"><p>VRS CREATIVE</p><h1>${title}</h1><span>${subtitle}</span><nav aria-label="Sayfa yolu"><a href="/">${parent}</a><i>»</i><b>${title}</b></nav></div>
  </section>`;

const layout = ({ title, description, active, body, scripts = "" }) => `<!doctype html>
<html lang="tr"><head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#26282b" />
  <meta name="description" content="${description}" /><title>${title} | VRS Creative</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css?v=20261017-3" />
</head><body class="inner-page" data-nav="${active}">${header(active)}<main>${body}</main>${footer}${scripts}</body></html>`;

const pages = {
  "hakkimizda": layout({
    title: "Hakkımızda",
    description: "VRS Creative tasarım, tabela, baskı ve uygulama yaklaşımı.",
    active: "corporate",
    body: `${hero("Hakkımızda", "Tasarım, üretim ve uygulama aynı çizgide.", "kutu-harf.jpg")}
      <section class="inner-section"><div class="shell about-intro">
        <div class="about-copy reveal"><div class="section-number"><b>01</b><span></span><em>VRS CREATIVE</em></div><h2>Fikirden sahaya<br />tek bir ekip.</h2><p class="inner-lead">VRS Creative, markaların fiziksel dünyadaki görünürlüğünü tabela, baskı ve yüzey uygulamalarıyla güçlendiren bir tasarım ve üretim markasıdır.</p><p>Projeyi keşif ve ölçülendirmeden başlayarak tasarım, üretim ve montaj adımlarıyla tek akışta ele alırız. Malzeme kararlarını görünürlük, dayanım ve marka kimliğiyle birlikte değerlendiririz.</p></div>
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
          <article class="detail-card reveal"><img src="/assets/kutu-harf.jpg" alt="Kutu harf tabela" /><span>01</span><h3>Kutu Harf Tabela</h3><p>Pleksi, alüminyum ve paslanmaz yüzey seçenekleriyle ışıklı veya ışıksız üretim.</p></article>
          <article class="detail-card reveal"><img src="/assets/lightbox.jpg" alt="Lightbox tabela" /><span>02</span><h3>Lightbox Sistemleri</h3><p>Tek veya çift taraflı, homojen aydınlatmalı kutu tabela çözümleri.</p></article>
          <article class="detail-card reveal"><img src="/assets/totem-tabela.jpg" alt="Totem tabela" /><span>03</span><h3>Totem Tabela</h3><p>Yol, otopark ve bina girişleri için uzaktan algılanan yönlendirme sistemleri.</p></article>
          <article class="detail-card reveal"><img src="/assets/cephe-giydirme.jpg" alt="Cephe tabelası" /><span>04</span><h3>Cephe Tabelaları</h3><p>Mimari yüzeye uyumlu, dayanıklı ve yüksek görünürlüklü uygulamalar.</p></article>
          <article class="detail-card reveal"><img src="/assets/kutu-harf.jpg" alt="Neon LED tabela" /><span>05</span><h3>Neon LED</h3><p>İç mekân, vitrin ve sosyal alanlar için hafif ve canlı ışık çözümleri.</p></article>
          <article class="detail-card reveal"><img src="/assets/totem-tabela.jpg" alt="Yönlendirme tabelaları" /><span>06</span><h3>Yönlendirme</h3><p>Kurumsal iç ve dış mekân bilgi, kat ve yönlendirme sistemleri.</p></article>
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
          <article class="detail-card reveal"><img src="/assets/dijital-baski.jpg" alt="Dijital baskı makinesi" /><span>01</span><h3>Geniş Format Baskı</h3><p>Folyo, branda ve görsel yüzeyler için yüksek çözünürlüklü üretim.</p></article>
          <article class="detail-card reveal"><img src="/assets/arac-giydirme.jpg" alt="Araç giydirme" /><span>02</span><h3>Araç Giydirme</h3><p>Tek araçtan kurumsal filoya kadar tasarım, baskı ve profesyonel uygulama.</p></article>
          <article class="detail-card reveal"><img src="/assets/cephe-giydirme.jpg" alt="Cephe giydirme" /><span>03</span><h3>Cephe Giydirme</h3><p>Kompozit, vinil ve kampanya görselleriyle büyük ölçekli görünürlük.</p></article>
          <article class="detail-card reveal"><img src="/assets/dijital-baski.jpg" alt="Cam folyo baskı" /><span>04</span><h3>Cam &amp; Folyo</h3><p>One-way vision, kumlama ve kesim folyo ile vitrin ve ofis uygulamaları.</p></article>
          <article class="detail-card reveal"><img src="/assets/arac-giydirme.jpg" alt="Kurumsal filo uygulaması" /><span>05</span><h3>Kurumsal Filo</h3><p>Farklı araç tiplerinde tutarlı renk ve yerleşim standardı.</p></article>
          <article class="detail-card reveal"><img src="/assets/cephe-giydirme.jpg" alt="Branda ve afiş" /><span>06</span><h3>Branda &amp; Afiş</h3><p>Kısa ve uzun dönem kampanyalar için ölçüye özel dış mekân baskıları.</p></article>
        </div></div></section>
      <section class="service-cta print-cta"><div class="shell"><p>MARKANIZI SAHAYA ÇIKARIN</p><h2>Doğru malzeme,<br />temiz uygulama.</h2><a class="outline-button light" href="/iletisim/">TEKLİF İSTEYİN <span>→</span></a></div></section>`
  }),

  "sertifikalar": layout({
    title: "Sertifikalar",
    description: "VRS Creative örnek sertifika ve kalite belgeleri sunumu.",
    active: "certificates",
    body: `${hero("Sertifikalar", "Örnek belge ve kalite sunumu.", "lightbox.jpg")}
      <section class="inner-section certificate-section"><div class="shell"><div class="inner-heading reveal"><div class="section-number"><b>01</b><span></span><em>ÖRNEK BELGELER</em></div><h2>Kalite yaklaşımını<br />görünür kılan yapı.</h2><p>Bu prototipteki belge adları ve numaraları yalnızca tasarım örneğidir; VRS Creative’in gerçek sertifikalarını temsil etmez.</p><div class="demo-notice">PROTOTİP İÇERİĞİ — GERÇEK BELGE DEĞİLDİR</div></div>
        <div class="certificate-grid">
          <a class="certificate-card reveal" href="#sertifika-onizleme" data-certificate="Kalite Yönetim Sistemi"><span>ÖRNEK</span><b>ISO 9001</b><em>Kalite yönetim sistemi sunum kartı</em><i>İNCELE →</i></a>
          <a class="certificate-card reveal" href="#sertifika-onizleme" data-certificate="Müşteri Memnuniyeti"><span>ÖRNEK</span><b>ISO 10002</b><em>Müşteri deneyimi süreç sunumu</em><i>İNCELE →</i></a>
          <a class="certificate-card reveal" href="#sertifika-onizleme" data-certificate="İş Sağlığı ve Güvenliği"><span>ÖRNEK</span><b>ISO 45001</b><em>Saha güvenliği yaklaşım kartı</em><i>İNCELE →</i></a>
          <a class="certificate-card reveal" href="#sertifika-onizleme" data-certificate="Çevre Yönetimi"><span>ÖRNEK</span><b>ISO 14001</b><em>Çevre yönetimi sunum kartı</em><i>İNCELE →</i></a>
          <a class="certificate-card reveal" href="#sertifika-onizleme" data-certificate="Hizmet Yeterlilik"><span>ÖRNEK</span><b>HYB</b><em>Hizmet yeterlilik sunum kartı</em><i>İNCELE →</i></a>
        </div>
        <div class="certificate-timeline reveal"><h3>Örnek kalite yol haritası</h3><ol><li><b>01</b><span>Süreçlerin dokümante edilmesi</span></li><li><b>02</b><span>Üretim ve saha kontrol listeleri</span></li><li><b>03</b><span>Müşteri geri bildirim döngüsü</span></li></ol></div>
      </div></section>
      <div class="certificate-modal" id="sertifika-onizleme" role="dialog" aria-modal="true" aria-hidden="true"><div><a class="modal-close" href="#belgeler" data-modal-close aria-label="Pencereyi kapat">×</a><small>ÖRNEK BELGE ÖNİZLEMESİ</small><h2 data-modal-title>Kalite Yönetim Sistemi</h2><p>Bu kart prototip tasarımını göstermek içindir. Gerçek sertifika numarası, kapsamı ve doğrulama bilgileri VRS tarafından sağlandığında bu alan güncellenecektir.</p><a href="/iletisim/">BELGE BİLGİSİ TALEP ET →</a></div></div>`
  }),

  "makine-parkuru": layout({
    title: "Makine Parkuru",
    description: "VRS Creative örnek üretim ekipmanları ve makine parkuru sunumu.",
    active: "machines",
    body: `${hero("Makine Parkuru", "Tasarım, üretim ve uygulama tek çatı altında.", "dijital-baski.jpg")}
      <section class="inner-section machine-section"><div class="shell"><div class="inner-heading reveal"><div class="section-number"><b>01</b><span></span><em>ÜRETİM ALTYAPISI</em></div><h2>Üretimi taşıyan<br />teknoloji.</h2><p>Aşağıdaki ekipmanlar prototip sayfa düzenini göstermek için hazırlanmış örnek içeriktir. Gerçek model ve kapasite bilgileri daha sonra eklenebilir.</p><div class="demo-notice">ÖRNEK MAKİNE LİSTESİ</div></div>
        <div class="filter-bar" role="group" aria-label="Makine kategorileri"><button class="is-active" type="button" data-filter="all">TÜMÜ</button><button type="button" data-filter="signage">TABELA ÜRETİMİ</button><button type="button" data-filter="print">BASKI HATTI</button></div>
        <div class="machine-grid">
          <article class="machine-card reveal" data-category="signage"><span>01</span><div class="machine-icon">CNC</div><h3>CNC Router</h3><h4>Örnek hassas kesim hattı</h4><p>Kompozit, akrilik ve levha malzemelerde bilgisayar kontrollü şekillendirme.</p><ul><li>Hassas kesim</li><li>Seri üretim</li><li>Özel formlar</li></ul></article>
          <article class="machine-card reveal" data-category="signage"><span>02</span><div class="machine-icon">LASER</div><h3>Lazer Kesim</h3><h4>Örnek akrilik işleme hattı</h4><p>Pleksi ve ince yüzeylerde detaylı kesim, markalama ve prototipleme.</p><ul><li>Detay kalitesi</li><li>Temiz kenar</li><li>Hızlı prototip</li></ul></article>
          <article class="machine-card reveal" data-category="signage"><span>03</span><div class="machine-icon">BEND</div><h3>Kanal Harf Bükme</h3><h4>Örnek otomatik büküm</h4><p>Kutu harf yan bantlarının kontrollü açı ve ölçüde hazırlanması.</p><ul><li>Tekrarlanabilir ölçü</li><li>Hızlı üretim</li><li>Farklı profiller</li></ul></article>
          <article class="machine-card reveal" data-category="print"><span>04</span><div class="machine-icon">UV</div><h3>UV Flatbed</h3><h4>Örnek doğrudan yüzeye baskı</h4><p>Rijit malzemelerde beyaz boya ve vernik seçenekli baskı sunumu.</p><ul><li>Canlı renk</li><li>Rijit malzeme</li><li>Özel katman</li></ul></article>
          <article class="machine-card reveal" data-category="print"><span>05</span><div class="machine-icon">3.2M</div><h3>Geniş Format</h3><h4>Örnek eco-solvent hattı</h4><p>Branda ve folyo gibi rulo malzemelerde yüksek metrajlı üretim.</p><ul><li>Uzun metraj</li><li>Dış mekân</li><li>Renk yönetimi</li></ul></article>
          <article class="machine-card reveal" data-category="print"><span>06</span><div class="machine-icon">LAM</div><h3>Laminasyon</h3><h4>Örnek yüzey koruma hattı</h4><p>Araç, cam ve folyo uygulamalarında baskı yüzeyinin korunması.</p><ul><li>Mat ve parlak</li><li>UV koruma</li><li>Kabarcıksız yüzey</li></ul></article>
        </div></div></section>`
  }),

  "katalog": layout({
    title: "Kataloğumuz",
    description: "VRS Creative örnek proje kataloğu önizleme ve indirme sayfası.",
    active: "catalog",
    body: `${hero("Kataloğumuz", "Tabela, baskı ve uygulama çözümlerini tek dosyada inceleyin.", "cephe-giydirme.jpg")}
      <section class="inner-section catalog-section"><div class="shell"><div class="catalog-heading reveal"><div><div class="section-number"><b>01</b><span></span><em>ÖRNEK KATALOG</em></div><h2>VRS Creative<br />Proje Kataloğu</h2><p>Altı sayfalık örnek sunumu tarayıcıda inceleyebilir veya cihazınıza indirebilirsiniz. İçerik prototip amaçlıdır.</p></div><a class="outline-button dark" href="/assets/vrs-creative-ornek-katalog.pdf" download>PDF İNDİR <span>↓</span></a></div>
        <div class="catalog-viewer reveal"><iframe title="VRS Creative örnek proje kataloğu" src="/assets/vrs-creative-ornek-katalog.pdf#toolbar=1&navpanes=0&view=FitH"></iframe></div>
      </div></section>`
  }),

  "iletisim": layout({
    title: "İletişim",
    description: "VRS Creative iletişim, konum ve proje talep formu.",
    active: "contact",
    body: `${hero("İletişim", "Projenizi birlikte netleştirelim.", "kutu-harf.jpg")}
      <section class="contact-page"><div class="map-large"><iframe title="VRS Creative konumu" src="https://www.google.com/maps?q=40.9799827,29.1123926&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="contact-info reveal"><div class="section-number light"><b>01</b><span></span><em>BİZE ULAŞIN</em></div><h2>Projenizi<br />anlatın.</h2><address>Küçükbakkalköy, Mavideniz Sk. No:2<br />34750 Ataşehir / İstanbul</address><a href="tel:+905476060616">0547 606 06 16</a><a href="mailto:info@vrscreative.com">info@vrscreative.com</a><a href="https://instagram.com/vrscreativeco/" target="_blank" rel="noreferrer">@vrscreativeco</a></div></section>
      <section class="inner-section form-section"><div class="shell form-layout"><div class="form-heading reveal"><div class="section-number"><b>02</b><span></span><em>PROJE FORMU</em></div><h2>Kısa bir mesaj<br />yeterli.</h2><p>Form gönderildiğinde bilgileriniz WhatsApp mesajı olarak hazırlanır; gönderme kararı size aittir.</p></div><form class="contact-form reveal" data-contact-form><label>Adınız<input name="name" required autocomplete="name" /></label><label>E-posta adresiniz<input name="email" type="email" required autocomplete="email" /></label><label>Konu<select name="subject"><option>Tabela Sistemleri</option><option>Baskı &amp; Giydirme</option><option>Kurumsal Uygulama</option><option>Diğer</option></select></label><label>Mesajınız<textarea name="message" rows="5" required></textarea></label><button class="outline-button dark" type="submit">WHATSAPP’TA HAZIRLA <span>→</span></button></form></div></section>`
  }),
};

for (const [slug, content] of Object.entries(pages)) {
  const directory = join(root, slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), content, "utf8");
}

console.log(`Generated ${Object.keys(pages).length} pages in ${root}`);
