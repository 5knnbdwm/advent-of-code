const { default: data }: { default: string } = require("./file_input.txt");
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const stones = data.split(" ").map(Number);

  const blinks = 25;

  for (let i = 0; i < blinks; i++) {
    for (let j = 0; j < stones.length; j++) {
      const stone = stones[j];
      if (stone === 0) {
        stones[j] = 1;
      } else if (stone.toString().length % 2 === 0) {
        const newStone1 = stone
          .toString()
          .slice(0, stone.toString().length / 2);
        const newStone2 = stone.toString().slice(stone.toString().length / 2);

        stones[j] = Number(newStone1);
        stones.splice(j + 1, 0, Number(newStone2));
        j++;
      } else {
        stones[j] = stone * 2024;
      }
    }
  }

  return stones.length;
}

console.log("result:", run());
