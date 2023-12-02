const { readFile } = require("fs/promises");

// const data = async () => {
//   return (await readFile("./input.txt")).toString();
// };
const data = async () => {
  return (await readFile("./test.txt")).toString();
};
// const data = async () => {
//   return "Sensor at x=8, y=7: closest beacon is at x=2, y=10\nSensor at x=0, y=11: closest beacon is at x=2, y=10\nSensor at x=2, y=0: closest beacon is at x=2, y=10";
// };

const createName = (signal, xOff = 0, yOff = 0) => {
  return signal.x + xOff + "_" + (signal.y + yOff);
};

(async () => {
  const file = await data();

  const instructions = file.split("\n").map((item) => {
    let split = item.split(/=|,\s|:/);
    return {
      s: {
        x: Number(split[1]),
        y: Number(split[3]),
      },
      b: {
        x: Number(split[5]),
        y: Number(split[7]),
      },
      d:
        Math.abs(Number(split[1]) - Number(split[5])) +
        Math.abs(Number(split[3]) - Number(split[7])),
    };
  });

  let fields = {};

  // let line = 2_000_000
  let line = 10 // test

  for (let i = 0; i < instructions.length; i++) {
    const recording = instructions[i];

    let x = recording.d;
    let y = 0;
    // if (createName(recording.s).endsWith(`_${line}`))
    fields[createName(recording.s)] = "S";
    // if (createName(recording.s).endsWith(`_${line}`))
    fields[createName(recording.b)] = "B";

    // if (recording.s.y  2000000)


    while (x >= 0) {
      for (let j = 0; j <= y; j++) {
        if (fields[createName(recording.s, -x, j)] === undefined)
          // if (createName(recording.s, -x, j).endsWith(`_${line}`))
          fields[createName(recording.s, -x, j)] = "#";
        if (fields[createName(recording.s, -x, -j)] === undefined)
          // if (createName(recording.s, -x, j).endsWith(`_${line}`))
          fields[createName(recording.s, -x, -j)] = "#";
      }
      y += 1;
      x -= 1;
    }

    y = recording.d
    x = 0

    while (x <= recording.d) {
      for (let j = 0; j <= y; j++) {
        if (fields[createName(recording.s, x, j)] === undefined)
          // if (createName(recording.s, x, j).endsWith(`_${line}`))
          fields[createName(recording.s, x, j)] = "#";
        if (fields[createName(recording.s, x, -j)] === undefined)
          // if (createName(recording.s, x, j).endsWith(`_${line}`))
          fields[createName(recording.s, x, -j)] = "#";
      }
      y -= 1
      x += 1
    }
  }
  let print = "";

  // console.log(Object.keys(fields).filter((item) => item.endsWith(`_${line}`)).map((key) => fields[key]).filter((item) => item === '#').length)
  console.log(Object.keys(fields).filter((item) => item.endsWith(`_${line}`)).map((key) => fields[key]).filter((item) => item === '#').length)


  for (let i = -9; i < 40; i++) { // y
    print += i.toString().length === 1 ? ' ' + i + ' ' : i + ' '
    for (let j = -10; j < 40; j++) { // x
      print += fields[createName({ x: j, y: i })] || ".";
    }
    print += "\n";
  }

  console.log(print);
})();
