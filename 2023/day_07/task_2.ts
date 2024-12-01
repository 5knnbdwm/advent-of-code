const {default: data} = require('./file_input.txt');
// const {default:data} = require('./file_test.txt');

type HandAndBid = [string, number];

// Read data from file '7'
// Note: File reading in TypeScript typically involves asynchronous APIs and is not directly translatable.
// Assuming handsAndBids is an array of HandAndBid available in your TypeScript environment
let handsAndBids: HandAndBid[] = []; // Replace with actual data reading logic

const lines = data.split('\n');
lines.pop()

lines.forEach((line:string) => {
  const [hand, bid] = line.split(' ');
  handsAndBids.push([hand, parseInt(bid)]);
});

function handType(s: string): number {
  let setNumbers = new Set<number>();
  let numPairs = 0;

  for (let i = 0; i < s.length; i++) {
    const x = s[i];
    const num = s.split(x).length - 1;
    setNumbers.add(num);
    if (num === 2) numPairs += 1;
  }

  if (setNumbers.has(5)) return 6; // five of a kind
  if (setNumbers.has(4)) return 5; // four of a kind
  if (setNumbers.has(3) && setNumbers.has(2)) return 4; // full house
  if (setNumbers.has(3)) return 3; // three of a kind

  return numPairs / 2; // other cases
}

const L = 'AKQJT98765432'.split('');
const l = 'abcdefghijklm'.split('');

function f(char: string): string {
  const i = L.indexOf(char);
  return l[i];
}

function greater(hb1: HandAndBid, hb2: HandAndBid): number {
  const [s,] = hb1;
  const [t,] = hb2;
  if (handType(s) < handType(t)) return -1;
  if (handType(s) > handType(t)) return 1;
  return (s.split('').map(f) >= t.split('').map(f)) ? -1 : 0;
}

// Sorting
let sor = handsAndBids.sort((a, b) => greater(a, b));

let sum = 0;
sor.forEach((item, index) => {
  sum += item[1] * (index + 1);
});

console.log('Part 1', sum);

// // Part 2
// function handType2(s: string): number {
//   let max = 0;
//   L.forEach(x => {
//     max = Math.max(max, handType(s.replace(/J/g, x)));
//   });
//   return max;
// }
//
// const L2 = 'AKQT98765432J'.split('');
// const l2 = 'abcdefghijklm'.split('');
//
// function f2(char: string): string {
//   const i = L2.indexOf(char);
//   return l2[i];
// }
//
// function greater2(hb1: HandAndBid, hb2: HandAndBid): number {
//   const [s,] = hb1;
//   const [t,] = hb2;
//   if (handType2(s) < handType2(t)) return -1;
//   if (handType2(s) > handType2(t)) return 1;
//   return (s.split('').map(f2) >= t.split('').map(f2)) ? -1 : 0;
// }
//
// // Sorting for part 2
// sor = handsAndBids.sort((a, b) => greater2(a, b));
//
// sum = 0;
// sor.forEach((item, index) => {
//   sum += item[1] * (index + 1);
// });
//
// console.log('Part 2', sum);
