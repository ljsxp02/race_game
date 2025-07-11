const trackImage = new Image();
let isLoaded = false;
trackImage.onload = () => {
  isLoaded = true;
};
trackImage.src = 'assets/tracks/monaco.png';

function drawTrack(ctx) {
  if (!isLoaded) return;
  ctx.drawImage(trackImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Expose the function for use in other scripts
window.drawTrack = drawTrack;

// Generate a simple elliptical track path for AI cars
function getTrackPath(canvasWidth = 800, canvasHeight = 600, points = 200) {
    const path = [];
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radiusX = canvasWidth * 0.4;
    const radiusY = canvasHeight * 0.3;
  
    for (let i = 0; i < points; i++) {
      const angle = (2 * Math.PI * i) / points;
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);
      path.push({ x, y });
    }
  
    return path;
  }
  
  // Expose the path generator
  window.getTrackPath = getTrackPath;
  