// Bron: ChatGPT (Prompt: "Maak een toggle navigatie menu in JavaScript")
// Aangepast: extra aria-label ondersteuning en error handling toegevoegd

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Functionality
    // Get references to menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Toggle mobile menu on hamburger button click
    menuToggle.addEventListener('click', () => {
        const navList = nav.querySelector('ul');
        const isExpanded = navList.classList.contains('show');
        // Toggle menu visibility
        navList.classList.toggle('show');
        // Switch between hamburger and close icons
        menuToggle.innerHTML = isExpanded ? '☰' : '✕';
        // Update ARIA attribute for accessibility
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.querySelector('ul').classList.remove('show');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth Scrolling Implementation
    // Add click handlers to all anchor links that point to page sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            // Calculate scroll position with offset for header
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            // Perform smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Fade-In Animation on Scroll
    // Configure the Intersection Observer options
    const observerOptions = {
        threshold: 0.1,        // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Adjust observation area
    };

    // Create Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in the section when it becomes visible
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize sections for fade-in animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Image Popup Implementation for Timeline and Project Items
    const popupItems = document.querySelectorAll('.timeline-item, .project-card');
    popupItems.forEach(item => {
        // Check if item has an associated popup image
        const popupImage = item.getAttribute('data-popup-image');
        if (popupImage) {
            // Create popup container
            const popupElement = document.createElement('div');
            popupElement.classList.add('timeline-popup');
            
            // Create and configure image element
            const imgElement = document.createElement('img');
            imgElement.src = popupImage;
            imgElement.alt = 'Achtergrondafbeelding';

            // Create and configure link element
            const linkElement = document.createElement('a');
            // Set link URL based on item title
            const itemTitle = item.querySelector('h3').textContent;
            if (itemTitle === 'Oorsprong in Syrië') {
                linkElement.href = 'https://www.tripadvisor.nl/Attractions-g294010-Activities-c47-Syria.html';
                linkElement.textContent = 'Syrië';
            } else if (itemTitle === 'Aankomst in Nederland') {
                linkElement.href = 'https://www.holland.com/global/tourism';
                linkElement.textContent = 'Nederland';
            } else if (itemTitle === 'Taalbarrière en Onderwijsuitdagingen') {
                linkElement.href = 'https://www.movisie.nl/artikel/zonder-taalkennis-geen-participatie-vice-versa';
                linkElement.textContent = 'Taal & Participatie';
            } 
            
            // Configure link styling and attributes
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.style.position = 'absolute';
            linkElement.style.bottom = '10px';
            linkElement.style.left = '50%';
            linkElement.style.transform = 'translateX(-50%)';
            linkElement.style.background = 'rgba(0,0,0,0.7)';
            linkElement.style.color = 'white';
            linkElement.style.padding = '10px 20px';
            linkElement.style.textDecoration = 'none';
            linkElement.style.borderRadius = '5px';
            linkElement.style.zIndex = '1001';

            // Assemble and insert popup
            popupElement.appendChild(imgElement);
            popupElement.appendChild(linkElement);
            item.appendChild(popupElement);

            // Add hover event listeners for popup display
            item.addEventListener('mouseenter', () => {
                popupElement.style.display = 'block';
                document.body.classList.add('popup-active');
            });

            item.addEventListener('mouseleave', () => {
                popupElement.style.display = 'none';
                document.body.classList.remove('popup-active');
            });
        }
    });
});