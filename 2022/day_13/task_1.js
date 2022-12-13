const { readFile } = require("fs/promises");
const { type } = require("os");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

const compare = (left, right) => {
  if (typeof left === "number" && typeof right === "number") {
    // console.log(left, right)

    return left - right;
  } else {
    // console.log(left, right)

    if (typeof left === "number") left = [left];
    if (typeof right === "number") right = [right];

    // if (left.length === right.length)
    for (var i = 0; i < Math.min(left.length, right.length); i++) {
      if ((res = compare(left[i], right[i])) != 0) return res
    }
    return left.length - right.length
  }
};

(async () => {
  const file = await data();

  const packets = file
    .split("\n\n")
    .map((item) => item.split("\n").map((item2) => JSON.parse(item2)));

  let orderIdx = [];

  for (let i = 0; i < packets.length; i++) {
    let left = packets[i][0];
    let right = packets[i][1];

    orderIdx.push(compare(left, right) > 0 ? 0 : (i + 1))
  }
  console.log(
    "result:",
    orderIdx.reduce((acc, curr) => acc + curr)
  );
})();
