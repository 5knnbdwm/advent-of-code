const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const lines = data.split('\n');

  const listA = [] as number[];
  const listB = [] as number[];
  let score = 0;

  lines.forEach((line) => {
    const [a, b] = line.split('   ').map((x) => parseInt(x, 10));
    listA.push(a);
    listB.push(b);
  });
  
  for (let i = 0; i < listA.length; i++) {
    const occurs = listB.filter((x) => x === listA[i]).length;
    score += listA[i] * occurs;
  }

  return score;
}

console.log('result:', run())
