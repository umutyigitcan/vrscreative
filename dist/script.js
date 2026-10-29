const body = document.body;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('load', () => {
  window.setTimeout(() => body.classList.add('is-ready'), 1000);
});

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
    if (button.hasAttribute('data-services-link') && window.matchMedia('(min-width: 821px)').matches) {
      window.location.href = '/#hizmetler';
      return;
    }
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
const heroFrames = [...document.querySelectorAll('.film-frame')];
const previousButton = document.querySelector('[data-prev]');
const nextButton = document.querySelector('[data-next]');
const currentSlide = document.querySelector('[data-current]');
let activeSlide = 0;
let heroTimer;

const showSlide = (index) => {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-current', slideIndex === activeSlide);
    slide.setAttribute('aria-hidden', String(slideIndex !== activeSlide));
  });
  heroFrames.forEach((frame, frameIndex) => {
    frame.classList.toggle('is-current', frameIndex === activeSlide);
  });
  if (currentSlide) currentSlide.textContent = String(activeSlide + 1);
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
    kicker: 'İHTİYACI DOĞRU ANLAMAK',
    title: 'Keşif ve ölçü',
    copy: 'Uygulama alanını, görünürlük koşullarını ve teknik gereksinimleri değerlendirerek doğru başlangıcı yaparız.',
    image: 'assets/img_3206.webp'
  },
  {
    kicker: 'GÖRSEL VE TEKNİK KARARLAR',
    title: 'Tasarım ve üretim',
    copy: 'Renk, ölçü ve malzeme seçeneklerini uygulama alanına göre netleştirir; üretim planını birlikte oluştururuz.',
    image: 'assets/img_3207.webp'
  },
  {
    kicker: 'SAHADA UYGULAMA',
    title: 'Uygulama ve teslim',
    copy: 'Üretim koordinasyonu, saha planı ve montaj adımlarını yöneterek uygulamayı planlı biçimde tamamlarız.',
    image: 'assets/img_3208.webp'
  }
];

const processKicker = document.querySelector('[data-process-kicker]');
const processTitle = document.querySelector('[data-process-title]');
const processCopy = document.querySelector('[data-process-copy]');
const processImage = document.querySelector('[data-process-image]');
const processStage = document.querySelector('.process-stage');

document.querySelectorAll('[data-process]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const index = Number(tab.dataset.process);
    const data = processData[index];
    if (!data || !processTitle || !processCopy || !processImage) return;
    document.querySelectorAll('[data-process]').forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      item.setAttribute('aria-selected', String(item === tab));
    });
    processStage?.classList.add('is-changing');
    if (processKicker) processKicker.textContent = data.kicker;
    processTitle.textContent = data.title;
    processCopy.textContent = data.copy;
    processImage.src = data.image;
    processImage.alt = data.title;
    processImage.onload = () => processStage?.classList.remove('is-changing');
    window.setTimeout(() => processStage?.classList.remove('is-changing'), 450);
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = [
    'Merhaba, projem için teklif almak istiyorum.',
    `Ad Soyad: ${data.get('name') || '-'}`,
    `E-posta: ${data.get('email') || '-'}`,
    `Konu: ${data.get('subject') || '-'}`,
    `Proje: ${data.get('message') || '-'}`
  ].join('\n');
  window.open(`https://wa.me/905476060616?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
