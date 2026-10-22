const body = document.body;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('load', () => body.classList.add('is-ready'));

const syncHeader = () => {
  const isScrolled = window.scrollY > 24;
  header?.classList.toggle('is-scrolled', isScrolled);
  backToTop?.classList.toggle('is-visible', window.scrollY > 520);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

const closeMenu = () => {
  body.classList.remove('menu-open');
  mainNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
};

menuToggle?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  mainNav?.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-parent').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const item = button.closest('.has-dropdown');
    const shouldOpen = !item?.classList.contains('is-open');

    document.querySelectorAll('.has-dropdown.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
      }
    });

    item?.classList.toggle('is-open', shouldOpen);
    button.setAttribute('aria-expanded', String(shouldOpen));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown.is-open').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
    });
  }
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dot')];
const previousButton = document.querySelector('.hero-arrow.prev');
const nextButton = document.querySelector('.hero-arrow.next');
let activeSlide = 0;
let heroTimer;

const showSlide = (index) => {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === activeSlide);
    slide.setAttribute('aria-hidden', String(slideIndex !== activeSlide));
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === activeSlide);
    dot.setAttribute('aria-current', dotIndex === activeSlide ? 'true' : 'false');
  });
};

const restartHero = () => {
  if (slides.length < 2) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showSlide(activeSlide + 1), 6800);
};

if (slides.length) {
  previousButton?.addEventListener('click', () => {
    showSlide(activeSlide - 1);
    restartHero();
  });
  nextButton?.addEventListener('click', () => {
    showSlide(activeSlide + 1);
    restartHero();
  });
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      restartHero();
    });
  });
  showSlide(0);
  restartHero();
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    const start = performance.now();
    const duration = 1100;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    observer.unobserve(element);
  });
}, { threshold: 0.65 });

document.querySelectorAll('[data-count]').forEach((counter) => counterObserver.observe(counter));

const processData = [
  {
    title: 'Keşif ve ihtiyaç analizi',
    copy: 'Ölçü, görüş mesafesi, uygulama zemini ve ışık koşullarını yerinde değerlendiriyoruz.',
    image: 'assets/kutu-harf.jpg'
  },
  {
    title: 'Tasarım ve prova',
    copy: 'Renk, ölçü ve malzeme seçeneklerini markanızın görünürlüğüne göre netleştiriyoruz.',
    image: 'assets/dijital-baski.jpg'
  },
  {
    title: 'Üretim ve kalite kontrol',
    copy: 'Kesimden baskıya kadar her adımı kendi üretim akışımızda takip ediyoruz.',
    image: 'assets/cephe-giydirme.jpg'
  },
  {
    title: 'Montaj ve teslim',
    copy: 'Planlanan zamanda güvenli montajı tamamlıyor, uygulamayı kullanıma hazır teslim ediyoruz.',
    image: 'assets/totem-tabela.jpg'
  }
];

const processTitle = document.querySelector('[data-process-title]');
const processCopy = document.querySelector('[data-process-copy]');
const processImage = document.querySelector('[data-process-image]');

document.querySelectorAll('[data-process]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const index = Number(tab.dataset.process);
    const data = processData[index];
    if (!data || !processTitle || !processCopy || !processImage) return;
    document.querySelectorAll('[data-process]').forEach((item) => item.classList.remove('is-active'));
    tab.classList.add('is-active');
    processTitle.textContent = data.title;
    processCopy.textContent = data.copy;
    processImage.src = data.image;
    processImage.alt = data.title;
  });
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details[open]').forEach((openItem) => {
      if (openItem !== item) openItem.removeAttribute('open');
    });
  });
});

const certificateModal = document.querySelector('.certificate-modal');
const certificateModalTitle = certificateModal?.querySelector('[data-modal-title]');
const certificateModalText = certificateModal?.querySelector('p');

const closeCertificateModal = () => {
  certificateModal?.classList.remove('is-open');
  certificateModal?.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
};

document.querySelectorAll('[data-certificate]').forEach((card) => {
  card.addEventListener('click', () => {
    if (!certificateModal) return;
    if (certificateModalTitle) certificateModalTitle.textContent = card.dataset.certificate || 'Örnek sertifika';
    if (certificateModalText) certificateModalText.textContent = card.dataset.description || 'Bu kart, prototip sunum için oluşturulmuş temsili bir belgedir.';
    certificateModal.classList.add('is-open');
    certificateModal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  });
});

certificateModal?.querySelectorAll('[data-modal-close]').forEach((button) => {
  button.addEventListener('click', closeCertificateModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCertificateModal();
    closeMenu();
  }
});

const filterButtons = document.querySelectorAll('[data-filter]');
const machineCards = document.querySelectorAll('[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    machineCards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.category === selected;
      card.hidden = !visible;
    });
  });
});

const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = [
    'Merhaba VRS Creative, web sitesi üzerinden teklif almak istiyorum.',
    `Ad Soyad: ${data.get('name') || '-'}`,
    `E-posta: ${data.get('email') || '-'}`,
    `Konu: ${data.get('subject') || '-'}`,
    `Proje: ${data.get('message') || '-'}`
  ].join('\n');
  window.open(`https://wa.me/905476060616?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
