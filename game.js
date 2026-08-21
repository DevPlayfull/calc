const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Load images
const bg = new Image();
const fg = new Image();
const birdImg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bg.src = "images/bg.png";
fg.src = "images/fg.png";
birdImg.src = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// Game variables
let gap = 110;
let gravity = 1.5;
let score = 0;

let bX = 50;
let bY = 150;

// Controls
document.addEventListener("keydown", moveUp);
function moveUp() {
    bY -= 35;
}

// Pipe coordinates
let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0
};

// Draw game elements
function draw() {
    ctx.drawImage(bg, 0, 0);

    // Draw pipes
    for (let i = 0; i < pipes.length; i++) {
        let constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);

        // Move pipes
        pipes[i].x--;

        // Add new pipe
        if (pipes[i] == 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detect collision
        if (bX + birdImg.width >= pipes[i].x && bX <= pipes[i].x + pipeNorth.width &&
            (bY <= pipes[i].y + pipeNorth.height || bY + birdImg.height >= pipes[i].y + constant) ||
            bY + birdImg.height >= canvas.height - fg.height) {
            location.reload(); // Restart on crash
        }

        if (pipes[i].x == 5) {
            score++;
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(birdImg, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

fg.onload = function() {
    draw();
};
