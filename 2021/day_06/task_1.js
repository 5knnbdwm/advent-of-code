const data = require('./input.json');
// const data = require('./test.json');

const days = 80

for (let i = 0; i < days; i++) {
  const length = data.length
  for (let j = 0; j < length; j++) {
    if (data[j] === 0) {
      data[j] = 6
      data.push(8)
    } else {
      data[j] -= 1
    }
  }
}

console.log(data.length)