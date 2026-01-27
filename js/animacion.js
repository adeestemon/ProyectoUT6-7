window.addEventListener('scroll', function() {
    const logo = document.getElementById('main-logo');
    
    // Si el usuario baja más de 50px, el logo vuela al header
    if (window.scrollY > 50) {
        logo.classList.add('en-header');
    } else {
        logo.classList.remove('en-header');
    }
});