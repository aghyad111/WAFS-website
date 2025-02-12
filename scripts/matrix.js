class MatrixEffect {
    constructor(element) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.element = element;
        this.initialize();
    }

    initialize() {
        // Voeg canvas toe aan het element
        this.element.style.position = 'relative'; // Zorg dat het element relative positioning heeft
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.opacity = '0.1';
        this.canvas.style.pointerEvents = 'none';
        this.element.insertBefore(this.canvas, this.element.firstChild);

        // Canvas grootte aanpassen
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Matrix karakters
        this.characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
        this.drops = [];
        this.initializeDrops();
        
        // Start de animatie
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.initializeDrops();
    }

    initializeDrops() {
        const fontSize = 14;
        const columns = Math.floor(this.canvas.width / fontSize);
        this.drops = Array(columns).fill(1);
        this.fontSize = fontSize;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for(let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Start het Matrix effect wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    // Matrix effect voor header
    new MatrixEffect(document.querySelector('.header'));
    
    // Matrix effect voor main
    new MatrixEffect(document.querySelector('main'));

    // Matrix effect voor main
    new MatrixEffect(document.querySelector('footer'));
});