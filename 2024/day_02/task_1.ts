const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const line = data.split('\n')
  let safe = 0

  function chechRange(a: number, b: number) {
    const range = Math.abs(b - a) 
    if (range === 1 || range === 2 || range === 3) return true
    return false
  }

  for (let i = 0; i < line.length; i++) {
    const numbers = line[i].split(' ').map(Number)
    
    const increasing = numbers.every((n, i) => i === 0 || (n > numbers[i - 1] && chechRange(n, numbers[i - 1])))
    const decreasing = numbers.every((n, i) => i === 0 || (n < numbers[i - 1] && chechRange(n, numbers[i - 1])))

    if (increasing || decreasing) {
      safe++
    }
  }

  return safe
}

console.log('result:', run())
