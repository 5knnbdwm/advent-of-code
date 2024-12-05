const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  let score = 0

  const matches = data.matchAll(/mul\(\d{1,3},\d{1,3}\)/g) 
  for (const match of matches) {
    const string = match[0].slice(4, -1)
    const numbers = string.split(',').map(Number)

    score += numbers[0] * numbers[1]
  }

  return score
}

console.log('result:', run())
