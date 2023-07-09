const pacman = document.getElementById("pacman");
const board = document.getElementById("board");

let wallCoords = [...document.getElementsByClassName("wall")].map((wall) => {
  const { left, right, top, bottom } = wall.getBoundingClientRect();
  return { id: wall.id, coords: { left, right, top, bottom } };
});

const tableCoordsUpright = [...document.getElementsByClassName("table upright")]
  .map((table) => {
    const { left, right, top, bottom, width } = table.getBoundingClientRect();
    const before = {
      id: `${table.id}::before`,
      coords: { left, right, top, bottom: top + 32 },
    };

    const altLeft = left + width / 2 - 24;
    const altRight = altLeft + 48;
    const altTop = top + 32;
    const after = {
      id: `${table.id}::after`,
      coords: { left: altLeft, right: altRight, top: altTop, bottom },
    };
    return [before, after];
  })
  .flat();

const tableCoordsOnside = [
  ...document.getElementsByClassName("table onside"),
].map((table) => {
  const { left, right, top, bottom, height } = table.getBoundingClientRect();
  const altTop = top + height / 2 - 18;
  const altBottom = altTop + 36;
  if (table.id.match(2)) {
    const altRight = left + 47;
    const before = {
      id: `${table.id}::before`,
      coords: { left, right: altRight, top, bottom },
    };
    const after = {
      id: `${table.id}::after`,
      coords: { left: altRight, right, top: altTop, bottom: altBottom },
    };
    return [before, after];
  } else {
    const altLeft = right - 47;
    const before = {
      id: `${table.id}::before`,
      coords: { left: altLeft, right, top, bottom },
    };
    const after = {
      id: `${table.id}::after`,
      coords: { left, right: altLeft, top: altTop, bottom: altBottom }
    };
    return [before, after];
  }
}).flat();

const tableCoords = [
  ...tableCoordsUpright.slice(0, 2),
  ...tableCoordsOnside,
  ...tableCoordsUpright.slice(2),
];

wallCoords = [
  ...wallCoords.slice(0, 11),
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

export { getClosestLeft, getClosestRight };
