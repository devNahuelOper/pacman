function makePill(number) {
  const pill = document.createElement("div");
  pill.classList.add("pill", `pill${number}`);
  return pill;
}

function makePillWrap(length = 10, type = "horizontal", id = "") {
  const pillWrap = document.createElement("section");
  pillWrap.classList.add("pill-wrap", type, id.slice(0, id.search(/\d/) + 1));
  pillWrap.id = id;
  const children = Array.from(Array(length), (n, idx) => makePill(idx));
  pillWrap.append(...children);
  return pillWrap;
}

function addPills() {
  const board = document.getElementById("board");
  const row1Left = makePillWrap(10, "horizontal", "row1Left");
  const row1Right = makePillWrap(10, "horizontal", "row1Right");
  const row2 = makePillWrap(23, "horizontal", "row2");
  const row2Left = makePillWrap(10, "horizontal", "row2Left");
  const row2Right = makePillWrap(10, "horizontal", "row2Right");
  const row3Left = makePillWrap(5, "horizontal", "row3Left");
  const row3Right = makePillWrap(5, "horizontal", "row3Right");
  const column1 = makePillWrap(5, "vertical", "column1");
  const column2 = makePillWrap(13, "vertical", "column2");
  const column5 = makePillWrap(13, "vertical", "column5");
  const column6 = makePillWrap(5, "vertical", "column6");

  const row8 = makePillWrap(24, "horizontal", "row8");
  board.append(
    row1Left,
    row1Right,
    row2Left,
    row2Right,
    row3Left,
    row3Right,
    row8,
    column1,
    column2,
    column5,
    column6
  );
}

export default addPills;
