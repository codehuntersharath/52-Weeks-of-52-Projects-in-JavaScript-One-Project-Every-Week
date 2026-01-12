const scoreElement = document.querySelector("span"),
  helpText = document.querySelector("p"),
  playBtn = document.querySelector("button");

const canvas = document.getElementById("gameCanvas"),
  ctx = canvas.getContext("2d");

let score = 0;
let running = false;

window.onload = function () {
  backgroundImg = new Image();
  backgroundImg.src = "Images/bgBottom.jpg";

  birdImg1 = new Image();
  birdImg1.src = "Images/flappyBird1.png";
  birdImg2 = new Image();
  birdImg2.src = "Images/flappyBird2.png";
  birdImg3 = new Image();
  birdImg3.src = "Images/flappyBird3.png";
  birdImg4 = new Image();
  birdImg4.src = "Images/flappyBird2.png";

  groundImg = new Image();
  groundImg.src = "Images/ground.jpg";
  pipeImg = new Image();
  pipeImg.src = "Images/pipe.jpg";

  backgroundImg.onload = function () {
    drawBackground();
  };

  hitSound = new Audio("Sounds/flappyBirdHit.mp3");
  pointSound = new Audio("Sounds/flappyBirdPoint.mp3");
  backgroundMusic = new Audio("Sounds/flappyBirdBackground.mp3");
};

const groundHeight = 20;
const drawBackground = function () {
  ctx.fillStyle = "#71c4cc";
  ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);
  ctx.drawImage(backgroundImg, 0, canvas.height - backgroundImg.height);
};

playBtn.addEventListener("click", function () {
  document.body.removeChild(playBtn);
  document.body.removeChild(helpText);
  running = true;
  score = 0;

  pipes = [];
  addPipe();
  gameLoop();

  backgroundMusic.loop = true;
  backgroundMusic.play();
});

const gameLoop = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  ground.draw();

  if (!running) return;

  bird.update();
  bird.draw();

  ground.update();

  drawPipes();

  if (bird.y + bird.height > canvas.height - groundHeight) {
    bird.y = canvas.height - groundHeight - bird.height;
    bird.speed = 0;
  } else if (bird.y < 0) {
    bird.y = 0;
    bird.speed = 0;
  }

  requestAnimationFrame(gameLoop);
};

let birdImageFrame = 0;
const flapInterval = 50;
const birdGravity = 0.2;
const birdJump = -4.6;
const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 45,
  height: 30,
  speed: 0,
  gravity: birdGravity,
  jump: birdJump,
  draw: function () {
    if (this.speed < 0) {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(-Math.PI / 16);

      if (birdImageFrame % 3 === 0) {
        ctx.drawImage(
          birdImg1,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else if (birdImageFrame % 3 === 1) {
        ctx.drawImage(
          birdImg2,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else if (birdImageFrame % 3 === 2) {
        ctx.drawImage(
          birdImg3,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else {
        ctx.drawImage(
          birdImg4,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      }
      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(Math.PI / 16);

      if (birdImageFrame % 3 === 0) {
        ctx.drawImage(
          birdImg1,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else if (birdImageFrame % 3 === 1) {
        ctx.drawImage(
          birdImg2,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else if (birdImageFrame % 3 === 2) {
        ctx.drawImage(
          birdImg3,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else {
        ctx.drawImage(
          birdImg4,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      }
      ctx.restore();
    }
  },
  update: function () {
    this.speed += this.gravity;
    this.y += this.speed;
  },
};

canvas.addEventListener("click", function () {
  bird.speed = bird.jump;
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    bird.speed = bird.jump;
  }
});

const ground = {
  x: 0,
  y: canvas.height - groundHeight,
  width: canvas.width,
  height: groundHeight,
  speed: 1,
  update: function () {
    this.x -= this.speed;
    if (this.x <= -this.width) this.x = 0;
  },
  draw: function () {
    ctx.drawImage(groundImg, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      groundImg,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  },
};

let pipes = [];
const pipeWidth = 52;
const minGap = 110;
const maxGap = 190;
const pipeGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
const addPipe = function () {
  const height = Math.floor((Math.random() * canvas.height) / 2) + 50;
  const y = height - pipeGap / 2;
  pipes.push({
    x: canvas.width,
    y: y,
    width: pipeWidth,
    height: height,
  });
};

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y);
    ctx.fillRect(
      pipes[i].x,
      pipes[i].y + pipeGap,
      pipes[i].width,
      canvas.height - pipes[i].y - pipeGap
    );

    // Top pipe
    ctx.beginPath();
    ctx.strokeStyle = "#618842";
    ctx.lineWidth = 4;
    ctx.moveTo(pipes[i].x, pipes[i].y);
    ctx.lineTo(pipes[i].x + pipes[i].width, pipes[i].y);
    ctx.stroke();
    ctx.drawImage(pipeImg, pipes[i].x, 0, pipes[i].width, pipes[i].y);

    // Bottom pipe
    ctx.beginPath();
    ctx.strokeStyle = "#618842";
    ctx.lineWidth = 4;
    ctx.moveTo(pipes[i].x, pipes[i].y + pipeGap);
    ctx.lineTo(pipes[i].x + pipes[i].width, pipes[i].y + pipeGap);
    ctx.stroke();
    ctx.drawImage(
      pipeImg,
      pipes[i].x,
      pipes[i].y + pipeGap,
      pipes[i].width,
      canvas.height - pipes[i].y - pipeGap - groundHeight
    );

    pipes[i].x -= 1;

    // if game over / Check for collisions
    if (
      bird.x < pipes[i].x + pipes[i].width &&
      bird.x + bird.width > pipes[i].x &&
      (bird.y < pipes[i].y || bird.y + bird.height > pipes[i].y + pipeGap)
    ) {
      running = false;
      hitSound.play();
      ground.draw();

      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;

      const replayBtn = document.createElement("button");
      replayBtn.innerText = "Replay";
      replayBtn.style.position = "absolute";
      replayBtn.style.left = "50%";
      replayBtn.style.top = "50%";
      replayBtn.style.transform = "translate(-50%, -50%)";
      replayBtn.addEventListener("click", function () {
        document.body.removeChild(replayBtn);
        running = true;
        score = 0;
        pipes.length = 0;
        addPipe();
        gameLoop();

        backgroundMusic.loop = true;
        backgroundMusic.play();
      });
      document.body.appendChild(replayBtn);
      return;
    }

    if (bird.x > pipes[i].x + pipes[i].width && !pipes[i].passed) {
      pipes[i].passed = true;
      pointSound.play();
      score++;
    }

    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
      i--;
      addPipe();
    }
  }
  ground.draw();
  scoreElement.textContent = score;
}

setInterval(function () {
  birdImageFrame++;
}, flapInterval);
