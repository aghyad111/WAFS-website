// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll voor navigatie links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobiel menu toggle
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '☰';
    document.querySelector('.main-nav').prepend(menuButton);

    menuButton.addEventListener('click', () => {
        document.querySelector('.main-nav ul').classList.toggle('show');
    });

    // Eenvoudige fade-in animatie voor secties
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.section').forEach((section) => {
        observer.observe(section);
    });
});