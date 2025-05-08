document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Close popup when clicking outside of it
  const popup = document.getElementById('popup-form');
  const closeBtn = document.querySelector('.close-btn');

  closeBtn.addEventListener('click', function() {
    popup.classList.remove('active');
  });

  window.addEventListener('click', function(event) {
    if (event.target === popup) {
      popup.classList.remove('active');
    }
  });

  // Open popup when clicking on "Discuss your needs" button
  const openPopupButtons = document.querySelectorAll('.open-popup');
  openPopupButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      popup.classList.add('active');
    });
  });

  // Back to top button functionality
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});