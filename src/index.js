import { moveUp, moveDown, moveLeft, moveRight } from "./js/move.js";
import { shuffle } from "./js/util";

document.addEventListener("DOMContentLoaded", ready);
window.point = (x, y) => document.elementFromPoint(x, y);

let currMove, currDir;

function ready() {
  const pacman = document.querySelector(".pacman");
  const board = document.querySelector(".board");

  addEventListener("click", (e) =>
    console.log(
      e.clientX,
      e.clientY,
      document.elementFromPoint(e.clientX, e.clientY)
    )
  );

  document.addEventListener("keydown", (e) => {
    if (e.key.includes("Arrow")) {
      e.preventDefault();
      const direction = e.key.replace("Arrow", "").toLowerCase();
      currMove = requestAnimationFrame(() => move(direction));
      currDir = direction;
      if (!pacman.classList.contains(direction)) {
        const currDir = pacman.classList.item(1);
        pacman.classList.replace(currDir, direction);
      }
    }
  });

  setTimeout(ghostLooking, 1000);
}

function ghostLooking() {
  const dirs = ["left", "right", "up", "down"];
  const ghosts = document.getElementsByClassName("ghost-eyes");
  [...ghosts].forEach((ghost, idx) => {
    ghost.classList.add(`look-${dirs[idx]}`);
  });
  setInterval(() => {
    const shuffled = shuffle(dirs);
    [...ghosts].forEach((ghost, idx) => {
      const current = ghost.classList.item(1);
      ghost.classList.replace(current, `look-${shuffled[idx]}`);
    });
  }, 5000);
}

function move(dir) {
  if (dir === "up") {
    const step = moveUp(currMove);
    if (!step) return;
  } else if (dir === "down") {
    const step = moveDown(currMove);
    if (!step) return;
  } else if (dir === "left") {
    const step = moveLeft(currMove);
    if (!step) return;
  } else if (dir === "right") {
    const step = moveRight(currMove);
    if (!step) return;
  }
  if (currDir && currDir === dir) {
    currMove = requestAnimationFrame(() => move(dir));
  }
}
