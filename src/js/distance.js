const pacman = getElementById("pacman");

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
  const [closest] = inRange.sort(
    (a, b) =>
      Math.abs(a.coords.left - pacRight) - Math.abs(b.coords.left - pacRight)
  );
  return { ...closest, distance: closest.coords.left - pacRight };
}
