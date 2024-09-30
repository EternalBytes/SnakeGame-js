const points = document.getElementById("pointsCont");
const snakeCanvas = document.getElementById("snakeGame");
const ctx = snakeCanvas.getContext("2d");

const box = 10; // Size of one box (snake/food)
const rows = snakeCanvas.height / box;
const cols = snakeCanvas.width / box;

const snake = [{ x: 9 * box, y: 10 * box }];
let direction = "";
let food = { x: Math.floor(Math.random() * cols) * box, y: Math.floor(Math.random() * rows) * box };
const imageFood = new Image();
imageFood.src = "apple.png";
let score = 0;

// Controlers
document.onkeydown = event => {
    event.key === "ArrowUp" && direction !== "DOWN" ? direction = "UP" :
    event.key === "ArrowDown" && direction !== "UP" ? direction = "DOWN" :
    event.key === "ArrowLeft" && direction !== "RIGHT" ? direction = "LEFT" :
    event.key === "ArrowRight" && direction !== "LEFT" ? direction = "RIGHT" : null;
}

function update() {
    // Get head position
    let headX = snake[0].x, headY = snake[0].y;

    // Move snake
    direction === "UP" ? headY -= box :
    direction === "DOWN" ? headY += box :
    direction === "LEFT" ? headX -= box :
    direction === "RIGHT" ? headX += box : null;

    // Add new head to snake
    const newHead = { x: headX, y: headY };
    snake.unshift(newHead);

    // Snake eats food
    if (headX === food.x && headY === food.y) {
        score++;
        points.children[1].textContent = score;
        food = { x: Math.floor(Math.random() * cols) * box, y: Math.floor(Math.random() * rows) * box };
    } else {
        snake.pop(); // Remove tail if no food eaten
    }

    // Check for collision with walls or itself
    if (headY <= 0) {
        headY = snakeCanvas.height;
        snake[0].y = headY;
    } else if(headY >= snakeCanvas.height){
        headY = 0;
        snake[0].y = headY;
    }

    if(headX <= 0){
        headX = snakeCanvas.width;
        snake[0].x = headX;
    } else if(headX >= snakeCanvas.width){
        headX = 0;
        snake[0].x = headX;
    }

    if(collision(newHead)){
        clearInterval(gameInterval);
        alert(`Game Over! Your score: ${score}`);
        location.reload();
    }
}
function collision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function render() {
    // Clear canvas
    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(imageFood, food.x, food.y, box, box+2);

    // Draw score
    //ctx.fillStyle = "white";
    //ctx.font = "20px Arial";
    //ctx.fillText("Score: " + score, 10, 20);
}

function play(){
    update();
    render();
}
// Start the game loop
const gameInterval = setInterval(play, 100);