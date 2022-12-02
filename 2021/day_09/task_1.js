const data = require('./input.json');
// const data = require('./test.json');

let sum = 0

for (let i = 0; i < data.length; i += 1) {
  const row = data[i];
  for (let j = 0; j < row.length; j += 1) {
    const column = row[j];

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
      sum += Number(data[i][j]) + 1
    }
  }
}

console.log(sum)