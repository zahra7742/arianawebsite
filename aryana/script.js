// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Highlight active nav link on scroll
const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => io.observe(s));

// Articles carousel: drag with the mouse (touch/trackpad scroll natively)
const track = document.querySelector('.art-track');
if (track) {
  let down = false, moved = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; moved = false;
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add('dragging'); }
    if (moved) track.scrollLeft = startScroll - dx;
  });
  const end = () => {
    if (!down) return;
    down = false;
    track.classList.remove('dragging');   // re-enables snap so cards settle into place
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
  // swallow the click that ends a drag so links/cards don't fire
  track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  track.addEventListener('dragstart', e => e.preventDefault());
}
// Scroll-reveal animations
const revealSel = '.about-card > *, .app-banner, .aud-card, .trust-item, .faq-card, .art, .acc details, .photo';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      ro.unobserve(el);
      // drop the helper classes afterwards so hover transforms still work
      setTimeout(() => el.classList.remove('reveal', 'in'), 1400);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(revealSel).forEach(el => {
    const sibs = [...el.parentElement.children];
    el.style.setProperty('--d', (sibs.indexOf(el) % 5) * 90 + 'ms');
    el.classList.add('reveal');
    ro.observe(el);
  });
}

// Accordion: keep one FAQ open at a time
const items = document.querySelectorAll('.acc details');
items.forEach(d => d.addEventListener('toggle', () => {
  if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
}));


