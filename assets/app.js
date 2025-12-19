// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  const toggleMenu = () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.textContent = open ? '✕' : '☰';
  };

  menuBtn.addEventListener('click', toggleMenu);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) toggleMenu();
  }));
}

// Active nav highlight by filename
(function highlightActiveNav(){
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href.endsWith(path)) a.classList.add('active');
  });
})();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
