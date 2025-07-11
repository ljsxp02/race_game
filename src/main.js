// Canvas initialization and render loop
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player;

function resizeCanvas() {
    canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Adjust canvas size on load and when the window is resized
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

function gameLoop() {
     // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the track first, then the player car
  if (typeof drawTrack === 'function') {
    drawTrack(ctx);
  }

  if (player) {
    player.update();
    player.draw(ctx);
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop after the page loads
window.addEventListener('load', () => {
    resizeCanvas();
    // Position the player in the center of the canvas
    player = new PlayerCar(canvas.width / 2, canvas.height / 2);
    gameLoop();
  });