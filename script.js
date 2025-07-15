// =====================
// Fill message box on service card click
// =====================
const serviceCards = document.querySelectorAll('.service-option');
const messageBox = document.getElementById('message');
const contactSection = document.getElementById('contact');
const vehicleSelect = document.getElementById('vehicleType');
const conditionSelect = document.getElementById('conditionLevel');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const service = card.getAttribute('data-service');
    const vehicle = vehicleSelect.options[vehicleSelect.selectedIndex].text;
    const condition = conditionSelect.options[conditionSelect.selectedIndex].text;

    if (messageBox && contactSection) {
      messageBox.value = `Hi, I am interested in ${service} for my ${vehicle} -${condition} condition.`;
      messageBox.focus();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =====================
// Close announcement box
// =====================
const announcementBox = document.getElementById('announcementBox');
const closeBtn = document.getElementById('closeAnnouncement');

if (closeBtn && announcementBox) {
  closeBtn.addEventListener('click', () => {
    announcementBox.style.display = 'none';
  });
}

// =====================
// Show thank you popup on form submit
// =====================
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

  track.style.width = `${(total / perView) * 100}%`;

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
  currentSlide = 0;
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
// Vehicle Type Pricing with Condition Ranges
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const vehicleSelect = document.getElementById('vehicleType');
  const serviceCards = document.querySelectorAll('.service-option');

  const vehiclePrices = {
    sedan: {
      "Interior Detailing": 100,
      "Interior + Exterior Wash": 160
    },
    suv2: {
      "Interior Detailing": 110,
      "Interior + Exterior Wash": 150
    },
    suv: {
      "Interior Detailing": 120,
      "Interior + Exterior Wash": 160
    },
    pickup: {
      "Interior Detailing": 150,
      "Interior + Exterior Wash": 200
    }
  };

  function updatePrices() {
    const vehicle = vehicleSelect?.value;

    serviceCards.forEach(card => {
      const service = card.getAttribute('data-service');
      const priceSpan = card.querySelector('.price-value');

      if (
        vehicle &&
        vehiclePrices[vehicle] &&
        vehiclePrices[vehicle][service] &&
        priceSpan
      ) {
        const basePrice = vehiclePrices[vehicle][service];
        const maxPrice = Math.round(basePrice * 1.4);
        priceSpan.textContent = `${basePrice} – ${maxPrice}`;
      } else if (priceSpan) {
        priceSpan.textContent = '–';
      }
    });
  }

  vehicleSelect?.addEventListener('change', updatePrices);
  updatePrices(); // Run once on load
});


