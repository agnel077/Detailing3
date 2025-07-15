document.addEventListener('DOMContentLoaded', () => {
// =====================
// Hamburger menu toggle
// =====================
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('primary-navigation');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
    hamburger.classList.toggle('active'); // animate bars
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      hamburger.classList.remove('active');
    });
  });
}
  // ==========================
  // Auto-scroll controls
  // ==========================
  function setupAutoScroll(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const pause = () => track.classList.add('paused');
    const resume = () => track.classList.remove('paused');
    const slowDown = () => track.classList.add('slowed');
    const restoreSpeed = () => track.classList.remove('slowed');

    track.addEventListener('mousedown', pause);
    track.addEventListener('mouseup', resume);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('mouseenter', slowDown);
    track.addEventListener('mouseleave', restoreSpeed);
    track.addEventListener('touchstart', slowDown);
    track.addEventListener('touchend', restoreSpeed);
  }

  setupAutoScroll('scrollTrack');       // Left scroll
  setupAutoScroll('scrollTrackRight');  // Right scroll

  // ==========================
  // Toggle before/after image view
  // ==========================
  document.querySelectorAll('.before-after-toggle').forEach(container => {
    const afterBtn = container.querySelector('.after-btn');
    const beforeBtn = container.querySelector('.before-btn');

    afterBtn?.addEventListener('click', () => container.classList.toggle('active'));
    beforeBtn?.addEventListener('click', () => container.classList.remove('active'));
  });

  // ==========================
  // Preload scroll images
  // ==========================
  const scrollImages = [
    'images/pexels-garvin-st-villier-719266-9452107.jpg',
    'images/pexels-zenzazione-2922142.jpg',
    'images/pexels-pixabay-326259.jpg',
    'images/pexels-forest-runner-1234567.jpg',
    'images/pexels-cityscape-2345678.jpg',
    'images/pexels-car-detailing-3456789.jpg'
  ];

  scrollImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});
