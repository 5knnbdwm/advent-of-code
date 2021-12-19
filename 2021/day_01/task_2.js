const data = require('./input.json');
// const data = require('./test.json');

let larger = 0
let last = ''

for (let i = 2; i < data.length; i += 1) {
  const current = data[i - 2] + data[i - 1] + data[i]
  if (current > last && last !== '') {
    larger += 1
  }
  last = current
}

console.log(larger)