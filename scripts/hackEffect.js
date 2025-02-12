// Bron: ChatGPT (Prompt: "Maak een nep-hack effect voor een website")
// Aangepast: nieuwe berichten toegevoegd en snelheid aangepast

// Initialize hack effect when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to key elements
    const profileImage = document.querySelector('.profile-image');
    const body = document.body;

    // Add secret class for styling
    profileImage.classList.add('secret-hack');

    // Add tooltip to hint at clickable functionality
    profileImage.title = "😈 Klik hier voor een verrassing!";

    // Flag to prevent multiple simultaneous animations
    let isHacking = false;

    // Add click event listener to profile image
    profileImage.addEventListener('click', async () => {
        // Prevent multiple instances of the hack animation
        if (isHacking) return;
        isHacking = true;

        // Create and append overlay for hack effect
        const hackOverlay = document.createElement('div');
        hackOverlay.className = 'hack-overlay';
        body.appendChild(hackOverlay);

        // Define sequence of "hacking" messages
        const messages = [
            "LAPTOP SYSTEEM WORDT GEKRAAKT...",
            "BESTANDEN WORDEN DOORZOCHT...",
            "WACHTWOORDEN WORDEN VERZAMELD...",
            "LOCATIEGEGEVENS WORDEN GEËXTRAHEERD...",
            "DIT WAS SLECHTS EEN GRAP! 😄",
            "PAS OP VOOR ONVERTROUWDE WEBSITES EN LINKS! 🛡️"
        ];

        // Create terminal window for messages
        const terminal = document.createElement('div');
        terminal.className = 'hack-terminal';
        hackOverlay.appendChild(terminal);

        // Display each message with typewriter effect
        for (let message of messages) {
            await typeMessage(message, terminal);  // Type out message
            await sleep(1000);                     // Pause between messages
        }

        // Clean up after animation
        await sleep(2000);  // Final pause before fadeout
        hackOverlay.style.animation = 'glitch-fade-out 0.5s forwards';
        
        // Remove overlay after fadeout
        setTimeout(() => {
            body.removeChild(hackOverlay);
            isHacking = false;  // Reset hack state
        }, 500);
    });
});

// Helper Functions

// Create a promise that resolves after specified milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to create typewriter effect for messages
async function typeMessage(message, element) {
    element.innerHTML = ''; // Clear any existing message
    // Type each character with delay
    for (let char of message) {
        element.innerHTML += char;
        await sleep(50);  // Delay between characters
    }
}