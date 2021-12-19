const data = require('./input.json');
// const data = require('./test.json');

let gamma = ''
let epsilon = ''
const count = new Array(data[0].length).fill(0)

for (let i = 0; i < data.length; i += 1) {
  const element = data[i].split("");

  for (let j = 0; j < element.length; j += 1) {
    count[j] += Number(element[j])
  }
}

for (let i = 0; i < count.length; i += 1) {
  const element = count[i];

  if ((data.length / 2) <= element) {
    gamma += '1'
    epsilon += '0'
  } else {
    gamma += '0'
    epsilon += '1'
  }
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))