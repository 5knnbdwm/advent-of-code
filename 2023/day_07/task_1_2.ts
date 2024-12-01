type HandType = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Represents high card to five of a kind

const ORDER_1: Record<string, number> = {
  "A": 14, "K": 13, "Q": 12, "J": 11, "T": 10, "9": 9, "8": 8, "7": 7,
  "6": 6, "5": 5, "4": 4, "3": 3, "2": 2,
};

const ORDER_2: Record<string, number> = {
  "A": 14, "K": 13, "Q": 12, "T": 10, "9": 9, "8": 8, "7": 7, "6": 6,
  "5": 5, "4": 4, "3": 3, "2": 2, "J": 1,
};

function getHandType(hand: string): HandType {
  const counts = [...new Set(hand)].map(x => hand.split(x).length - 1);
  const maxCount = Math.max(...counts);

  if (maxCount === 5) return 6;
  if (maxCount === 4) return 5;
  if (maxCount === 3) return counts.includes(2) ? 4 : 3;
  if (maxCount === 2) return counts.filter(x => x === 2).length === 2 ? 2 : 1;
  return 0;
}

function getHandTypeWithJoker(hand: string): HandType {
  const cntJokers = (hand.match(/J/g) || []).length;
  hand = hand.replace(/J/g, '');
  const counts = [...new Set(hand)].map(x => hand.split(x).length - 1);
  const maxCount = Math.max(...counts);

  if (maxCount + cntJokers === 5) return 6;
  if (maxCount + cntJokers === 4) return 5;
  if (maxCount + cntJokers === 3) {
    if (counts.includes(2)) return 4;
    return 3;
  }
  if (maxCount + cntJokers === 2) {
    if (counts.filter(x => x === 2).length === 2 || cntJokers === 1) return 2;
    return 1;
  }
  return 0;
}

function compareHands(order: Record<string, number>, hand1: string, hand2: string): number {
  for (let i = 0; i < 5; i++) {
    if (order[hand1[i]] > order[hand2[i]]) return 1;
    if (order[hand1[i]] < order[hand2[i]]) return -1;
  }
  return 0;
}

function compareHands1(hand1: string, hand2: string): number {
  return compareHands(ORDER_1, hand1, hand2);
}

function compareHands2(hand1: string, hand2: string): number {
  return compareHands(ORDER_2, hand1, hand2);
}

// Assuming part_1 will receive the games array as an argument
function part1(games: string[]): number {
  let buckets: Record<HandType, Array<[string, number]>> = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  };
  let bucketLengths: number[] = new Array(7).fill(0);
  let winnings = 0;
  let prevRanks = 1;

  games.forEach(game => {
    const [hand, bidStr] = game.trim().split(" ");
    const bid = parseInt(bidStr);
    const handType = getHandType(hand);
    console.log(hand, bid, handType);
    buckets[handType].push([hand, bid]);
    bucketLengths[handType]++;
  });

  console.log(buckets);

  Object.keys(buckets).forEach(key => {
    const bucket = buckets[key as unknown as HandType];
    if (bucket.length > 0) {
      bucket.sort((a, b) => compareHands1(a[0], b[0]));
      bucket.forEach((game, i) => {
        winnings += game[1] * (prevRanks + i);
      });
    }
    prevRanks += bucketLengths[key as unknown as HandType];
  });

  return winnings;
}

// const {default: dataInput} = require('./file_input.txt');
const {default: dataTest} = require('./file_test.txt');

let games = dataTest.split("\n");
games.pop()

console.log(part1(games))

