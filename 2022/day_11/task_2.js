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
      n: 0,
      items: monkeyLines[1]
        .slice(18)
        .split(", ")
        .map((item) => Number(item)),
      operation: monkeyLines[2].slice(19).split(" "),
      div: Number(monkeyLines[3].slice(21)),
      case: [
        Number(monkeyLines[5].slice(30)),
        Number(monkeyLines[4].slice(29)),
      ],
    };
    monkeys.push(monkey);
  }

  const prod = monkeys
    .map((item) => item.div)
    .reduce((acc, current) => acc * current);

  console.time();
  let m = 0;
  while (m !== 10000) {
    m += 1;

    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      monkey.n += monkey.items.length;

      for (let i = 0; i < monkey.items.length; i++) {
        let worry = monkey.items[i];

        if (monkey.operation[1] === "*") {
          if (monkey.operation[2] === "old") {
            worry = worry * worry;
          } else {
            worry = worry * Number(monkey.operation[2]);
          }
        } else {
          if (monkey.operation[2] === "old") {
            worry = worry + worry;
          } else {
            worry = worry + Number(monkey.operation[2]);
          }
        }

        monkeys[monkey.case[worry % monkey.div === 0 ? 1 : 0]].items.push(
          worry % prod
        );
      }
      monkey.items = [];
    }
    // if (!(m % 1000)) {
    //   console.timeLog();
    //   console.log(
    //     m,
    //     monkeys.map((item) => item.n)
    //   );
    // }
  }

  console.timeEnd();
  const [first, second] = monkeys.sort((a, b) => a.n - b.n).reverse();
  console.log("result:", first.n * second.n);
})();
