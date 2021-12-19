const data = require('./input.json');
// const data = require('./test.json');

let o2 = data
let co2 = data

const count = function (data_in) {
  const count = new Array(data[0].length).fill(0)
  for (let i = 0; i < data_in.length; i += 1) {
    const element = data_in[i].split("");

    for (let j = 0; j < element.length; j += 1) {
      count[j] += Number(element[j])
    }
  }
  return count
}

for (let i = 0; i < data[0].length; i += 1) {
  const tmp_count = count(o2)
  const bit = (o2.length / 2) <= tmp_count[i] ? "1" : "0"

  o2 = o2.filter((item) => item[i] === bit)

  if (o2.length === 1) {
    break
  }
}

for (let i = 0; i < data[0].length; i += 1) {
  const tmp_count = count(co2)
  const bit = (co2.length / 2) <= tmp_count[i] ? "0" : "1"

  co2 = co2.filter((item) => item[i] === bit)

  if (co2.length === 1) {
    break
  }
}

console.log(parseInt(o2[0], 2) * parseInt(co2[0], 2))