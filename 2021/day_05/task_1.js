const data = require('./input.json');
// const data = require('./test.json');

let diagram = {}
let max_x = 0
let max_y = 0

function parseLine(line) {
  const coordinates = line.replace(' -> ', ',').split(',')

  return {
    x1: Number(coordinates[0]),
    y1: Number(coordinates[1]),
    x2: Number(coordinates[2]),
    y2: Number(coordinates[3])
  }
}

for (let i = 0; i < data.length; i += 1) {
  let { x1, y1, x2, y2 } = parseLine(data[i])

  if (x1 > x2) {
    const tmp = x1
    x1 = x2
    x2 = tmp
  }
  if (y1 > y2) {
    const tmp = y1
    y1 = y2
    y2 = tmp
  }
  if (x1 === x2 || y1 === y2) {

    // only really needed if you want to map it
    if (x2 > max_x) { max_x = x2 }
    if (y2 > max_y) { max_y = y2 }

    for (let y_ = y1; y_ <= y2; y_ += 1) {
      for (let x_ = x1; x_ <= x2; x_ += 1) {
        const p = `${x_}_${y_}`
        if (p in diagram) {
          diagram[p] += 1
        } else {
          diagram[p] = 1
        }
      }
    }
  }
}

const diagram_keys = Object.keys(diagram)
let n = 0

for (let i = 0; i < diagram_keys.length; i += 1) {
  if (diagram[diagram_keys[i]] >= 2) {
    n += 1
  }
}

console.log(n)


// uncomment to map
// for (let j = 0; j <= max_x; j += 1) {
//   let line = []
//   for (let i = 0; i <= max_y; i += 1) {
//     if (`${i}_${j}` in diagram) {
//       line.push(diagram[`${i}_${j}`])
//     } else {
//       line.push('.')
//     }
//   }
//   console.log(line.join(' '))
// }