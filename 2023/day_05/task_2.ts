const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  const input = data.split('\n\n');
  const seedRanges: number[][] = input[0].split(': ')[1].replace(/(\d+\s\d+)\s/gm, '$1\n').split('\n').map((x: string) => x.split(' ').map(Number))
  const transformations: number[][][] = input.slice(1).map((x: string) => x.split('\n').slice(1).map((y: string) => y.split(' ').map(Number)))

  const isSeed = (seed: number): boolean => seedRanges
    .some(([seedStart, length]) => seedStart <= seed && seedStart + length >= seed);

  const  getSeedFromLocation = (step: number): number  =>{
    for (const transformation of transformations.slice().reverse()) {
      for (const [destination, source, length] of transformation) {
        if (destination <= step && destination + length > step) {
          step = source + (step - destination);
          break;
        }
      }
    }

    return step;
  }

  for (let i = 0; i < 1_000_000_000; i++) {
    const seed = getSeedFromLocation(i);

    if (isSeed(seed)) {
      return i
    }
  }
}

console.log('result:', run())
