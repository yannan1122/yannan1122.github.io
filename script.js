const navToggle = document.querySelector('.navbar-toggler');
const primaryNav = document.querySelector('#primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link:not(.nav-cv)')];

function closeMenu() {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('is-open');
}

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
}

const sectionMap = new Map(
  navLinks
    .map((link) => [link, document.querySelector(link.getAttribute('href'))])
    .filter(([, section]) => section)
);

if ('IntersectionObserver' in window && sectionMap.size) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', sectionMap.get(link) === entry.target);
        });
      });
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
  );

  sectionMap.forEach((section) => observer.observe(section));
}
