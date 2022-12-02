const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };

// Rock for Rock
// Paper for Paper
// Scissors for Scissors

// Rock for Rock
// Paper for Paper
// Scissors for Scissors

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
  if (enemyHand === ownHand) score += 3;

  return score;
};

const getSignFromLetter = (letter) => {
  if (letter === "A") return "Rock";
  else if (letter === "B") return "Paper";
  else if (letter === "C") return "Scissors";
  else if (letter === "X") return "Rock";
  else if (letter === "Y") return "Paper";
  else if (letter === "Z") return "Scissors";
};

(async () => {
  let file = await data();

  let guide = file
    .split("\n")
    .map((item) => item.split(" ").map((item) => getSignFromLetter(item)));

  let finalScore = 0;

  for (let i = 0; i < guide.length; i++) {
    const pair = guide[i];
    finalScore += calculateScore(pair[0], pair[1]);
  }

  console.log(finalScore);
})();
