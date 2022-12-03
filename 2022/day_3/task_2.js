const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

const getLetterPriority = (letter) => {
  let score = letter.charCodeAt(0) - 96;
  if (letter.toUpperCase() === letter) score += 58;

  return score;
};

(async () => {
  const file = await data();

  const backpacks = file.split("\n").map((item) => item.split(""));

  let sum = 0;

  for (let i = 0; i < backpacks.length; i += 3) {
    const backpack1 = backpacks[i];
    const backpack2 = backpacks[i + 1];
    const backpack3 = backpacks[i + 2];

    for (let i = 0; i < backpack1.length; i++) {
      const letter = backpack1[i];
      if (backpack2.includes(letter) && backpack3.includes(letter)) {
        sum += getLetterPriority(letter);
        break;
      }
    }
  }

  console.log("result: ", sum);
})();
