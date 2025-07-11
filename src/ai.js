class AICar {
    constructor(trackPath = [], id = 1) {
      this.trackPath = trackPath;
      this.pathIndex = 0;
      const start = trackPath[0] || { x: 0, y: 0 };
      this.x = start.x;
      this.y = start.y;
      this.angle = 0;
      this.speed = 3; // slightly slower than player max speed
      this.image = new Image();
      this.image.src = `assets/cars/ai${id}.png`;
    }
  
    update() {
      if (!this.trackPath.length) return;
      const nextIndex = (this.pathIndex + 1) % this.trackPath.length;
      const target = this.trackPath[nextIndex];
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const dist = Math.hypot(dx, dy);
  
      if (dist < this.speed) {
        this.x = target.x;
        this.y = target.y;
        this.pathIndex = nextIndex;
      } else {
        this.angle = Math.atan2(dy, dx);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
      }
    }
  
    draw(ctx) {
      if (!this.image.complete) return;
      const { width, height } = this.image;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(this.image, -width / 2, -height / 2);
      ctx.restore();
    }
  }
  
  window.AICar = AICar;
  