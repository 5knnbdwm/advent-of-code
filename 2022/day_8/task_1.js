const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();

  const forest = file
    .split("\n")
    .map((item) => item.split("").map((item) => Number(item)));

  let visibleTrees = forest.length * 2 + (forest[0].length - 2) * 2;

  for (let i = 1; i < forest.length - 1; i++) {
    const row = forest[i];

    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j];
      const col = forest.map((item) => item[j]);

      // console.log(col.slice(0, i), tree, col.slice(i + 1), '\t', Math.max(...col.slice(0, i)) < tree, tree, Math.max(...col.slice(i + 1)) < tree)
      // console.log(row.slice(0, j), tree, row.slice(j + 1), '\t', Math.max(...row.slice(0, j)) < tree, tree, Math.max(...row.slice(j + 1)) < tree)

      if (
        Math.max(...col.slice(0, i)) < tree ||
        Math.max(...col.slice(i + 1)) < tree ||
        Math.max(...row.slice(0, j)) < tree ||
        Math.max(...row.slice(j + 1)) < tree
      )
        visibleTrees += 1;
    }
  }

  console.log('result:', visibleTrees);
})();
