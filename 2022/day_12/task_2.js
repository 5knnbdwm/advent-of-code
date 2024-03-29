const { readFile, open } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };
// const data = async () => {
//   return 'SaaabcbaaaE'
// };

const isValidMove = (currentCell, nextCell) => {
  if (currentCell === "S") currentCell = "a";
  if (currentCell === "E") currentCell = "z";
  if (nextCell === "S") nextCell = "a";
  if (nextCell === "E") nextCell = "z";

  return nextCell.charCodeAt() - currentCell.charCodeAt() > -2;
};

const isEnd = (end = { x: -1, y: -1 }, current = { x: -1, y: -1 }) => {
  if (current.x === end.x && current.y === end.y) return true;
  return false;
};

const dist = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
};

const print = (hill, openList, closedList, start, end) => {
  let chars = "";
  for (let i = 0; i < hill.length; i++) {
    let row = "";
    for (let j = 0; j < hill[i].length; j++) {
      let char = ".";
      if (i === start.x && j === start.y) char = "S";
      if (i === end.x && j === end.y) char = "E";

      if (closedList.findIndex((item) => item.x === i && item.y === j) !== -1) {
        char = closedList.find((item) => item.x === i && item.y === j).height;
      }
      if (openList.findIndex((item) => item.x === i && item.y === j) !== -1) {
        char = openList
          .find((item) => item.x === i && item.y === j)
          .height.toUpperCase();
      }

      row += char;
    }
    chars += row + "\n";
  }
  console.log(chars);
};

(async () => {
  const file = await data();
  const hillRaw = file.split("\n").map((item) => item.split(""));

  let hill = [];
  let tmpStart;
  let tmpEnd;

  for (let i = 0; i < hillRaw.length; i++) {
    let row = [];
    for (let j = 0; j < hillRaw[i].length; j++) {
      const element = hillRaw[i][j];
      let item = {
        x: i,
        y: j,
        f: 0,
        g: 0,
        h: 0,
        height: element,
      };
      if (element === "S") tmpStart = item;
      if (element === "E") {
        tmpEnd = item;
      }
      row.push(item);
    }
    hill.push(row);
  }

  let start = {
    ...tmpEnd,
  };
  let end = {
    ...tmpStart,
  };

  let openList = [hill[start.x][start.y]];
  let closedList = [];

  while (openList.length) {
    let currentIdx = 0;
    openList.forEach((item, idx) => {
      if (item.f < openList[currentIdx].f) currentIdx = idx;
    });
    const current = openList[currentIdx];

    // if (isEnd(end, current)) {
    //   result = current;

    //   break;
    // }

    closedList.push(current);
    openList = [
      ...openList.slice(0, currentIdx),
      ...openList.slice(currentIdx + 1),
    ];

    let neighbors = [];

    if (current.y !== hill[0].length - 1) {
      let tmpNeighbor = hill[current.x][current.y + 1];
      if (isValidMove(current.height, tmpNeighbor.height))
        neighbors.push(hill[current.x][current.y + 1]);
    }
    if (current.x !== hill.length - 1) {
      let tmpNeighbor = hill[current.x + 1][current.y];
      if (isValidMove(current.height, tmpNeighbor.height))
        neighbors.push(hill[current.x + 1][current.y]);
    }
    if (current.y !== 0) {
      let tmpNeighbor = hill[current.x][current.y - 1];
      if (isValidMove(current.height, tmpNeighbor.height))
        neighbors.push(hill[current.x][current.y - 1]);
    }
    if (current.x !== 0) {
      let tmpNeighbor = hill[current.x - 1][current.y];
      if (isValidMove(current.height, tmpNeighbor.height))
        neighbors.push(hill[current.x - 1][current.y]);
    }

    if (current.height === "a") neighbors = [];

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedList.includes(neighbor)) {
        let tmpG = current.g + 1;

        if (openList.includes(neighbor)) {
          if (tmpG < neighbor.g) neighbor.g = tmpG;
        } else {
          neighbor.g = tmpG;
          openList.push(neighbor);
        }

        // neighbor.h = dist(neighbor.x, neighbor.y, end.x, end.y);
        neighbor.h = 0;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }

    // print(hill, openList, closedList, start, end);
  }

  console.log(
    "result:",
    closedList
      .filter((item) => item.height === "a")
      .sort((a, b) => a.f - b.f)[0].g
  );
})();
