const data = require('./input.json');
// const data = require('./test.json');

let pos_x = 0
let pos_z = 0
let aim = 0

for (let i = 0; i < data.length; i += 1) {
  let element = data[i].split(" ");
  element[1] = Number(element[1])

  if (element[0] === "forward") {
    pos_x += element[1]
    pos_z += aim * element[1]
  } else if (element[0] === 'up') {
    aim -= element[1]
  } else if (element[0] === 'down') {
    aim += element[1]
  }

}

console.log(pos_x * pos_z)