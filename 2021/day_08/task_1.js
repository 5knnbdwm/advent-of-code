const data = require('./input.json');
// const data = require('./test.json');

let n = 0

for (let i = 0; i < data.length; i += 1) {
  const line = data[i].split(' | ');
  // const signal = line[0].split(' ')
  const digit = line[1].split(' ')
  for (let j = 0; j < digit.length; j += 1) {
    const l = digit[j].length
    if (l === 2 || l === 4 || l === 3 || l === 7) { n += 1 }
  }
}

console.log(n)