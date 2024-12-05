const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const lines = data.split('\n');

  const listA = [] as number[];
  const listB = [] as number[];
  let distance = 0;

  lines.forEach((line) => {
    const [a, b] = line.split('   ').map((x) => parseInt(x, 10));
    listA.push(a);
    listB.push(b);
  });
  listA.sort((a, b) => a - b)
  listB.sort((a, b) => a - b)

  for (let i = 0; i < listA.length; i++) {
    distance += Math.abs(listA[i] - listB[i]);
  }

  return distance;
}

console.log('result:', run())
