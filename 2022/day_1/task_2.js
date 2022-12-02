const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  let file = await data();

  const values = file.split("\n\n").map((item) => {
    if (item.includes("\n"))
      return item.split("\n").map((item) => Number(item));
    else return [Number(item)];
  });

  let list = [];

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const sum = row.reduce((partial_sum, a) => partial_sum + a, 0);
    list.unshift(sum);
  }

  list = list.sort((a, b) => a - b).reverse();
  console.log("result:", list[0] + list[1] + list[2]);
})();
