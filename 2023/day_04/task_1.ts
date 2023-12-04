const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const lines: string[] = data.split('\n').slice(0, -1);
  let result = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const [winning, scratched] = line
      .replace(/Card\s\d+:\s/, '')
      .replace(/\s\s/gm, ' ')
      .split(' | ')
      .map((x) => x
        .split(' ')
        .map((y) => Number(y))
      )

    let n = 0
    for (const number of scratched) {
      if (winning.includes(number)) n++
    }
    if (n)
      result += 2 ** (n - 1)
  }

  return result
}

console.log('result:', run())
