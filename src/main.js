// Canvas initialization and render loop
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Adjust canvas size on load and when the window is resized
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

function render() {
    // Clear the screen with black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw placeholder text in the center
    ctx.fillStyle = 'white';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Race Game Start', canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game loop after the page loads
window.addEventListener('load', () => {
    resizeCanvas();
    gameLoop();
});