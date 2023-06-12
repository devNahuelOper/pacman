const pacman = document.querySelector(".pacman");
const board = document.querySelector(".board");

function moveUp(currMove) {
  let inProgress = true;
  if (pacman.offsetTop > 26) {
    pacman.style.top = +pacman.style.top.replace(/\D/g, "") - 10 + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

function moveDown(currMove) {
  let inProgress = true;
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
  if (pacman.offsetLeft > leftEdge) {
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
  if (pacman.offsetLeft < rightEdge) {
    pacman.style.left = +pacman.style.left.replace(/\D/g, "") + 10 + "px";
  } else {
    cancelAnimationFrame(currMove);
    inProgress = false;
  }
  return inProgress;
}

export { moveUp, moveDown, moveLeft, moveRight };
