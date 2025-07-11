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
