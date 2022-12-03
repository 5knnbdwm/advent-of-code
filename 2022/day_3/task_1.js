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

  const backpack = file.split("\n").map((item) => {
    return [item.slice(0, item.length / 2), item.slice(item.length / 2)];
  });

  let sum = 0;
  for (let i = 0; i < backpack.length; i++) {
    const compartmentBase = backpack[i][0];
    const compartmentCompare = backpack[i][1];

    for (let j = 0; j < compartmentCompare.length; j++) {
      const letter = compartmentCompare[j];
      if (compartmentBase.includes(letter)) {
        sum += getLetterPriority(letter);
        break;
      }
    }
  }
  console.log("result: ", sum);
})();
