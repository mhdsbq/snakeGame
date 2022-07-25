let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) return;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) return;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) return;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) return;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

let touchStartX, touchStartY, touchMoveX, touchMoveY;

document.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  },
  { passive: false }
);
document.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    touchMoveX = e.touches[0].clientX;
    touchMoveY = e.touches[0].clientY;
  },
  { passive: false }
);
document.addEventListener("touchend", (e) => {
  const dx = touchStartX - touchMoveX;
  const dy = touchStartY - touchMoveY;
  console.log(dx, dy);
  if (getCoefficient(dx) > getCoefficient(dy) && getCoefficient(dx) > 100) {
    if (dx < 0) {
      console.log("right");
      if (lastInputDirection.x !== 0) return;
      inputDirection = { x: 1, y: 0 };
    } else {
      console.log("left");
      if (lastInputDirection.x !== 0) return;
      inputDirection = { x: -1, y: 0 };
    }
  } else if (
    getCoefficient(dy) > getCoefficient(dx) &&
    getCoefficient(dy) > 100
  ) {
    if (dy < 0) {
      console.log("down");
      if (lastInputDirection.y !== 0) return;
      inputDirection = { x: 0, y: 1 };
    } else {
      console.log("up");
      if (lastInputDirection.y !== 0) return;
      inputDirection = { x: 0, y: -1 };
    }
  }
});

function getCoefficient(number) {
  return number < 0 ? -number : number;
}
export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
