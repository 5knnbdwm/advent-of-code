const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();
  const lines = file
    .split("\n")
    .map((item) => item.split(/,|-/).map((item) => Number(item)));

  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];

    if (row[0] <= row[2] && row[1] >= row[3]) sum += 1;
    else if (row[2] <= row[0] && row[3] >= row[1]) sum += 1;
    else if (row[0] < row[2] && row[2] <= row[1] && row[1] < row[3]) sum += 1;
    else if (row[2] < row[0] && row[0] <= row[3] && row[3] < row[1]) sum += 1;
  }

  console.log("result:", sum);
})();
