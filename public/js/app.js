// import './bootstrap';

// import Alpine from 'alpinejs';

// window.Alpine = Alpine;

// Alpine.start();

// Ajout d'un écouteur d'événement sur le document qui se déclenche une fois le DOM complètement chargé.
document.addEventListener("DOMContentLoaded", function() {
    
    // On récupère le formulaire.
    const formContainer = document.querySelector('.form-container');
    // On récupère le bouton qui va déclencher l'affichage du formulaire.
    const button = document.querySelector('.creator-button button');
  
    // On cache le formulaire.
    formContainer.style.display = 'none';
  
    // On ajoute un écouteur d'événement sur le bouton qui va afficher/masquer le formulaire.
    button.addEventListener('click', function() {
      formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    });
});