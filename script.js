const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  const setMenuOpen = (isOpen) => {
    nav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    toggle.textContent = isOpen ? '✕' : '☰';
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && nav.classList.contains('open')) {
      setMenuOpen(false);
    }
  });
}
