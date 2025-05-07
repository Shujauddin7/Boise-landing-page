// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Form submission handler
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      preferredTime: formData.get('preferred-time'),
      message: formData.get('message')
    };
    
    // For now, just show an alert (replace with actual form submission logic later)
    alert("Thank you! Your message has been sent successfully.");
    this.reset();
  });

  // Smooth scroll for scroll-to links
  document.querySelectorAll('.scroll-to').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});