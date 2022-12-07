const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();

  for (let i = 0; i < file.length - 13; i++) {
    const letter0 = file[i + 0];
    const letter1 = file[i + 1];
    const letter2 = file[i + 2];
    const letter3 = file[i + 3];
    const letter4 = file[i + 4];
    const letter5 = file[i + 5];
    const letter6 = file[i + 6];
    const letter7 = file[i + 7];
    const letter8 = file[i + 8];
    const letter9 = file[i + 9];
    const letter10 = file[i + 10];
    const letter11 = file[i + 11];
    const letter12 = file[i + 12];
    const letter13 = file[i + 13];

    const arr = [letter0, letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter9, letter10, letter11, letter12, letter13]
    // console.log(arr)

    if (
      Array.from(new Set(arr)).length === arr.length
    ) {
      console.log("result:", i + 14);
      break;
    }
  }
})();
