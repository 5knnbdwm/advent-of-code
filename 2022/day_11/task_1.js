const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

(async () => {
  const file = await data();

  const monkeyRaw = file.split("\n\n").map((item) => item.split("\n"));

  const monkeys = [];
  for (let i = 0; i < monkeyRaw.length; i++) {
    const monkeyLines = monkeyRaw[i];

    let monkey = {
      idx: i,
      n: 0,
      items: monkeyLines[1]
        .slice(18)
        .split(", ")
        .map((item) => Number(item)),
      operation: monkeyLines[2].slice(19).split(' '),
      test: {
        div: Number(monkeyLines[3].slice(21)),
        case: [
          Number(monkeyLines[5].slice(30)),
          Number(monkeyLines[4].slice(29)),
        ],
      },
    };
    monkeys.push(monkey);
  }
  console.time()

  let m = 0;
  while (m !== 20) {
    m += 1;

    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      monkey.n += monkey.items.length;

      while (monkey.items.length) {
        let worry = monkey.items.shift();

        if (monkey.operation[1] === '*') {
          if (monkey.operation[2] === 'old') {
            worry = worry * worry
          } else {
            worry = worry * Number(monkey.operation[2])
          }
        } else {
          if (monkey.operation[2] === 'old') {
            worry = worry + worry
          } else {
            worry = worry + Number(monkey.operation[2])
          }
        }

        worry = Math.floor(worry / 3);
        // console.log(worry)
        monkeys[
          monkey.test.case[Number(!(worry % monkey.test.div))]
        ].items.push(worry);
      }
    }
  }

  const [first, second] = monkeys.sort((a, b) => a.n - b.n).reverse();
  console.timeEnd()
  console.log('result:', first.n * second.n);
})();
