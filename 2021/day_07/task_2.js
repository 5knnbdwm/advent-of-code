const data = require('./input.json');
// const data = require('./test.json');

const min = Math.min(...data)
const max = Math.max(...data)

let fuel = null

function fuelLevel(crab, target) {
  let fuel_tmp = 0
  let n = 1

  let s = crab < target ? crab : target
  let e = crab > target ? crab : target

  for (let i = s; i < e; i += 1) {
    fuel_tmp += n
    n += 1
  }
  return fuel_tmp
}

for (let i = min; i <= max; i += 1) {
  let fuel_tmp = 0
  for (let j = 0; j < data.length; j += 1) {
    fuel_tmp += fuelLevel(data[j], i)
  }
  if (fuel_tmp < fuel || fuel === null) {
    fuel = fuel_tmp
  }
}

console.log(fuel)