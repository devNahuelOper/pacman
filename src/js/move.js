const pacman = document.querySelector(".pacman");
const board = document.querySelector(".board");

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
  let xBounds = (x >= 276 && x <= 556) || (x >= 1316 && x <= 1596);
  const yBounds = y >= 448 && y <= 468;
  return xBounds && yBounds;
}
window.isAtSide = isAtSide;

function moveUp(currMove) {
  let inProgress = true;
  const { x: pacX, y: pacY } = pacman.getBoundingClientRect();
  // const closest = document.elementFromPoint(pacX + 20, pacY - 15);
  // const keepMoving = !closest.classList.contains("wall");
  const keepMoving = noWallClose(pacX, pacY - 15);
  if (pacman.offsetTop > 16 && keepMoving) {
    pacman.style.top = +pacman.style.top.replace("px", "") - 10 + "px";
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
  const keepMoving = noWallClose(pacX, pacY + 15);
  if (pacman.offsetTop < bottomEdge && keepMoving) {
    pacman.style.top = +pacman.style.top.replace("px", "") + 10 + "px";
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
  // const closest = document.elementFromPoint(pacX - 28, pacY - 2);
  // const keepMoving = !closest.classList.contains("wall");
  const keepMoving =
    noWallClose(pacX - 28, pacY - 2) &&
    noWallClose(pacX - 28, pacBottom + 2) &&
    noWallClose(pacX - 28, pacY + pacman.clientHeight / 2);
  if ((pacX > leftEdge && keepMoving) || isAtSide(pacX - 10, pacY)) {
    pacman.style.left = +pacman.style.left.replace("px", "") - 10 + "px";
    if (pacX - 10 <= 276) {
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
  if ((pacRight < rightEdge && keepMoving) || isAtSide(pacX + 10, pacY)) {
    pacman.style.left = +pacman.style.left.replace("px", "") + 10 + "px";
    if (pacX + 10 >= 1596) {
      pacman.style.left = "-90px";
    }
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

export { moveUp, moveDown, moveLeft, moveRight };
