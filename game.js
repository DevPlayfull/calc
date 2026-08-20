const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let birdY = 300;
let birdX = 50;
let velocity = 0;
const gravity = 0.4;
const jump = -7;
let score = 0;
let gameOver = false;

// Pipe properties
let pipes = [];
const pipeWidth = 60;
const pipeGap = 140;
const pipeSpeed = 2;
let frameCount = 0;

// Handle user controls
function handleControl() {
    if (gameOver) {
        resetGame();
    } else {
        velocity = jump;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") handleControl();
});
canvas.addEventListener("click", handleControl);

function resetGame() {
    birdY = 300;
    velocity = 0;
    pipes = [];
    score = 0;
    frameCount = 0;
    gameOver = false;
    loop();
}

function spawnPipes() {
    if (frameCount % 120 === 0) {
        // Randomize the height of the top pipe slice
        let minHeight = 50;
        let maxHeight = canvas.height - pipeGap - minHeight;
        let topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

        pipes.push({
            x: canvas.width,
            top: topHeight,
            bottom: canvas.height - topHeight - pipeGap,
            passed: false
        });
    }
}

function update() {
    if (gameOver) return;

    // Apply gravity
    velocity += gravity;
    birdY += velocity;

    // Ceiling and floor boundaries
    if (birdY + 15 >= canvas.height || birdY - 15 <= 0) {
        gameOver = true;
    }

    // Move pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= pipeSpeed;

        // Collision Check
        if (
            birdX + 15 > pipes[i].x && 
            birdX - 15 < pipes[i].x + pipeWidth && 
            (birdY - 15 < pipes[i].top || birdY + 15 > canvas.height - pipes[i].bottom)
        ) {
            gameOver = true;
        }

        // Score tracking
        if (!pipes[i].passed && pipes[i].x + pipeWidth < birdX) {
            score++;
            pipes[i].passed = true;
        }

        // Remove off-screen pipes
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    }

    spawnPipes();
    frameCount++;
}

function draw() {
    // Clear canvas frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background placeholder clouds/ground
    ctx.fillStyle = "#ded895";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // Draw Bird (Yellow Circle)
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.arc(birdX, birdY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Draw Pipes (Green Rectangles)
    ctx.fillStyle = "#2ecc71";
    pipes.forEach(pipe => {
        // Top Pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        // Bottom Pipe
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    });

    // Draw Interface Text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Score: " + score, 20, 45);

    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#fff";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "20px Arial";
        ctx.fillText("Click or Space to Restart", canvas.width / 2, canvas.height / 2 + 20);
        ctx.textAlign = "left"; // reset alignment
    }
}

function loop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(loop);
    }
}

// Initial engine ignition
loop();
