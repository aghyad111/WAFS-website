document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu (bestaande code blijft ongewijzigd)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    menuToggle.addEventListener('click', () => {
        const navList = nav.querySelector('ul');
        const isExpanded = navList.classList.contains('show');
        navList.classList.toggle('show');
        menuToggle.innerHTML = isExpanded ? '☰' : '✕';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.querySelector('ul').classList.remove('show');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth Scroll (bestaande code blijft ongewijzigd)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Simple Fade In (bestaande code blijft ongewijzigd)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Popup voor timeline items en project cards
    const popupItems = document.querySelectorAll('.timeline-item, .project-card');
    popupItems.forEach(item => {
        const popupImage = item.getAttribute('data-popup-image');
        if (popupImage) {
            const popupElement = document.createElement('div');
            popupElement.classList.add('timeline-popup');
            
            const imgElement = document.createElement('img');
            imgElement.src = popupImage;
            imgElement.alt = 'Achtergrondafbeelding';

            // Voeg link toe
            const linkElement = document.createElement('a');
            // Bepaal de link op basis van de titel
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

            popupElement.appendChild(imgElement);
            popupElement.appendChild(linkElement);
            item.appendChild(popupElement);

            // Hover en close event listeners
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