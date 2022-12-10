const { sign } = require("crypto");
const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();

  let instr = file.split("\n").map((item) => {
    const split = item.split(" ");
    return [split[0], Number(split[1])];
  });

  let signal = 1
  let list = []
  let sum = 0;

  for (let i = 0; i < instr.length; i++) {
    const [term, count] = instr[i];

    if (term === 'noop') {
      list.push(signal)
    } else {
      list.push(signal)
      list.push(signal)
      signal += count
    }
  }

  for (let i = 0; i < 6; i++) {
    const pos = (i + 1) * 40 - 20
    sum += list[pos] * pos
  }

  console.log("result:", sum);
})();
