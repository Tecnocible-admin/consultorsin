(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-dot]')];
  const current = carousel.querySelector('[data-current]');
  const caption = carousel.querySelector('[data-caption]');
  const video = carousel.querySelector('video');
  const videoButton = carousel.querySelector('.video-toggle');
  let active = 0;
  let timer;

  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(active + 1), 4800);
  };

  const show = (index) => {
    const previous = active;
    active = (index + slides.length) % slides.length;
    if (previous === active && slides[active].classList.contains('is-active')) return;

    slides.forEach((slide) => slide.classList.remove('is-leaving'));
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === active));
    if (previous !== active) {
      slides[previous].classList.add('is-leaving');
      window.setTimeout(() => slides[previous].classList.remove('is-leaving'), 820);
    }

    dots.forEach((dot, i) => {
      const selected = i === active;
      dot.classList.toggle('is-active', selected);
      dot.setAttribute('aria-selected', String(selected));
    });
    current.textContent = String(active + 1).padStart(2, '0');
    caption.textContent = slides[active].querySelector('figcaption').textContent.replace(/^\s*\d+\s*/, '').trim();

    if (video) {
      const videoIsActive = slides[active].classList.contains('reel-slide--video');
      if (videoIsActive) {
        video.play().then(() => videoButton.classList.add('is-playing')).catch(() => videoButton.classList.remove('is-playing'));
      } else {
        video.pause();
        videoButton.classList.remove('is-playing');
      }
    }
    restart();
  };

  carousel.querySelector('[data-prev]').addEventListener('click', () => show(active - 1));
  carousel.querySelector('[data-next]').addEventListener('click', () => show(active + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.dot))));
  videoButton?.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      videoButton.classList.add('is-playing');
    } else {
      video.pause();
      videoButton.classList.remove('is-playing');
    }
  });
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  restart();
})();
