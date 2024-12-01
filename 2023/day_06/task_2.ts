const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const [timeLine, distanceLine] = data.split('\n');
  const time = [Number(timeLine.match(/\d+/g).join(''))]
  const distance = [Number(distanceLine.match(/\d+/g).join(''))]
  const result: number[] = []

  for (const timeKey in time) {
    let n = 0;
    for (let i = 0; i <= time[timeKey]; i++)
      if (i * (time[timeKey] - i) > distance[timeKey]) n++

    result.push(n)
  }

  return result.reduce((a, b) => a * b, 1)
}

console.log('result:', run())
