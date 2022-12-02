// const data = require('./input.json');
const data = require('./test.json');

let queue = []
let sum = 0

const chars = {
  '(': ['add', '(', 0],
  '[': ['add', '[', 0],
  '{': ['add', '{', 0],
  '<': ['add', '<', 0],
  ')': ['remove', '(', 3],
  ']': ['remove', '[', 57],
  '}': ['remove', '{', 1197],
  '>': ['remove', '<', 25137],
}

for (let i = 0; i < data.length; i += 1) {
  const line = data[i].split("");
  let toPrint = ''

  for (let j = 0; j < line.length; j += 1) {
    const element = chars[line[j]];

    if (element[0] === 'add') {
      queue.push(element[1])
    } else if (element[0] === 'remove' && queue[queue.length - 1] === element[1]) {
      queue.pop()
    } else {
      // sum += element[2]
      console.log(i, element)
      // break
    }
  }
  // console.log(toPrint)
}

console.log(sum)