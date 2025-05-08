document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Popup form handling
  const popup = document.getElementById('popup-form');
  const openPopupButtons = document.querySelectorAll('.open-popup');
  const closePopupButton = document.querySelector('.close-btn');

  openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closePopupButton.addEventListener('click', () => {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close popup when clicking outside the form
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      // Scroll Down
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      // Scroll Up
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  // Google Sheets Integration
  const GOOGLE_SHEET_ID = '1flpeIEebW0U24k7nWdmJHRX2LOh9FYUuxmMTp8SLYTc';
  const GOOGLE_SHEET_NAME = 'Leads';

  async function submitToGoogleSheets(formData, method) {
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message || '',
      method: method,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxaM0WnWZnGmlgydJwUMvNP84k6mG87moCiI5lACF4v0mZd7uDpVe-falqcPrT0s4tc/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('Form submission completed');
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return false;
    }
  }

  // Show success message
  function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.style.display = 'flex';
      console.log('Success message shown');
      
      // Make sure it's visible in the DOM
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Don't auto-hide the message, let the user close it with the button
    } else {
      console.error('Success message element not found');
      alert('Form submitted successfully! We will connect with you as soon as possible.');
    }
  }

  // Show error message
  function showErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
      errorMessage.style.display = 'flex';
      console.log('Error message shown');
      
      // Make sure it's visible in the DOM
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Don't auto-hide the message, let the user close it with the button
    } else {
      console.error('Error message element not found');
      alert('There was an error sending your message. Please try again.');
    }
  }

  // Function to set up message close buttons
  function setupMessageCloseButtons() {
    console.log('Setting up message close buttons');
    document.querySelectorAll('.close-message-btn').forEach(button => {
      // Remove any existing click listeners to avoid duplicates
      button.removeEventListener('click', handleCloseButtonClick);
      // Add the click listener
      button.addEventListener('click', handleCloseButtonClick);
    });
  }

  // Handler function for close button clicks
  function handleCloseButtonClick(e) {
    console.log('Close button clicked');
    // Find the parent message div
    const messageDiv = this.closest('.success-message, .error-message');
    if (messageDiv) {
      console.log('Found message div:', messageDiv.id);
      // Hide the message
      messageDiv.style.display = 'none';
      
      // If it was a popup success message, also close the popup
      if (messageDiv.id === 'success-message') {
        if (popup) {
          popup.classList.remove('active');
          popup.removeAttribute('data-source');
          document.body.style.overflow = '';
        }
      }
    }
  }

  // Add a direct click handler to all close buttons
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up close buttons');
    setupMessageCloseButtons();
    
    // Watch for DOM changes to handle dynamically added elements
    const observer = new MutationObserver(function(mutations) {
      console.log('DOM mutation detected, refreshing close buttons');
      setupMessageCloseButtons();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // Direct click handlers for specific elements
    const specificCloseButtons = [
      document.querySelector('#success-message .close-message-btn'),
      document.querySelector('#error-message .close-message-btn'),
      document.querySelector('#contact-success-message .close-message-btn'),
      document.querySelector('#contact-error-message .close-message-btn')
    ];

    specificCloseButtons.forEach(button => {
      if (button) {
        console.log('Adding direct handler to button:', button);
        button.onclick = function() {
          console.log('Direct button click detected');
          const messageDiv = this.closest('.success-message, .error-message');
          if (messageDiv) {
            messageDiv.style.display = 'none';
            
            // If it was a popup success message, also close the popup
            if (messageDiv.id === 'success-message') {
              if (popup) {
                popup.classList.remove('active');
                popup.removeAttribute('data-source');
                document.body.style.overflow = '';
              }
            }
          }
          return false; // Prevent event bubbling
        };
      }
    });
  });

  // Handle regular contact form
  async function handleContactForm(e) {
    e.preventDefault();
    
    // Determine which form was submitted
    let contactMethod = 'Contact Form';
    let successMessageElement = document.getElementById('contact-success-message');
    let errorMessageElement = document.getElementById('contact-error-message');
    
    if (e.target.id === 'popup-contact-form') {
      // Check if the popup has a data source attribute
      const popupSource = popup.getAttribute('data-source');
      if (popupSource) {
        contactMethod = popupSource;
      } else {
        contactMethod = 'Popup Form';
      }
      
      // Use popup success/error messages
      successMessageElement = document.getElementById('success-message');
      errorMessageElement = document.getElementById('error-message');
    }
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value
    };

    // Add date and time for Google Meet requests
    if (contactMethod === 'Google Meet Link') {
      formData.preferredDate = document.getElementById('preferred-date').value || 'Not specified';
      formData.preferredTime = document.getElementById('preferred-time').value || 'Not specified';
      formData.message = (formData.message || '') + 
                         '\nPreferred Date: ' + formData.preferredDate + 
                         '\nPreferred Time: ' + formData.preferredTime;
    }

    try {
      // Submit to Google Sheets
      const success = await submitToGoogleSheets(formData, contactMethod);
      
      if (success) {
        // Show appropriate success message
        if (successMessageElement) {
          successMessageElement.style.display = 'flex';
          console.log('Success message shown');
          
          // Auto-close after 40 seconds
          setTimeout(() => {
            if (successMessageElement.style.display === 'flex') {
              successMessageElement.style.display = 'none';
              
              // If it was a popup success message, also close the popup
              if (successMessageElement.id === 'success-message') {
                popup.classList.remove('active');
                popup.removeAttribute('data-source');
                document.body.style.overflow = '';
              }
            }
          }, 40000);
        } else {
          alert('Form submitted successfully! We will connect with you as soon as possible.');
        }
        
        e.target.reset();
      } else {
        // Show appropriate error message
        if (errorMessageElement) {
          errorMessageElement.style.display = 'flex';
          console.log('Error message shown');
          
          // Auto-close after 40 seconds
          setTimeout(() => {
            if (errorMessageElement.style.display === 'flex') {
              errorMessageElement.style.display = 'none';
            }
          }, 40000);
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Show appropriate error message
      if (errorMessageElement) {
        errorMessageElement.style.display = 'flex';
        console.log('Error message shown');
        
        // Auto-close after 40 seconds
        setTimeout(() => {
          if (errorMessageElement.style.display === 'flex') {
            errorMessageElement.style.display = 'none';
          }
        }, 40000);
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    }
  }

  // Handle meeting schedule form
  async function handleMeetingForm(e) {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value
    };

    try {
      // Submit to Google Sheets
      const success = await submitToGoogleSheets(formData, 'Google Meet Request');
      
      if (success) {
        showSuccessMessage();
        e.target.reset();
        popup.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        showErrorMessage();
      }
    } catch (error) {
      console.error('Meeting form submission error:', error);
      showErrorMessage();
    }
  }

  // Add event listeners for all forms
  const contactForms = document.querySelectorAll('#contact-form, #popup-contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', handleContactForm);
  });

  // Meeting form
  const meetingForm = document.getElementById('meeting-form');
  if (meetingForm) {
    meetingForm.addEventListener('submit', handleMeetingForm);
  }

  // Update email link to open popup and record method
  const emailLinks = document.querySelectorAll('a[href^="mailto:"], a.contact-btn:has(i.fa-envelope)');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Set a data attribute for later use
      popup.setAttribute('data-source', 'Email Link');
      
      // Hide the date and time fields (in case they were shown before)
      const meetFields = document.querySelectorAll('.meet-fields');
      meetFields.forEach(field => field.style.display = 'none');
      
      // Reset the description
      document.getElementById('popup-description').textContent = 'Fill out the form below, and we\'ll be in touch to discuss your custom website.';
      
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Update Google Meet link to open popup
  const meetLinks = document.querySelectorAll('a[href="https://meet.google.com/"]');
  meetLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Set a data attribute for later use
      popup.setAttribute('data-source', 'Google Meet Link');
      
      // Show the date and time fields for Google Meet
      const meetFields = document.querySelectorAll('.meet-fields');
      meetFields.forEach(field => field.style.display = 'block');
      
      // Set minimum date to today
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('preferred-date').min = today;
      
      // Update the description
      document.getElementById('popup-description').textContent = 'Please provide your contact details and preferred date/time for a Google Meet call.';
      
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Add pre-written text only for direct WhatsApp links
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
  whatsappLinks.forEach(link => {
    if (!link.hasAttribute('data-custom-message')) {
      const defaultMessage = encodeURIComponent('Hi, I want to discuss about the website.');
      link.href = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
    }
  });

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  });

  // Add global event handlers for closing modals with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close any open success or error messages
      document.querySelectorAll('.success-message, .error-message').forEach(message => {
        if (message.style.display === 'flex') {
          message.style.display = 'none';
          // If closing the popup success message, also close the popup
          if (message.id === 'success-message') {
            if (popup) {
              popup.classList.remove('active');
              popup.removeAttribute('data-source');
              document.body.style.overflow = '';
            }
          }
        }
      });
    }
  });

  // Add global click handlers for direct closing of messages
  // This is a fallback approach that adds multiple ways to close messages
  document.addEventListener('click', function(e) {
    // Check if the clicked element is a close button
    if (e.target.classList.contains('close-message-btn')) {
      console.log('Direct button click detected');
      // Close the parent message
      const messageDiv = e.target.closest('.success-message, .error-message');
      if (messageDiv) {
        messageDiv.style.display = 'none';
        
        // If it was a popup success message, also close the popup
        if (messageDiv.id === 'success-message') {
          if (popup) {
            popup.classList.remove('active');
            popup.removeAttribute('data-source');
            document.body.style.overflow = '';
          }
        }
      }
    }
  });
});
 
 