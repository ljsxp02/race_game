// PlayerCar class handles player-controlled vehicle logic

const keyState = {};

window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    keyState[e.key] = true;
    e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    keyState[e.key] = false;
    e.preventDefault();
  }
});

class PlayerCar {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 0;
    this.image = new Image();
    this.image.src = 'assets/cars/player.png';
  }

  update() {
    const accel = 0.2;
    const maxSpeed = 5;
    const friction = 0.05;
    const turnSpeed = 0.05;

    if (keyState['ArrowUp']) {
      this.speed += accel;
    }
    if (keyState['ArrowDown']) {
      this.speed -= accel;
    }

    // Apply friction
    if (this.speed > 0) {
      this.speed = Math.max(0, this.speed - friction);
    } else if (this.speed < 0) {
      this.speed = Math.min(0, this.speed + friction);
    }

    // Clamp speed
    if (this.speed > maxSpeed) this.speed = maxSpeed;
    if (this.speed < -maxSpeed / 2) this.speed = -maxSpeed / 2;

    if (keyState['ArrowLeft']) {
      this.angle -= turnSpeed;
    }
    if (keyState['ArrowRight']) {
      this.angle += turnSpeed;
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
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

window.PlayerCar = PlayerCar;
