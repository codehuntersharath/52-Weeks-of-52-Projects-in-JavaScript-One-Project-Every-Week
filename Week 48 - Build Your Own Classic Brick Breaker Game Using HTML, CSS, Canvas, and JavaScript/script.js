document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const color = "#78c1f3";
  ctx.font = "25px Poppins";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Press Space to Start the Game!", 325, 225);

  let IsGameStarts = true;
  const paddleHeight = 10;
  const paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;

  const ballRadius = 10;
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;

  let score = 0;
  let lives = 3;
  var continueAnimating = true;

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  function drawScore() {
    ctx.font = "16px Poppins";
    ctx.fillStyle = color;
    ctx.fillText("Score: " + score, 45, 20);
  }

  function drawLives() {
    ctx.font = "16px Poppins";
    ctx.fillStyle = color;
    ctx.fillText("Lives: " + lives, canvas.width - 45, 20);
  }

  const brickRowCount = 5;
  const brickColumnCount = 7;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  let bricks = [];
  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = brickColor(r);
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function brickColor(x) {
    if (x === 0) {
      ctx.fillStyle = "#6600cc";
    }
    if (x === 1) {
      ctx.fillStyle = "green";
    }
    if (x === 2) {
      ctx.fillStyle = "pink";
    }
    if (x === 3) {
      ctx.fillStyle = "orange";
    }
    if (x === 4) {
      ctx.fillStyle = "#78c1f3";
    }
  }

  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  document.addEventListener("mousemove", mouseMoveHandler);

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }

    if (
      (e.key == " " || e.code == "Space" || e.keyCode == 32) &&
      IsGameStarts
    ) {
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;

      score = 0;
      lives = 3;

      bricks = [];
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }

      IsGameStarts = false;
      continueAnimating = true;
      draw();
    }
  }

  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "25px Poppins";
          ctx.fillStyle = color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Game Over! Press Space to Restart the Game!", 325, 225);
          IsGameStarts = true;
          continueAnimating = false;
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;

    if (continueAnimating) {
      requestAnimationFrame(draw);
    }
  }

  function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];

        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score === brickRowCount * brickColumnCount) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.font = "20px Poppins";
              ctx.fillStyle = color;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(
                "Congratulations!! You've won! Press Space to Restart the Game!",
                325,
                225
              );
              IsGameStarts = true;
              continueAnimating = false;
            }
          }
        }
      }
    }
  }
});
