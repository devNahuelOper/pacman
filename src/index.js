import { moveUp, moveDown, moveLeft, moveRight } from "./js/move.js";
import { shuffle } from "./js/util";
import addPills from "./js/pill.js";

document.addEventListener("DOMContentLoaded", ready);
window.point = (x, y) => document.elementFromPoint(x, y);

let currMove, currDir;

function ready() {
  const pacman = document.querySelector(".pacman");
  const board = document.querySelector(".board");
  const ruler = document.getElementById("ruler");
  addPills();
  
  if (ruler) {
    ruler.onpointerdown = (e) => {
      if (e.button) {
        return;
      }
      const { clientX, clientY, pageX, pageY } = e;
      const { left, top, right, bottom } = ruler.getBoundingClientRect();
      const isResize = clientX >= right - 16 && clientY >= bottom - 16;
      const shiftX = clientX - left;
      const shiftY = clientY - top;

      // document.body.append(ruler);

      if (!isResize) moveAt(pageX, pageY);

      function moveAt(x, y) {
        ruler.style.left = `${x - shiftX - (board.offsetLeft + 16)}px`;
        ruler.style.top = `${y - shiftY - 16}px`;
      }

      function onMove(event) {
        if (!isResize) moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("pointermove", onMove);

      ruler.onpointerup = () => {
        ruler.textContent = `${ruler.clientWidth}x${ruler.clientHeight}`;
        if (ruler.clientWidth >= 96) {
          ruler.classList.add("lg");
        } else {
          ruler.classList.remove("lg");
        }
        document.removeEventListener("pointermove", onMove);
        ruler.onpointerup = null;
      };
    };
    ruler.ondragstart = () => false;
    ruler.ondragend = () => (ruler.onpointerdown = null);
  }

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
