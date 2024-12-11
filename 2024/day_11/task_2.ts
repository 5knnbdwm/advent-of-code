const { default: data }: { default: string } = require("./file_input.txt");
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const stones = data.split(" ").map(Number);

  const blinks = 75;

  let stoneMap = {} as { [key: number]: number };

  for (let i = 0; i < stones.length; i++) {
    if (stoneMap[stones[i]] === undefined) {
      stoneMap[stones[i]] = 1;
    } else {
      stoneMap[stones[i]] += 1;
    }
  }

  for (let i = 0; i < blinks; i++) {
    const newStoneMap = {} as { [key: number]: number };

    for (const stone in stoneMap) {
      if (Number(stone) === 0) {
        newStoneMap[1] = stoneMap[stone];
      } else if (stone.length % 2 === 0) {
        const newStone1 = Number(stone.slice(0, stone.length / 2));
        const newStone2 = Number(stone.slice(stone.length / 2));

        if (newStone1 in newStoneMap) newStoneMap[newStone1] += stoneMap[stone];
        else newStoneMap[newStone1] = stoneMap[stone];

        if (newStone2 in newStoneMap) newStoneMap[newStone2] += stoneMap[stone];
        else newStoneMap[newStone2] = stoneMap[stone];
      } else {
        newStoneMap[Number(stone) * 2024] = stoneMap[stone];
      }
    }
    stoneMap = newStoneMap;
  }

  return Object.keys(stoneMap)
    .map((stone) => stoneMap[stone])
    .reduce((a, b) => a + b, 0);
}

console.log("result:", run());
