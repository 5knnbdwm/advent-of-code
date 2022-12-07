const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();

  for (let i = 0; i < file.length - 3; i++) {
    const letter0 = file[i];
    const letter1 = file[i + 1];
    const letter2 = file[i + 2];
    const letter3 = file[i + 3];

    if (
      Array.from(new Set([letter0, letter1, letter2, letter3])).length === 4
    ) {
      console.log("result:", i + 4);
      break;
    }
  }
})();
