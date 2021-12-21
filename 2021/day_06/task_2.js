const data = require('./input.json');
// const data = require('./test.json');

const days = 256
let fish_count = Array(9).fill().map((_, index) => data.filter((item) => item === index).length)

for (let i = 0; i < days; i += 1) {
  const breeding = fish_count.shift()
  fish_count.push(breeding)
  fish_count[6] += breeding
}

console.log(fish_count.reduce((a, b) => a + b))