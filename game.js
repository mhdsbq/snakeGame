import {
  SNAKE_SPEED,
  draw as drawSnake,
  update as updateSnake,
  getSnakeHead,
  snakeIntersection,
  getSnakeLength,
} from "./snake.js";

import { draw as drawFood, update as updateFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");

let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm(`Game over, score:${getScore()} press ok to restart`)) {
      window.location = "/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkForDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkForDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function getScore() {
  return getSnakeLength() - 1;
}
