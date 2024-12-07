const { default: data }: { default: string } = require("./file_input.txt");
// const { default: data }: { default: string } = require("./file_test.txt");

const findSolution = (
  target: number,
  currentValue: number,
  remainingNums: number[],
): number | null => {
  if (currentValue > target) return null;
  if (remainingNums.length === 0) {
    return currentValue === target ? currentValue : null;
  }

  const operations = [
    (a: number, b: number): number => a + b,
    (a: number, b: number): number => a * b,
  ];

  return (
    operations
      .map((op) =>
        findSolution(
          target,
          op(currentValue, remainingNums[0]),
          remainingNums.slice(1),
        ),
      )
      .find((result) => result !== null) ?? null
  );
};

export default function run() {
  const lines = data.split("\n").map((l) => ({
    target: Number(l.split(": ")[0]),
    initial: l.split(": ")[1].split(" ").map(Number)[0],
    remainingNumbers: l.split(": ")[1].split(" ").map(Number).slice(1),
  }));

  return lines
    .map((eq) => findSolution(eq.target, eq.initial, eq.remainingNumbers))
    .filter((x): x is number => x !== null)
    .reduce((acc, curr) => acc + curr, 0);
}

console.log("result:", run());
