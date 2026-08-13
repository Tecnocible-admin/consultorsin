(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

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
    const subject = encodeURIComponent(data.get('asunto') || 'Consulta desde el sitio web');
    const body = encodeURIComponent([
      `Nombre: ${data.get('nombre') || ''}`,
      `Correo: ${data.get('correo') || ''}`,
      `Teléfono: ${data.get('telefono') || ''}`,
      '',
      data.get('mensaje') || ''
    ].join('\n'));
    const status = document.querySelector('[data-form-status]');
    if (status) status.textContent = 'Abriendo tu aplicación de correo…';
    window.location.href = `mailto:brunomorfincruz7@gmail.com?subject=${subject}&body=${body}`;
  });
})();
