document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.querySelector('.form-container');
    const button = document.querySelector('.creator-button button');
  
    formContainer.style.display = 'none';
  
    button.addEventListener('click', function() {
      formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    });
});

import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

