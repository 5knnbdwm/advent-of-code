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
    // console.log('number number')
    // console.log(left, right)

    return left - right;
  } else {
    // console.log('object object')
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

  packets.push([[[2]], [[6]]])

  let sortedPackets = packets.flat().sort((a, b) => compare(a, b)).map((item) => item.toString())

  console.log(
    "result:",
    (sortedPackets.indexOf('2') + 1) * (sortedPackets.indexOf('6') + 1)
  );
})();
