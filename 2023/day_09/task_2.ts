const { default: data } = require("./file_input.txt");
// const { default: data } = require("./file_test.txt");

function solve(data: number[]): number {
  const diff: number[] = [];

  if (data.every((n) => n === 0)) {
    return 0;
  }

  for (let i = 0; i < data.length - 1; i++) {
    diff.push(data[i + 1] - data[i]);
  }

  return -solve(diff) - diff[0];
}

export default function run() {
  const strut = data
    .split("\n")
    .map((l: string) => l.split(" ").map((n: string) => parseInt(n, 10)));

  // for (let i = 0; i < strut.length; i++) {
  //   console.log(`strut[${i}]:`, strut[i], "solve", solve(strut[i]));
  //   console.log(strut[i][0] + solve(strut[i]));
  // }

  return strut.reduce((acc: number, s: number[]) => acc + (s[0] + solve(s)), 0);
}

console.log("result:", run());
