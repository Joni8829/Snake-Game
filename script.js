window.onload = function() {


// Declares variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [{x : 200, y : 200}];
let direction = "RIGHT";
let food = {x: 100, y: 100};
let score = 0; // Sets high score to 0 at the beginning of the game
let highScore = localStorage.getItem("highScore") || 0; // Get high score from local storage or set to 0 if not available
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
highScoreText.innerHTML = "High Score: " + highScore;
const box = 20;
let gameStarted = false; // Game is not started from beginning
let snakeSpeed = 200; // Initial speed of the snake (in milliseconds);

// Make a press enter waiting screen
function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);
}

drawStartScreen();

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !gameStarted) {
        gameStarted = true;
        setInterval(draw, snakeSpeed);
        return;
    }
    if (!gameStarted) return; // Ignore other keys until game starts

    const key = event.key.toLowerCase();
    
    // Prevent arrows from scrolling the page
    if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(event.key.toLowerCase())) {
        event.preventDefault();
    }
    if ((key === "w" || key === "arrowup") && direction !== "DOWN") {
        direction = "UP";
    } else if ((key === "s" || key === "arrowdown") && direction !== "UP") {
        direction = "DOWN";
    } else if ((key === "a" || key === "arrowleft") && direction !== "RIGHT") {
        direction = "LEFT";
    } else if ((key === "d" || key === "arrowright") && direction !== "LEFT") {
        direction = "RIGHT";
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    moveSnake();
}

function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    if (direction === "RIGHT") head.x += box;
    else if (direction === "LEFT") head.x -= box;
    else if (direction === "UP") head.y -= box;
    else if (direction === "DOWN") head.y += box;

    // Collision check
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        collision(head, snake)
    ) {
        alert("Game Over! Your score: " + score);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreText.innerHTML = "High Score: " + highScore;
            
        }
        document.location.reload();
        return;
    }

    snake.unshift(head);

    // Eat food
    if(head.x === food.x && head.y == food.y) {
        score ++;
        scoreText.innerHTML = "Score: " + score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    }
    else {
        snake.pop();
    }
}

function collision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }
    return false;
}
};
