document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');
    const body = document.body;

    // Voeg een "secret" class toe aan de profielfoto
    profileImage.classList.add('secret-hack');

    // Voeg een tooltip toe
    profileImage.title = "😈 Klik hier voor een verrassing!";

    let isHacking = false;

    profileImage.addEventListener('click', async () => {
        if (isHacking) return;
        isHacking = true;

        // Start het hack effect
        const hackOverlay = document.createElement('div');
        hackOverlay.className = 'hack-overlay';
        body.appendChild(hackOverlay);

        // Tekst elementen voor de "hack"
        const messages = [
            "LAPTOP SYSTEEM WORDT GEKRAAKT...",
            "BESTANDEN WORDEN DOORZOCHT...",
            "WACHTWOORDEN WORDEN VERZAMELD...",
            "LOCATIEGEGEVENS WORDEN GEËXTRAHEERD...",
            "DIT WAS SLECHTS EEN GRAP! 😄",
            "PAS OP VOOR ONVERTROUWDE WEBSITES EN LINKS! 🛡️"
        ];

        // Terminal element
        const terminal = document.createElement('div');
        terminal.className = 'hack-terminal';
        hackOverlay.appendChild(terminal);

        // Toon berichten met typewriter effect
        for (let message of messages) {
            await typeMessage(message, terminal);
            await sleep(1000);
        }

        // Wacht en verwijder het effect
        await sleep(2000);
        hackOverlay.style.animation = 'glitch-fade-out 0.5s forwards';
        setTimeout(() => {
            body.removeChild(hackOverlay);
            isHacking = false;
        }, 500);
    });
});

// Helper functies
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeMessage(message, element) {
    element.innerHTML = ''; // Clear previous message
    for (let char of message) {
        element.innerHTML += char;
        await sleep(50);
    }
}