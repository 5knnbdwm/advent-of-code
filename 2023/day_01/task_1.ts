const {default: data} = require('./input.txt');
// const {default: data} = require('./test.txt');

export default async function run(): Promise<void> {
  // console.log('Task 1');
  const lines = data.split('\n').slice(0, -1);
  console.log(lines.map((line: string) => {
    let nums = line.replace(/[^\d]/g, ``).split('')

    return Number(nums[0]+nums[nums.length - 1])
  }).reduce((a: number, b: number) => a + b, 0));

}

run();
