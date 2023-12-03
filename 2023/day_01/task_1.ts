const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const lines = data.split('\n').slice(0, -1);
  return lines.map((line: string) => {
    let nums = line.replace(/[^\d]/g, ``).split('')

    return Number(nums[0] + nums[nums.length - 1])
  }).reduce((a: number, b: number) => a + b, 0);
}

console.log('result:', run());
