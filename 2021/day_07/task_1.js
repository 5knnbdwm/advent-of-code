const data = require('./input.json');
// const data = require('./test.json');

const min = Math.min(...data)
const max = Math.max(...data)

let fuel = null

function fuelLevel(crab, target) {
  return Math.abs(crab - target)
}

for (let i = min; i <= max; i += 1) {
  let fuel_tmp = 0
  for (let j = 0; j < data.length; j++) {
    fuel_tmp += fuelLevel(data[j], i)
  }
  if (fuel_tmp < fuel || fuel === null) {
    fuel = fuel_tmp
  }
}

console.log(fuel)