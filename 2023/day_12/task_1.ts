// const {default: data} = require('./file_input.txt');
const { default: data } = require("./file_test.txt");

function emptySpace(value: string) {
  let n = 0;
  if (!value.startsWith("?")) return 0;

  while (value[n] === "?") {
    n++;
  }
  return n;
}

function fillPattern(value: string, pattern: number[]): number {
  let n = emptySpace(value);
  console.log("n:", n);

  if (n === 0) {
    fillPattern(value.substring(1), pattern);
  } else {
    if (pattern[0] === 1) {
      
    }
  }

  // let result = value.split("");
  // for (let i = 0; i < pattern.length; i++) {
  //   result[n] = pattern[i].toString();
  //   n++;
  // }
  // return result.join("");

  return 0;
}

export default function run() {
  const lines = data.split("\n").map((line: string) => line.split(" "));

  for (let line of lines) {
    const value: string = line[0];
    const pattern: number[] = line[1]
      .split(",")
      .map((v: string) => parseInt(v));

    console.log("value:", value, "pattern:", pattern);
    fillPattern(value, pattern);
    break;
  }
}

console.log("result:", run());
