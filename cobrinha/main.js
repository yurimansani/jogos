// Directions
const directions = {
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
  };
  
  // Constants
  const BLOCK_SIZE = 10;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 500;
  const SNAKE_COLOR = '#FF0000';
  const FOOD_COLOR = '#2d56a7';
  
  // Elements
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  
  // Variables
  let snake = [
    { x: 100, y: 250 },
    { x: 90, y: 250 },
    { x: 80, y: 250 },
  ];
  let food = generateFoodPosition();
  let direction = directions.RIGHT;
  let score = 0;
  
  // Functions
  function generateFoodPosition() {
    const x = Math.floor(Math.random() * (CANVAS_WIDTH / BLOCK_SIZE)) * BLOCK_SIZE;
    const y = Math.floor(Math.random() * (CANVAS_HEIGHT / BLOCK_SIZE)) * BLOCK_SIZE;
    return { x, y };
  }
  
  function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
  }
  
  function drawSnake() {
    snake.forEach((block) => drawBlock(block.x, block.y, SNAKE_COLOR));
  }
  
  function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case directions.UP:
        head.y -= BLOCK_SIZE;
        break;
      case directions.DOWN:
        head.y += BLOCK_SIZE;
        break;
      case directions.RIGHT:
        head.x += BLOCK_SIZE;
        break;
      case directions.LEFT:
        head.x -= BLOCK_SIZE;
        break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      food = generateFoodPosition();
      score += 1;
    } else {
      snake.pop();
    }
  }
  
  function changeDirection(newDirection) {
    if (
      (direction === directions.UP && newDirection === directions.DOWN) ||
      (direction === directions.DOWN && newDirection === directions.UP) ||
      (direction === directions.RIGHT && newDirection === directions.LEFT) ||
      (direction === directions.LEFT && newDirection === directions.RIGHT)
    ) {
      return;
    }
    direction = newDirection;
  }
  
  function detectCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= CANVAS_WIDTH ||
      head.y < 0 ||
      head.y >= CANVAS_HEIGHT ||
      snake.slice(1).some((block) => block.x === head.x && block.y === head.y)
    ) {
      return true;
    }
    return false;
  }
  
  function displayScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = `Placar: ${score}`;
  }
  
  function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawSnake();
    drawBlock(food.x, food.y, FOOD_COLOR);
    displayScore();
  }
  
  function gameLoop() {
    if (detectCollision()) {
      clearInterval(gameId);
      alert(`Perdeu playboy! seu placar: ${score}.`);
      location.reload();
      return;
    }
    moveSnake();
    render();
  }
  
  // Event listeners
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp': 
      case 'w':
        changeDirection(directions.UP);
        break;
      case 'ArrowDown':
      case 's':
        changeDirection(directions.DOWN);
        break;
      case 'ArrowRight':
      case 'd':
        changeDirection(directions.RIGHT);
        break;
      case 'ArrowLeft':
      case 'a':
        changeDirection(directions.LEFT);
        break;
    }
  });
  
  // Start the game
  const gameId = setInterval(gameLoop, 100);