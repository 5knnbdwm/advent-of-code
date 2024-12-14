const { default: data }: { default: string } = require("./file_input.txt");
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const games = data.split("\n\n").map((game, idx) => {
    const [stepA, stepB, goal] = game
      .split("\n")
      .map((line) => line.split(/:\s|,\s/));
    return {
      stepA: [parseInt(stepA[1].slice(2)), parseInt(stepA[2].slice(2))],
      stepB: [parseInt(stepB[1].slice(2)), parseInt(stepB[2].slice(2))],
      goal: [parseInt(goal[1].slice(2)), parseInt(goal[2].slice(2))],
      game: idx + 1,
    };
  });
  let score = 0;

  for (const { stepA, stepB, goal, game } of games) {
    const aScore = Math.ceil(goal[0] / stepA[0]);
    let fittingStep: [number, number] | null = null;

    for (let i = aScore; i >= 0; i--) {
      let bScore = 0;

      while (i * stepA[0] + bScore * stepB[0] <= goal[0]) {
        if (
          i * stepA[0] + bScore * stepB[0] === goal[0] &&
          i * stepA[1] + bScore * stepB[1] === goal[1]
        ) {
          fittingStep = [i, bScore];
        }
        bScore++;
      }
    }
    if (fittingStep) {
      score += fittingStep[0] * 3 + fittingStep[1];
      // console.log(`${game} - ${fittingStep[0]} * 3 + ${fittingStep[1]} * 1 = ${fittingStep[0] * 3 + fittingStep[1] * 1}`)
    }
  }

  return score;
}

console.log("result:", run());
