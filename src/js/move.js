const pacman = document.querySelector(".pacman");
const board = document.querySelector(".board");

function noWallClose(x, y) {
  const indexes = Array.from(Array(pacman.clientWidth), (n, idx) => idx);
  const match = indexes.find(idx => {
    const closest = document.elementFromPoint(x + idx, y);
    return closest?.classList.contains("wall");
  });
  return Boolean(match == null);
}

function moveUp(currMove) {
  let inProgress = true;
  const { x: pacX, y: pacY } = pacman.getBoundingClientRect();
  // const closest = document.elementFromPoint(pacX + 20, pacY - 15);
  if (pacman.offsetTop > 26 && noWallClose(pacX, pacY - 15)) {
    pacman.style.top = +pacman.style.top.replace(/\D/g, "") - 10 + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveDown(currMove) {
  let inProgress = true;
  const { x: pacX, y: pacY } = pacman.getBoundingClientRect();
  const bottomEdge = board.clientHeight - 60 - 6;
  if (pacman.offsetTop < bottomEdge) {
    pacman.style.top = +pacman.style.top.replace(/\D/g, "") + 10 + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveLeft(currMove) {
  let inProgress = true;
  const leftEdge = board.offsetLeft + 18;
  const { x: pacX, y: pacY } = pacman.getBoundingClientRect();
  const closest = document.elementFromPoint(pacX - 16, pacY + 30);
  if (pacX > leftEdge && !closest?.classList.contains("wall")) {
    pacman.style.left = +pacman.style.left.replace(/\D/g, "") - 10 + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveRight(currMove) {
  let inProgress = true;
  const rightEdge = board.clientWidth + board.offsetLeft - 70;
  const { x: pacX, y: pacY } = pacman.getBoundingClientRect();
  const pacXEdge = pacX + 59;
  const pacYEdge = pacY + 30;
  const closest = document.elementFromPoint(pacXEdge + 10, pacYEdge);
  if (pacX < rightEdge && !closest?.classList.contains("wall")) {
    pacman.style.left = +pacman.style.left.replace(/\D/g, "") + 10 + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

export { moveUp, moveDown, moveLeft, moveRight };
