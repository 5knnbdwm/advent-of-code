const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

const countVisibleTrees = (trees, height) => {
  let count = 0;

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    count += 1;
    if (tree >= height) break;
  }

  return count;
};

(async () => {
  const file = await data();

  const forest = file
    .split("\n")
    .map((item) => item.split("").map((item) => Number(item)));

  let maxScore = 0;

  for (let i = 1; i < forest.length - 1; i++) {
    const row = forest[i];

    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j];
      const col = forest.map((item) => item[j]);

      const score =
        countVisibleTrees(col.slice(0, i).reverse(), tree) *
        countVisibleTrees(col.slice(i + 1), tree) *
        countVisibleTrees(row.slice(0, j).reverse(), tree) *
        countVisibleTrees(row.slice(j + 1), tree);

      if (score > maxScore) maxScore = score;
    }
  }

  console.log("result:", maxScore);
})();
