const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

const splitAtFourth = (input) => {
  let length = input.length;
  let arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(input.substr(0, 3));
    input = input.substr(4);
  }

  return arr;
};

(async () => {
  const file = await data();
  const [config, moves] = file.split("\n\n");

  let configLines = config.split("\n");
  let movesLines = moves.split("\n");
  let stacks = {};

  for (let i = 0; i < configLines.length - 1; i++) {
    let line = configLines[i];
    const lineParts = splitAtFourth(line);

    if (i === 0) {
      for (let j = 0; j < lineParts.length; j++) {
        stacks[j] = [];
      }
    }

    for (let j = 0; j < lineParts.length; j++) {
      const part = lineParts[j];
      if (part !== "   ") {
        stacks[j].unshift(part.slice(1, 2));
      }
    }
  }

  for (let i = 0; i < movesLines.length; i++) {
    const move = movesLines[i].split(" ");
    const count = Number(move[1]);
    const from = Number(move[3]) - 1;
    const to = Number(move[5]) - 1;

    let toMove = stacks[from].splice(
      stacks[from].length - count,
      stacks[from].length
    );

    // toMove = toMove.reverse();
    stacks[to].push(...toMove);
  }

  console.log(
    "result:",
    Object.keys(stacks)
      .map((value) => {
        return stacks[value][stacks[value].length - 1];
      })
      .join("")
  );
})();
