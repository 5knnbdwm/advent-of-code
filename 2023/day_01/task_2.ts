const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default async function run(): Promise<void> {
  const lines = data.split('\n').slice(0, -1);

  const matches = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  return lines.map((line: string) => {
    let num = ''

    f: for (let i = 0; i < line.length; i++) {
      for (let j = 0; j < matches.length; j++) {
        if (line.substring(i).startsWith(matches[j])) {
          num += nums[j]
          break f
        }
      }
    }
    b: for (let i = 0; i < line.length; i++) {
      for (let j = 0; j < matches.length; j++) {
        const remaining = i === 0 ? line : line.slice(0, -i)
        // console.log(remaining)
        if (remaining.endsWith(matches[j])) {
          num += nums[j]
          break b
        }
      }
    }

    return Number(num)
  }).reduce((a: number, b: number) => a + b, 0)
}

console.log('result:', run());
