const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  let score = 0
  let enabled = true

  const matches = data.matchAll(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g) 
  for (const match of matches) {
    if (match[0] === 'do()') {
      enabled = true
      continue
    }else if (match[0] === 'don\'t()') {
      enabled = false
      continue
    } else if (enabled){

      
      const string = match[0].slice(4, -1)
      const numbers = string.split(',').map(Number)
      
      score += numbers[0] * numbers[1]
    }
  }

  return score
}

console.log('result:', run())
