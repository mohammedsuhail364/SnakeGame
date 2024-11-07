const gameboard = document.getElementById('gameboard');
const context = gameboard.getContext('2d');
const width = gameboard.width;
const height = gameboard.height;
const unit = 25;
let foodx;
let foody;
let xvel = unit;
let yvel = 0;
let score = 0;
let speed = 300; // Initial speed in milliseconds
let snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
];
let active = true;
let started = false;
const scoretext = document.getElementById('scoreval');
const restartButton = document.getElementById('restartButton');
window.addEventListener('keydown', keypress);
startgame();

function startgame() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    createfood();
    displayfood();
    drawsnake();
}

function createfood() {
    foodx = Math.floor(Math.random() * (width / unit)) * unit;
    foody = Math.floor(Math.random() * (height / unit)) * unit;
}

function displayfood() {
    context.fillStyle = 'red';
    context.fillRect(foodx, foody, unit, unit);
}

function drawsnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = 'black';
    snake.forEach(snakepart => {
        context.fillRect(snakepart.x, snakepart.y, unit, unit);
        context.strokeRect(snakepart.x, snakepart.y, unit, unit);
    });
}

function movesnake() {
    const head = { x: snake[0].x + xvel, y: snake[0].y + yvel };
    snake.unshift(head);

    // Check if snake eats food
    if (snake[0].x === foodx && snake[0].y === foody) {
        score += 1;
        scoretext.textContent = score;
        createfood();

        // Increase speed by decreasing the delay
        speed = Math.max(50, speed - 10); // Decrease speed by 10ms, minimum of 50ms
        
        
    } else {
        snake.pop();
    }
}

function clearboard() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
}

function nexttick() {
    if (active) {
        setTimeout(() => {
            clearboard();
            displayfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick(); // Continue the game loop with the updated speed
        }, speed);
    } else {
        clearboard();
        context.font = 'bold 50px serif';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText("Game Over!!", width / 2, height / 2);
        restartButton.style.display = "block"; // Show restart button
    }
}

function keypress(event) {
    if (!started) {
        started = true;
        nexttick();
    }
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    switch (true) {
        case (event.keyCode === left && xvel !== unit):
            xvel = -unit;
            yvel = 0;
            break;
        case (event.keyCode === right && xvel !== -unit):
            xvel = unit;
            yvel = 0;
            break;
        case (event.keyCode === up && yvel !== unit):
            xvel = 0;
            yvel = -unit;
            break;
        case (event.keyCode === down && yvel !== -unit):
            xvel = 0;
            yvel = unit;
            break;
    }
}

function checkgameover() {
    // Check wall collision
    if (snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
        active = false;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[0].y === snake[i].y) {
            active = false;
            break;
        }
    }
}

// Restart function
function restartGame() {
    window.location.reload();
}
