// Bron: ChatGPT (Prompt: "Maak een typewriter-effect voor een naam in JavaScript")
// Aangepast: verschillende titels toegevoegd en snelheid dynamisch gemaakt

async function updateName() {
    try {
        const response = await fetch('https://fdnd.directus.app/items/person/193');
        const data = await response.json();
        const profileNameElement = document.querySelector('.profile-info h1');
        profileNameElement.textContent = data.data.name;
        createTypewriter(profileNameElement, data.data.name);
    } catch (error) {
        console.error('Fout bij het ophalen van de naam:', error);
    }
}
document.addEventListener('DOMContentLoaded', updateName);


// API endpoint configuration
const baseURL = 'https://fdnd.directus.app/';    // Base URL for the API
const endpointMe = 'items/person/193';           // Specific endpoint for person data
const my_URL = baseURL + endpointMe;             // Complete API URL

// Function to fetch data from the API
async function getData(URL) {
    const response = await fetch(URL);
    return await response.json();
}

// Creates and manages typewriter animation effect
function createTypewriter(element, originalName) {
    // Array of text variations to display
    const titles = [
        "Hey, ik ben " + originalName,
        "Cyber Beveiliger",
        "Welkom op mijn website!",
        originalName
    ];

    // Create wrapper for typewriter animation
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.width = '100%';
    wrapper.style.height = element.offsetHeight + 'px';
    
    // Insert wrapper and move element inside it
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);

    // Style the element for animation
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100%';
    element.style.margin = '0';
    element.style.whiteSpace = 'nowrap';
    element.style.textAlign = 'center';

    // Animation state variables
    let currentTitleIndex = 0;    // Tracks current title being displayed
    let isDeleting = false;       // Tracks if we're deleting or typing
    let text = '';                // Current text being displayed

    // Main animation function
    function tick() {
        let currentTitle = titles[currentTitleIndex];
        
        // Handle text deletion or addition
        if (isDeleting) {
            text = currentTitle.substring(0, text.length - 1);
        } else {
            text = currentTitle.substring(0, text.length + 1);
        }

        // Update display text
        element.textContent = text;

        // Determine next animation state
        if (!isDeleting && text === currentTitle) {
            // Pause at complete text
            isDeleting = true;
            setTimeout(tick, 2000);
        } else if (isDeleting && text === '') {
            // Move to next title when current is deleted
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            setTimeout(tick, 500);
        } else {
            // Continue typing/deleting
            setTimeout(tick, isDeleting ? 100 : 200);
        }
    }

    // Start the animation
    tick();
}

// Main function to update name across the site
async function updateName() {
    try {
        // Fetch person data from API
        const data193 = await getData(my_URL);
        const myName = data193.data.name;

        // Update profile name with typewriter effect
        const profileNameElement = document.querySelector('.profile-info h1');
        if (profileNameElement) {
            profileNameElement.textContent = myName;
            
            // Initialize typewriter animation
            createTypewriter(profileNameElement, myName);

            console.log(data193);
        }

        // Update footer copyright with name
        const copyrightElement = document.querySelector('.copyright');
        if (copyrightElement) {
            copyrightElement.textContent = `© 2025 ${myName}`;
        }

        // Update page title
        document.title = myName;
    } catch (error) {
        console.error('Error updating name:', error);
    }
}

// Initialize name updates when DOM is loaded
document.addEventListener('DOMContentLoaded', updateName);