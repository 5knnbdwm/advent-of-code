const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

const calculateScore = (enemyHand, ownHand) => {
  let score = 0;

  // general score for own hand
  if (ownHand === "Rock") score += 1;
  else if (ownHand === "Paper") score += 2;
  else if (ownHand === "Scissors") score += 3;

  // score for winning hands
  if (enemyHand === "Rock" && ownHand === "Paper") score += 6;
  else if (enemyHand === "Paper" && ownHand === "Scissors") score += 6;
  else if (enemyHand === "Scissors" && ownHand === "Rock") score += 6;
  // score for drawing hands
  else if (enemyHand === ownHand) score += 3;

  return score;
};

const getSignFromLetter = (letter) => {
  if (letter === "A" || letter === "X") return "Rock";
  else if (letter === "B" || letter === "Y") return "Paper";
  else if (letter === "C" || letter === "Z") return "Scissors";
};

(async () => {
  let file = await data();

  let guide = file.split("\n").map((item) => item.split(" "));

  let finalScore = 0;

  for (let i = 0; i < guide.length; i++) {
    const pair = guide[i];

    const enemyHand = getSignFromLetter(pair[0]);
    const ownHand = getSignFromLetter(pair[1]);

    finalScore += calculateScore(enemyHand, ownHand);
  }

  console.log(finalScore);
})();
