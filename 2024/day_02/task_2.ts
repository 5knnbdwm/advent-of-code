const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const line = data.split('\n')
  let safe = 0

  function chechRange(a: number, b: number) {
    const range = Math.abs(b - a) 
    if (range === 1 || range === 2 || range === 3) return true
    return false
  }

  function checkMissing(numbers: number[]) {
    const increasing = numbers.every((n, i) => i === 0 || (n > numbers[i - 1] && chechRange(n, numbers[i - 1])))
    const decreasing = numbers.every((n, i) => i === 0 || (n < numbers[i - 1] && chechRange(n, numbers[i - 1])))

    for (let i = 0; i < numbers.length; i++) {
      let limit = [...numbers] 
      limit.splice(i, 1)
      
      const increasing2 = limit.every((n, i) => i === 0 || (n > limit[i - 1] && chechRange(n, limit[i - 1])))
      const decreasing2 = limit.every((n, i) => i === 0 || (n < limit[i - 1] && chechRange(n, limit[i - 1])))

      if (increasing2 || decreasing2) {
        return true
      }
    }

    if (increasing || decreasing) {
      return true
    }

    return false
  }

  for (let i = 0; i < line.length; i++) {
    const numbers = line[i].split(' ').map(Number)
    const missing = checkMissing(numbers)

    if (missing) {
      safe++
    }
  }

  return safe
}

console.log('result:', run())
