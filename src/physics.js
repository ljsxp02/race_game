// Shared physics handler for both player and AI controlled cars

/**
 * Update basic car physics.
 *
 * @param {Object} car - Car object to update. The object should have
 *   `x`, `y`, `angle` and `speed` properties. Optional properties that may
 *   tune behaviour:
 *   - `accelRate`  : acceleration amount per update (default 0.2)
 *   - `maxSpeed`   : maximum forward speed (default 5)
 *   - `friction`   : friction applied each frame (default 0.05)
 *   - `turnSpeed`  : angular speed when turning (default 0.05)
 *   - `input`      : control flags with boolean properties
 *                    `accelerate`, `brake`, `turnLeft`, `turnRight`.
 */
function updateCarPhysics(car) {
  if (!car) return;

  const {
    accelRate = 0.2,
    maxSpeed = 5,
    friction = 0.05,
    turnSpeed = 0.05,
    input = {},
  } = car;

  const { accelerate, brake, turnLeft, turnRight } = input;

  // Acceleration and braking
  if (accelerate) {
    car.speed = (car.speed || 0) + accelRate;
  }
  if (brake) {
    car.speed = (car.speed || 0) - accelRate;
  }

  // Clamp speed to allowed range
  if (car.speed > maxSpeed) car.speed = maxSpeed;
  if (car.speed < -maxSpeed / 2) car.speed = -maxSpeed / 2;

  // Turning
  if (turnLeft) {
    car.angle -= turnSpeed;
  }
  if (turnRight) {
    car.angle += turnSpeed;
  }

  // Apply friction
  if (car.speed > 0) {
    car.speed = Math.max(0, car.speed - friction);
  } else if (car.speed < 0) {
    car.speed = Math.min(0, car.speed + friction);
  }

  // Update position based on current speed and angle
  car.x += Math.cos(car.angle) * car.speed;
  car.y += Math.sin(car.angle) * car.speed;
}

// Expose function globally so player.js or ai.js can call it
window.updateCarPhysics = updateCarPhysics;

