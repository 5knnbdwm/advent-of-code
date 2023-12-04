const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const lines: string[] = data.split('\n').slice(0, -1);

  const copies: Record<string, number> = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const [winning, scratched] = line
      .replace(/Card \d+: /, '')
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

    for (let j = 0; j < (copies[i] ?? 1); j++) {
      // console.log('j:', j)
      for (let k = 0; k < n; k++) {
        const key = i + k + 1
        // console.log('key:', key)
        copies[key] = (copies[key] ?? 1) + 1
      }
    }

    if (copies[i] === undefined) {
      copies[i] = 1
    }
  }

  return Object.keys(copies).map((x) => copies[x]).reduce((a, b) => a + b, 0)
}

console.log('result:', run())
