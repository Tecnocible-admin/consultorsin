(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  document.querySelectorAll('a[href="consultorio.html"]').forEach((link) => {
    link.setAttribute('href', 'index.html');
  });

  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
  window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 28), { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

  const contactForm = document.querySelector('[data-contact-form]');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const message = [
      '¡Hola! Tengo una consulta.',
      `Servicio: ${data.get('asunto') || 'Consulta desde el sitio web'}`,
      `Mensaje: ${data.get('mensaje') || ''}`,
      `Nombre: ${data.get('nombre') || ''}`,
      `Tel/Whats: ${data.get('telefono') || ''}`
    ].join('\n');
    const status = document.querySelector('[data-form-status]');
    if (status) status.textContent = 'Abriendo WhatsApp…';
    window.open(`https://wa.me/523121807074?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();
