const pacman = getElementById("pacman");
const board = document.getElementById("board");

let wallCoords = [...document.getElementsByClassName("wall")].map((wall) => {
  const { left, right, top, bottom } = wall.getBoundingClientRect();
  return { id: wall.id, coords: { left, right, top, bottom } };
});

const tableCoords = [...document.querySelectorAll(".table.upright")].map(
  (table) => {
    const { left, top, bottom, width } = table.getBoundingClientRect();
    const altLeft = left + width / 2 - 24;
    const altRight = altLeft + 48;
    return {
      id: `${table.id}::after`,
      coords: { left: altLeft, right: altRight, top, bottom },
    };
  }
);

wallCoords = [
  ...wallCoords.slice(0, 16),
  ...tableCoords,
  ...wallCoords.slice(16),
];

function getClosestLeft() {
  const {
    left: pacLeft,
    top: pacTop,
    bottom: pacBottom,
  } = pacman.getBoundingClientRect();
  const inRange = wallCoords.filter(
    ({ coords: { right, top, bottom } }) =>
      right < pacLeft && top < pacBottom && bottom > pacTop
  );
  if (!inRange?.length) {
    const {
      left: boardLeft,
      right,
      top,
      bottom,
    } = board.getBoundingClientRect();
    const distance = pacLeft - (boardLeft + 30);
    const coords = { left: boardLeft, right, top, bottom };
    return { id: "boardLeft", coords, distance };
  }
  const [closest] = inRange.sort(
    (a, b) =>
      Math.abs(a.coords.right - pacLeft) - Math.abs(b.coords.right - pacLeft)
  );
  return { ...closest, distance: pacLeft - closest.coords.right };
}

function getClosestRight() {
  const {
    right: pacRight,
    top: pacTop,
    bottom: pacBottom,
  } = pacman.getBoundingClientRect();
  const inRange = wallCoords.filter(
    ({ coords: { left, top, bottom } }) =>
      left > pacRight && top < pacBottom && bottom > pacTop
  );
  if (!inRange?.length) {
    const {
      left,
      right: boardRight,
      top,
      bottom,
    } = board.getBoundingClientRect();
    const distance = boardRight - 30 - pacRight;
    const coords = { left, right: boardRight, top, bottom };
    return { id: "boardRight", coords, distance };
  }
  const [closest] = inRange.sort(
    (a, b) =>
      Math.abs(a.coords.left - pacRight) - Math.abs(b.coords.left - pacRight)
  );
  return { ...closest, distance: closest.coords.left - pacRight };
}
