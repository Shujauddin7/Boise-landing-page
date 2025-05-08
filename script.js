document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Popup form handling
  const popup = document.getElementById('popup-form');
  const openPopupBtns = document.querySelectorAll('.open-popup');
  const closePopupBtn = document.querySelector('.close-btn');

  openPopupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.classList.add('active');
    });
  });

  closePopupBtn.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  // Close popup when clicking outside the form
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
    }
  });

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Form submission handling
  const forms = document.querySelectorAll('#contact-form, #popup-contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you! Your message has been sent successfully.");
      this.reset();
      if (this.id === 'popup-contact-form') {
        popup.classList.remove('active');
      }
    });
  });
});