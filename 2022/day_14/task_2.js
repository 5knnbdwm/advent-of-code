const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();

  const jOffset = 250

  let iMin = 0;
  let iMax = 0;
  let jMin = 1000;
  let jMax = 0;

  const walls = file.split("\n").map((item) =>
    item.split(" -> ").map((item2) =>
      item2
        .split(",")
        .map((pos, idx) => {
          if (idx) {
            iMin = Math.min(iMin, pos);
            iMax = Math.max(iMax, pos);
          } else {
            jMin = Math.min(jMin, pos);
            jMax = Math.max(jMax, pos);
          }
          return pos;
        })
        .reverse()
    )
  );

  let cave = [];
  for (let i = 0; i <= iMax + 1; i++) {
    let col = [];
    for (let j = 0; j <= jOffset * 2; j++) {
      col.push(".");
    }
    cave.push(col);
  }

  for (let i = 0; i < walls.length; i++) {
    const wallRow = walls[i];
    for (let j = 0; j < wallRow.length - 1; j++) {
      let first = wallRow[j];
      let second = wallRow[j + 1];
      if (first[1] === second[1]) {
        for (
          let k = Math.min(first[0], second[0]);
          k <= Math.max(first[0], second[0]);
          k++
        ) {
          cave[k - iMin][first[1] - jMin + jOffset] = "#";
        }
      }
      if (first[0] === second[0]) {
        for (
          let k = Math.min(first[1], second[1]);
          k <= Math.max(first[1], second[1]);
          k++
        ) {
          cave[first[0] - iMin][k - jMin + jOffset] = "#";
        }
      }
    }
  }

  let sandInside = true;
  let sandGrains = 0;

  while (sandInside) {
    let settled = false;
    let pos = [0 - iMin, 500 - jMin + jOffset];

    if (cave[pos[0]][pos[1]] === 'O') {
      settled = true
      sandInside = false
    }
    while (!settled) {
      let newPos = [...pos];

      if (pos[0] === iMax + 1) {
        settled = true
      }
      else if (
        cave[pos[0] + 1] === undefined ||
        cave[pos[0] + 1][pos[1]] === "."
      ) {
        if (cave[pos[0] + 1] === undefined) {
          settled = true;
          sandInside = false;
        } else newPos = [newPos[0] + 1, newPos[1]];
      } else if (
        cave[pos[0] + 1][pos[1] - 1] === undefined ||
        cave[pos[0] + 1][pos[1] - 1] === "."
      ) {
        if (cave[pos[0] + 1][pos[1] - 1] === undefined) {
          console.log(undefined, pos)
          settled = true;
          sandInside = false;
        } else newPos = [newPos[0] + 1, newPos[1] - 1];
      } else if (
        cave[pos[0] + 1][pos[1] + 1] === undefined ||
        cave[pos[0] + 1][pos[1] + 1] === "."
      ) {
        if (cave[pos[0] + 1][pos[1] + 1] === undefined) {
          console.log(undefined, pos)
          settled = true;
          sandInside = false;
        } else newPos = [newPos[0] + 1, newPos[1] + 1];
      }

      if (newPos[0] === pos[0] && newPos[1] === pos[1]) settled = true;
      else pos = newPos;
    }
    if (sandInside) {
      sandGrains += 1;
      cave[pos[0]][pos[1]] = "O";
    }
    // console.log();
    // console.log(cave.map((item) => item.join(" ")).join("\n"));
    // break
  }
  console.log("--------------------------------------------------");
  console.log(cave.map((item) => item.join(" ")).join("\n"));
  // console.log(cave.map((item) => item.join(" ")));

  console.log("results:", sandGrains);
})();

// i |
// j -
