// myName.js - Titles in one line
const baseURL = 'https://fdnd.directus.app/';
const endpointMe = 'items/person/193';
const my_URL = baseURL + endpointMe;

async function getData(URL) {
    const response = await fetch(URL);
    return await response.json();
}

function createTypewriter(element, originalName) {
    const titles = [
        "Hey, ik ben " + originalName,
        "Cyber Beveiliger",
        "Welkom op mijn website!",
        originalName
    ];

    // Wrap the original element
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.width = '100%';
    wrapper.style.height = element.offsetHeight + 'px';
    
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);

    // Position absolutely within wrapper
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100%';
    element.style.margin = '0';
    element.style.whiteSpace = 'nowrap';
    element.style.textAlign = 'center';

    let currentTitleIndex = 0;
    let isDeleting = false;
    let text = '';

    function tick() {
        let currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            text = currentTitle.substring(0, text.length - 1);
        } else {
            text = currentTitle.substring(0, text.length + 1);
        }

        element.textContent = text;

        if (!isDeleting && text === currentTitle) {
            isDeleting = true;
            setTimeout(tick, 2000);
        } else if (isDeleting && text === '') {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            setTimeout(tick, 500);
        } else {
            setTimeout(tick, isDeleting ? 100 : 200);
        }
    }

    tick();
}

async function updateName() {
    try {
        const data193 = await getData(my_URL);
        const myName = data193.data.name;

        const profileNameElement = document.querySelector('.profile-info h1');
        if (profileNameElement) {
            profileNameElement.textContent = myName;
            
            // Initialize typewriter effect
            createTypewriter(profileNameElement, myName);
        }

        document.title = myName;
    } catch (error) {
        console.error('Error updating name:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateName);