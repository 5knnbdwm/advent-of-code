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

  let cycle = 0;
  let pos = [0, 1, 2];
  let print = "";

  for (let i = 0; i < instr.length; i++) {
    const [term, count] = instr[i];

    if (term === "noop") {
      print += pos.includes(cycle % 40) ? "#" : ".";
      cycle += 1;
    } else {
      print += pos.includes(cycle % 40) ? "#" : ".";
      cycle += 1;
      print += pos.includes(cycle % 40) ? "#" : ".";
      cycle += 1;

      pos = [
        pos[0] + count,
        pos[1] + count,
        pos[2] + count,
      ]
    }
  }
  console.log('result:')
  for (let n = 0; n < print.length / 40; n += 1) {
    console.log(print.slice(n * 40, n * 40 + 40));
  }
})();
