// Fill message box when user clicks a service card
const serviceCards = document.querySelectorAll('.service-option');
const messageBox = document.getElementById('message');
const contactSection = document.getElementById('contact');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const service = card.getAttribute('data-service');
    if (messageBox && contactSection) {
      messageBox.value = `Hi Nova, I am interested in ${service}.`;
      messageBox.focus();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Close announcement box
const announcementBox = document.getElementById('announcementBox');
const closeBtn = document.getElementById('closeAnnouncement');

if (closeBtn && announcementBox) {
  closeBtn.addEventListener('click', () => {
    announcementBox.style.display = 'none';
  });
}

// Show thank you popup on form submit
const contactForm = document.querySelector('.contact-form');
const thankYouPopup = document.getElementById('thankYouPopup');

if (contactForm && thankYouPopup) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    thankYouPopup.style.display = 'flex';
    setTimeout(() => {
      thankYouPopup.style.display = 'none';
    }, 3000);
    this.reset();
  });
}

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('primary-navigation');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Auto-close menu when a nav link is clicked (good for mobile UX)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('show')) {
        nav.classList.remove('show');
      }
    });
  });
}

// =====================
// Testimonial carousel
// =====================
const track = document.querySelector('.testimonial-track');
const leftBtn = document.querySelector('.testimonial-nav.left');
const rightBtn = document.querySelector('.testimonial-nav.right');
const testimonials = document.querySelectorAll('.testimonial');

let currentSlide = 0;

const slidesPerView = () => window.innerWidth <= 768 ? 1 : 3;
const totalSlides = () => Math.ceil(testimonials.length / slidesPerView());

function updateTestimonialSlider() {
  if (!track) return;
  const perView = slidesPerView();
  const total = testimonials.length;

  // Set width of track dynamically so it fits all testimonials inline
  track.style.width = `${(total / perView) * 100}%`;

  // Set width of each testimonial so exactly 'perView' fit container width
  testimonials.forEach(testimonial => {
    testimonial.style.width = `${100 / totalSlides()}%`;
  });

  const translateX = -(currentSlide * (100 / totalSlides()));
  track.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= totalSlides()) currentSlide = 0;
  updateTestimonialSlider();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) currentSlide = totalSlides() - 1;
  updateTestimonialSlider();
}

if (leftBtn) leftBtn.addEventListener('click', prevSlide);
if (rightBtn) rightBtn.addEventListener('click', nextSlide);

window.addEventListener('resize', () => {
  currentSlide = 0; // reset on resize
  updateTestimonialSlider();
});

updateTestimonialSlider();
setInterval(nextSlide, 5000);

// =====================
// Inject contact info
// =====================
(() => {
  const contactHTML = `
    <div class="contact-flex">
      <div class="contact-item">
        <strong>Email:</strong><br />
        <a href="mailto:info@novadetail.com">info@novadetail.com</a>
      </div>
      <div class="contact-item">
        <strong>Phone:</strong><br />
        <a href="tel:+1234567890">+1 (234) 567-890</a>
      </div>
      <div class="contact-item">
        <strong>Location:</strong><br />
        Barrie, ON
      </div>
    </div>
  `;

  document.querySelectorAll('[data-contact]').forEach(el => {
    el.innerHTML = contactHTML;
  });
})();

// =====================
// Vehicle Type Pricing
// =====================
const vehiclePrices = {
  sedan: {
    "Interior Detailing": 110,
    "Exterior Wash": 90
  },
  coupe: {
    "Interior Detailing": 100,
    "Exterior Wash": 80
  },
  suv: {
    "Interior Detailing": 130,
    "Exterior Wash": 100
  },
  pickup: {
    "Interior Detailing": 150,
    "Exterior Wash": 120
  }
};

const vehicleTypeSelect = document.getElementById('vehicleType');

function updateServicePrices() {
  if (!vehicleTypeSelect) return;
  const selectedType = vehicleTypeSelect.value;
  const cards = document.querySelectorAll('.service-option');

  cards.forEach(card => {
    const service = card.getAttribute('data-service');
    const priceSpan = card.querySelector('.price-value');
    if (vehiclePrices[selectedType]?.[service]) {
      priceSpan.textContent = vehiclePrices[selectedType][service];
    }
  });
}

if (vehicleTypeSelect) {
  vehicleTypeSelect.addEventListener('change', updateServicePrices);
  document.addEventListener('DOMContentLoaded', updateServicePrices);
}
