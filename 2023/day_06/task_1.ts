const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const [timeLine, distanceLine] = data.split('\n');

  const time = timeLine.match(/\d+/g).map(Number)
  const distance = distanceLine.match(/\d+/g).map(Number)

  const result: number[] = []

  for (const timeKey in time) {
    const timeValue = time[timeKey];
    const distanceValue = distance[timeKey];
    let n = 0;
    // console.log('time:', timeValue, 'distance', distanceValue)

    for (let i = 0; i <= timeValue; i++) {
      // console.log('hold:', i, 'distance', i * (timeValue - i), i * (timeValue - i) > distanceValue)
      if (i * (timeValue - i) > distanceValue) n++
    }
    result.push(n)
  }

  return result.reduce((a, b) => a * b, 1)
}

console.log('result:', run())
