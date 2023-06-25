const pacman = document.querySelector(".pacman");
const board = document.querySelector(".board");
const [side1, side2, side3] = document.getElementsByClassName("side");
const step = 10;

function noWallClose(x, y, type = "vertical") {
  const indexes = Array.from(
    Array(Math.round(pacman.clientWidth * 0.5)),
    (n, idx) => idx
  );
  const match = indexes.find((idx) => {
    const args = type === "vertical" ? [x + idx, y] : [x, y + idx];
    const closest = document.elementFromPoint(...args);
    return closest?.classList.contains("wall");
  });
  return Boolean(match == null);
}
window.noWallClose = noWallClose;

function isAtSide(x, y) {
  const {
    bottom: side1Bottom,
    right: side1Right,
    left: side1Left,
  } = side1.getBoundingClientRect();
  const { top: side2Top } = side2.getBoundingClientRect();
  const { left: side3Left, right: side3Right } = side3.getBoundingClientRect();
  // const xBounds = (x >= 276 && x <= 556) || (x >= 1316 && x <= 1596);
  const xBounds = (x >= side1Left - 60 && x <= side1Right + 1) || (x >= side3Left - 40 && x <= side3Right + 40);
  // const yBounds = y >= 448 && y <= 468;
  const yBounds = y >= side1Bottom && y + 40 <= side2Top;
  return xBounds && yBounds;
}
window.isAtSide = isAtSide;

function moveUp(currMove) {
  let inProgress = true;
  const { x: pacX, y: pacY } = pacman.getBoundingClientRect();
  // const closest = document.elementFromPoint(pacX + 20, pacY - 15);
  // const keepMoving = !closest.classList.contains("wall");
  const keepMoving = noWallClose(pacX, pacY - 15) && !isAtSide(pacX + 1, pacY);
  if (pacman.offsetTop > 16 && keepMoving) {
    pacman.style.top = +pacman.style.top.replace("px", "") - step + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveDown(currMove) {
  let inProgress = true;
  const { x: pacX, bottom: pacY } = pacman.getBoundingClientRect();
  const bottomEdge = board.clientHeight - pacman.clientHeight - 6;
  // const closest = document.elementFromPoint(pacX, pacY + 15);
  // const keepMoving = !closest.classList.contains("wall");
  const keepMoving = noWallClose(pacX, pacY + 10);
  if (pacman.offsetTop < bottomEdge && keepMoving) {
    pacman.style.top = +pacman.style.top.replace("px", "") + step + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveLeft(currMove) {
  let inProgress = true;
  const leftEdge = board.offsetLeft + 24;
  const {
    x: pacX,
    y: pacY,
    bottom: pacBottom,
  } = pacman.getBoundingClientRect();
  const { left: side1Left } = side1.getBoundingClientRect();
  // const closest = document.elementFromPoint(pacX - 28, pacY - 2);
  // const keepMoving = !closest.classList.contains("wall");
  const keepMoving =
    noWallClose(pacX - 18, pacY - 2) &&
    noWallClose(pacX - 18, pacBottom - 4) &&
    noWallClose(pacX - 18, pacY + pacman.clientHeight / 2);
  if ((pacX > leftEdge && keepMoving) || isAtSide(pacX - step, pacY)) {
    pacman.style.left = +pacman.style.left.replace("px", "") - step + "px";
    if (pacX - step <= side1Left - 40) {
      // console.log(pacX - 10, side1Left - 50);
      pacman.style.left = "1230px";
    }
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveRight(currMove) {
  let inProgress = true;
  const rightEdge =
    board.clientWidth + board.offsetLeft;
  const {
    x: pacX,
    y: pacY,
    right: pacRight,
    bottom: pacBottom,
  } = pacman.getBoundingClientRect();
  // const closest = document.elementFromPoint(pacRight + 28, pacY - 2);
  // const keepMoving = !closest.classList.contains("wall");
  const keepMoving =
    noWallClose(pacRight, pacY - 2) &&
    noWallClose(pacRight, pacBottom - 4) &&
    noWallClose(pacRight, pacY + pacman.clientHeight / 2);
  if ((pacRight < rightEdge && keepMoving) || isAtSide(pacX + step, pacY)) {
    pacman.style.left = +pacman.style.left.replace("px", "") + step + "px";
    if (pacX + step >= 1586) {
      pacman.style.left = "-90px";
    }
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

export { moveUp, moveDown, moveLeft, moveRight };
