const canvas = document.querySelector("canvas");
const w = (canvas.width = window.innerWidth);
const h = (canvas.height = window.innerHeight - 5);
const n = 200;
const ctx = canvas.getContext("2d");
let els = [];

class Star {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = Math.random() * 6 + 0.5; // Random speed between 0.5 and 6
    this.size = Math.random() * 2; // Random size
    this.draw("white");
  }

  draw(color = "white") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  move() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = w;
      this.y = Math.random() * h;
    }
  }
}

class Spaceship {
    constructor() {
      this.position = { x: w / 2, y: h / 2 };
      this.size = 60; // Size adjustment for the rocket body
      this.width = 30; // Width of the rocket body
      this.height = 120; // Height of the rocket body
      this.finWidth = 15
      ; // Width of the base of the fins
      this.finHeight = 30; // Height of the fins
      this.noseHeight = 40
      ; // Height of the nose cone
      this.color = "#0077be"; // Primary color of the rocket
      this.finColor = "#004d66"; // Color of the fins
      this.engineOn = true;
      this.drawSpaceship();
    }
  
    drawSpaceship() {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
  
      // Rocket body
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(-this.height / 2, -this.width / 2, this.height, this.width);
      ctx.fill();
  
      // Rocket nose cone
      ctx.beginPath();
      ctx.moveTo(this.height/2 , -this.width/2);
      ctx.lineTo(this.height /2 + this.noseHeight, 0);
      ctx.lineTo(this.height/2 , this.width / 2);
      ctx.closePath();
      ctx.fill();
      // Rocket window trim
      ctx.fillStyle = "grey";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(-this.width  + (i * 35), 0, 10, 0, Math.PI * 2);
        ctx.fill();
      }
  
      // Rocket window circles
      ctx.fillStyle = "black";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(-this.width  + (i * 35), 0, 6, 0, Math.PI * 2);
        ctx.fill();
      }
  
      // Rocket fins with arc shape
      ctx.fillStyle = this.finColor;
      ctx.beginPath();
      ctx.moveTo(-this.height / 4, -this.width / 2);
      ctx.quadraticCurveTo(
        -this.height / 8 - this.finHeight, 
        -this.width - this.finWidth , 
        -this.height , 
        -this.width/2,
      );
      ctx.fill();
  
      ctx.beginPath();
      ctx.moveTo(-this.height / 4, this.width / 2);
      ctx.quadraticCurveTo(
        -this.height / 8 - this.finHeight, 
        this.width + this.finWidth , 
        -this.height , 
        this.width/2,
      );
      ctx.fill();

    // Draw the flame if engine is on
    if (this.engineOn) {
      ctx.beginPath();
      ctx.moveTo(-this.height / 2, -this.width / 2);
      ctx.lineTo(-this.height / 2, this.width / 2);
      ctx.lineTo(-this.height / 2 - Math.random() * 100, 0);
      ctx.lineTo(-this.height / 2, -this.width / 2);
      ctx.closePath();
      ctx.fillStyle = "orange";
      ctx.fill();
    }

    // Write text on spaceship
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("UNDER CONSTRUCTION", -75, 40);
    ctx.fillText("WORKING ON THESIS", -55
    , 52
    );

    ctx.restore();
  }

  move(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
    this.drawSpaceship();
  }
}

// Spawn multiple stars
for (let i = 0; i < n; i++) {
  let star = new Star();
  els.push(star);
}

const spaceship = new Spaceship();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, w, h);

  // Draw stars
  els.forEach(star => {
    star.move();
    star.draw();
  });

  // Draw spaceship
  spaceship.drawSpaceship();
}

// Move the spaceship using arrow keys
document.addEventListener("keydown", function(event) {
  const speed = 5;
  switch (event.key) {
    case "ArrowLeft":
      spaceship.move(-speed, 0);
      break;
    case "ArrowRight":
      spaceship.move(speed, 0);
      break;
    case "ArrowUp":
      spaceship.move(0, -speed);
      break;
    case "ArrowDown":
      spaceship.move(0, speed);
      break;
  }
});

update();
