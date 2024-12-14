const { default: data }: { default: string } = require("./file_input.txt");
// const { default: data }: { default: string } = require("./file_test.txt");

export default function run() {
  const games = data.split("\n\n").map((game, idx) => {
    const [stepA, stepB, goal] = game
      .split("\n")
      .map((line) => line.split(/:\s|,\s/));
    return {
      stepA: [parseInt(stepA[1].slice(2)), parseInt(stepA[2].slice(2))],
      stepB: [parseInt(stepB[1].slice(2)), parseInt(stepB[2].slice(2))],
      goal: [
        // parseInt(goal[1].slice(2)),
        10000000000000 + parseInt(goal[1].slice(2)),
        // parseInt(goal[2].slice(2)),
        10000000000000 + parseInt(goal[2].slice(2)),
      ],
      game: idx + 1,
    };
  });
  let score = 0;

  // for (const { stepA, stepB, goal, game} of games) {
  //   console.log({ stepA, stepB, goal })

  //   const gcdX = gcd(stepA[0], stepB[0])
  //   const gcdY = gcd(stepA[1], stepB[1])

  //   if (goal[0] % gcdX !== 0 || goal[1] % gcdY !== 0) {
  //     continue
  //   }

  //   const aScore = Math.min(
  //     Math.ceil(goal[0] / stepA[0]),
  //     Math.ceil(goal[1] / stepA[1]),
  //   );

  //   let fittingStep: [number, number] | null = null;

  //   for (let i = aScore; i >= aScore/2; i--) {
  //     const remainingX = goal[0] - i * stepA[0];
  //     if (remainingX < 0) continue;
  //     const neededBForX = remainingX / stepB[0];

  //     if (!Number.isInteger(neededBForX) || neededBForX < 0) continue;

  //     const resultingY = i * stepA[1] + neededBForX * stepB[1];

  //     if (resultingY === goal[1]) {
  //       fittingStep = [i, neededBForX]
  //       break;
  //     }

  //     if (resultingY > goal[1]) break
  //   }

  //   if (fittingStep) {
  //     score += fittingStep[0] * 3 + fittingStep[1] * 1
  //     console.log(`${game} - ${fittingStep[0]} * 3 + ${fittingStep[1]} * 1 = ${fittingStep[0] * 3 + fittingStep[1] * 1}`)
  //   } else {
  //     console.log("no solution found");
  //   }
  // }

  for (const { stepA, stepB, goal, game } of games) {
    // stepA[0] * a + stepB[0] * b = goal[0]
    // stepA[1] * a + stepB[1] * b = goal[1]

    const a =
      (goal[0] * stepB[1] - goal[1] * stepB[0]) /
      (stepA[0] * stepB[1] - stepA[1] * stepB[0]);
    const b = (goal[0] - a * stepA[0]) / stepB[0];

    if (a % 1 === 0 && b % 1 === 0) {
      score += 3 * a + b;
      // console.log('solution found')
    }
  }

  return score;
}

console.log("result:", run());

function gcd(a: number, b: number): number {
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
