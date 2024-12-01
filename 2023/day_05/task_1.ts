const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

const transform = (value: number, group: string) => {
  const lines = group.split('\n');
  lines.shift();

  // let a: Map<string, string> = new Map()
  let result = value

  for (const line of lines) {
    const [destination, source, length] = line.split(' ').map(Number);

    if (value >= source && value <= source + length) {
      result =  destination + (value - source)
      break
    }
  }

  return result
}

export default function run() {
  const groups = data.split('\n\n');
  let seeds = groups[0].split(': ')[1].split(' ').map(Number)
  let result = -1

  for (const seed of seeds) {
    let val1 = transform(seed,groups[1])
    let val2= transform(val1,groups[2])
    let val3= transform(val2,groups[3])
    let val4= transform(val3,groups[4])
    let val5= transform(val4,groups[5])
    let val6= transform(val5,groups[6])
    let val7= transform(val6,groups[7].replace(/\n$/, ''))

    if (result === -1 || val7 < result) {
      result = val7
    }
  }

  return result
}

console.log('result:', run())
