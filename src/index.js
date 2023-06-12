document.addEventListener("DOMContentLoaded", ready);

function ready() {
  const pacman = document.querySelector(".pacman");
  const board = document.querySelector(".board");

  let currMove, currDir;

  function move(dir) {
    if (dir === "up") {
      if (pacman.offsetTop > 26) {
        pacman.style.top = +pacman.style.top.replace(/\D/g, "") - 10 + "px";
      } else {
        cancelAnimationFrame(currMove);
        return;
      }
    } else if (dir === "down") {
      const bottomEdge = board.clientHeight - 60 - 6;
      if (pacman.offsetTop < bottomEdge) {
        pacman.style.top = +pacman.style.top.replace(/\D/g, "") + 10 + "px";
      } else {
        cancelAnimationFrame(currMove);
        return;
      }
    } else if (dir === "left") {
      const leftEdge = board.offsetLeft + 18;
      if (pacman.offsetLeft > leftEdge) {
        pacman.style.left = +pacman.style.left.replace(/\D/g, "") - 10 + "px";
      } else {
        cancelAnimationFrame(currMove);
        return;
      }
    } else if (dir === "right") {
      const rightEdge = board.clientWidth + board.offsetLeft - 70;
      if (pacman.offsetLeft < rightEdge) {
        pacman.style.left = +pacman.style.left.replace(/\D/g, "") + 10 + "px";
      } else {
        cancelAnimationFrame(currMove);
        return;
      }
    }
    if (currDir && currDir === dir) {
      currMove = requestAnimationFrame(() => move(dir));
    }
  }

  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key.includes("Arrow")) {
      const direction = e.key.replace("Arrow", "").toLowerCase();
      currMove = requestAnimationFrame(() => move(direction));
      currDir = direction;
      if (!pacman.classList.contains(direction)) {
        const currDir = pacman.classList.item(1);
        pacman.classList.replace(currDir, direction);
      }
    }
  });
}
