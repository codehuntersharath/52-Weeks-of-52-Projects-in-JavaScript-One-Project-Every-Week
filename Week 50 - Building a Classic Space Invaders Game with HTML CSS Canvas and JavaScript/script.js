document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("Canvas");
    const ctx = canvas.getContext("2d");

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let score = 0;
    let gameInterval;
    let isGameRunning = false;

    const displayMessage = (param) => {
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.75;
        ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.font = "36px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(param, canvas.width / 2, canvas.height / 2);
    };
    displayMessage("START GAME!");

    window.addEventListener("keydown", (e) => {
        if (
            (e.key == " " || e.code == "Space" || e.keyCode == 32) &&
            !isGameRunning
        ) {
            isGameRunning = true;
            bullet.array = [];
            score = 0;
            updateScore();
            createInvaders();
            gameInterval = setInterval(gameLoop, 10);
        }
    });

    function gameLoop() {
        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        drawPlayer();
        movePlayer();

        drawBullets();
        moveBullets();

        drawInvaders();
        moveInvaders();

        checkCollisions();
    }

    const player = {
        width: 50,
        height: 30,
        x: canvasWidth / 2 - 25,
        y: canvasHeight - 40,
        speed: 5,
        dx: 0,
    };

    function drawPlayer() {
        ctx.fillStyle = "blue";

        ctx.fillRect(
            player.x + 16.5,
            player.y - player.height / 2,
            player.width / 3,
            player.height
        );
        ctx.fillRect(player.x, player.y, player.width, player.height / 2);
    }

    function movePlayer() {
        player.x += player.dx;
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x + player.width > canvasWidth) {
            player.x = canvasWidth - player.width;
        }
    }

    const bullet = {
        width: 5,
        height: 10,
        speed: 10,
        array: [],
    };

    function drawBullets() {
        ctx.fillStyle = "yellow";
        bullet.array.forEach((b) => {
            ctx.fillRect(b.x, b.y, bullet.width, bullet.height);
        });
    }

    function moveBullets() {
        bullet.array.forEach((b, index) => {
            b.y -= bullet.speed;
            if (b.y + bullet.height < 0) {
                bullet.array.splice(index, 1);
            }
        });
    }

    const invader = {
        width: 40,
        height: 20,
        rows: 5,
        columns: 10,
        array: [],
        speed: 1,
        dx: 1,
        dy: 20,
        down: false,
    };

    function createInvaders() {
        invader.array = [];
        for (let row = 0; row < invader.rows; row++) {
            for (let col = 0; col < invader.columns; col++) {
                invader.array.push({
                    x: col * (invader.width + 10) + 30,
                    y: row * (invader.height + 10) + 30,
                    status: 1,
                });
            }
        }
    }

    function drawInvaders() {
        ctx.fillStyle = "red";
        invader.array.forEach((inv) => {
            if (inv.status === 1) {
                ctx.fillRect(inv.x, inv.y, invader.width, invader.height);
            }
        });
    }

    function moveInvaders() {
        invader.array.forEach((inv) => {
            if (inv.status === 1) {
                inv.x += invader.dx;
            }
        });

        const hitLeftWall = invader.array.some(
            (inv) => inv.status === 1 && inv.x < 0
        );

        const hitRightWall = invader.array.some(
            (inv) => inv.status === 1 && inv.x + invader.width > canvasWidth
        );

        if (hitLeftWall || hitRightWall) {
            invader.dx *= -1;
            invader.down = true;
        }

        if (invader.down) {
            invader.array.forEach((inv) => {
                if (inv.status === 1) {
                    inv.y += invader.dy;
                }
            });
            invader.down = false;
        }
    }

    function checkCollisions() {
        bullet.array.forEach((b, bIndex) => {
            invader.array.forEach((i, iIndex) => {
                if (
                    i.status === 1 &&
                    b.x < i.x + invader.width &&
                    b.x + bullet.width > i.x &&
                    b.y < i.y + invader.height &&
                    b.y + bullet.height > i.y
                ) {
                    i.status = 0;
                    bullet.array.splice(bIndex, 1);
                    score += 10;
                    updateScore();
                }
            });
        });

        invader.array.forEach((inv) => {
            if (inv.status === 1 && inv.y + invader.height > player.y) {
                clearInterval(gameInterval);
                displayMessage("GAME OVER");
                isGameRunning = false;
            }
        });

        if (invader.array.every((inv) => inv.status === 0)) {
            clearInterval(gameInterval);
            displayMessage("GAME COMPLETED!");
            isGameRunning = false;
        }
    }

    document.addEventListener("keydown", (e) => {
        if (isGameRunning) {
            if (e.key === "ArrowRight") {
                player.dx = player.speed;
            } else if (e.key === "ArrowLeft") {
                player.dx = -player.speed;
            } else if (e.key === "x") {
                bullet.array.push({
                    x: player.x + player.width / 2 - bullet.width / 2,
                    y: player.y,
                });
            }
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            player.dx = 0;
        }
    });

    function updateScore() {
        document.getElementById("score").textContent = score;
    }
});
