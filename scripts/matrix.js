// Bron: Inspiratie uit verschillende tutorials over het Matrix-effect
// Aangepast: optimalisaties toegevoegd voor snelheid en responsiviteit

// Matrix Effect Class - Creates a Matrix-style raining characters animation
class MatrixEffect {
    // Constructor initializes the canvas and gets the context
    constructor(element) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.element = element;
        this.initialize();
    }

    // Initialize the Matrix effect setup
    initialize() {
        // Setup canvas positioning within the target element
        this.element.style.position = 'relative';     // Enable relative positioning for parent
        this.canvas.style.position = 'absolute';      // Position canvas absolutely within parent
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.opacity = '0.1';            // Set transparency level
        this.canvas.style.pointerEvents = 'none';     // Prevent canvas from intercepting mouse events
        this.element.insertBefore(this.canvas, this.element.firstChild);

        // Handle canvas resizing
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Define character set for Matrix effect (Japanese katakana and numbers)
        this.characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
        this.drops = [];                              // Array to track character drops
        this.initializeDrops();
        
        // Begin animation loop
        this.animate();
    }

    // Handle canvas resizing
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.initializeDrops();                       // Reset drops when canvas is resized
    }

    // Initialize the falling characters
    initializeDrops() {
        const fontSize = 14;                          // Set character size
        const columns = Math.floor(this.canvas.width / fontSize);  // Calculate number of columns
        this.drops = Array(columns).fill(1);          // Initialize drop positions
        this.fontSize = fontSize;
    }

    // Animation loop for the Matrix effect
    animate() {
        // Create fade effect by drawing semi-transparent black rectangle
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set style for Matrix characters
        this.ctx.fillStyle = '#0F0';                 // Matrix green color
        this.ctx.font = this.fontSize + 'px monospace';
        
        // Update and draw each column of characters
        for(let i = 0; i < this.drops.length; i++) {
            // Select random character
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Draw character at current position
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Reset drop to top when it reaches bottom (with random chance)
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Move drop down
            this.drops[i]++;
        }
        
        // Continue animation loop
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create Matrix effect for header section
    new MatrixEffect(document.querySelector('.header'));
    
    // Create Matrix effect for main content
    new MatrixEffect(document.querySelector('main'));

    // Create Matrix effect for footer section
    new MatrixEffect(document.querySelector('footer'));
});