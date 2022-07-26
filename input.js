let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
  setInputDirection(e.key);
});

let touchStartX, touchStartY, touchMoveX, touchMoveY, touchDirection;

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
  if (abs(dx) > abs(dy) && abs(dx) > 100) {
    if (dx < 0) {
      touchDirection = "ArrowRight";
    } else {
      touchDirection = "ArrowLeft";
    }
  } else if (abs(dy) > abs(dx) && abs(dy) > 100) {
    if (dy < 0) {
      touchDirection = "ArrowDown";
    } else {
      touchDirection = "ArrowUp";
    }
  }
  setInputDirection(touchDirection);
});

function setInputDirection(direction) {
  switch (direction) {
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
}

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
