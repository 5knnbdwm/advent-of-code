// const data = require('./input.json');
// const data = require('./test.json');

const data = [
  "0199999999",
  "1999999999",
  "9999999999",
  "9999999999",
  "9999999999"
]

let queue = []
let basin = []
let looked_at = []

for (let i = 0; i < data.length; i += 1) {
  for (let j = 0; j < data[i].length; j += 1) {
    let edges = 0
    let low_points = 0

    if (i !== 0) {
      edges += 1
      if (data[i - 1][j] > data[i][j]) {
        low_points += 1
      }
    }
    if (j !== 0) {
      edges += 1
      if (data[i][j - 1] > data[i][j]) {
        low_points += 1
      }
    }
    if (i !== data.length - 1) {
      edges += 1
      if (data[i + 1][j] > data[i][j]) {
        low_points += 1
      }
    }
    if (j !== data[i].length - 1) {
      edges += 1
      if (data[i][j + 1] > data[i][j]) {
        low_points += 1
      }
    }
    if (edges === low_points) {
      queue.push([i, j])
    }
  }
}

function spread(i, j) {

  if (looked_at.includes(`${i}_${j}`)) {
    return 0
  } else if (data[i][j] === 9) {
    return 0
  } else {
    console.log(i, j, looked_at)
    looked_at.push(`${i}_${j}`)
  }

  // let count = 1

  if (i !== 0) {
    count += spread(i - 1, j, data[i][j])
  }
  if (j !== 0) {
    count += spread(i, j - 1, data[i][j])
  }
  if (i !== data.length - 1) {
    count += spread(i + 1, j, data[i][j])
  }
  if (j !== data[i].length - 1) {
    count += spread(i, j + 1, data[i][j])
  }

  return count
}

for (let i = 0; i < queue.length; i += 1) {
  basin.push(spread(queue[i][0], queue[i][1], 10))
}

console.log(basin)