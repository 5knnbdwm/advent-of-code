const data = require('./input.json');
// const data = require('./test.json');

let pos_x = 0
let pos_z = 0

for (let i = 0; i < data.length; i += 1) {
  let element = data[i].split(" ");
  element[1] = Number(element[1])
  // console.log(element)

  if (element[0] === "forward") {
    pos_x += element[1]
  } else if (element[0] === 'up') {
    pos_z -= element[1]
  } else if (element[0] === 'down') {
    pos_z += element[1]
  }

}

console.log(pos_x * pos_z)