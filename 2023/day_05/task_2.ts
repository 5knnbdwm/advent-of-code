const {default: data} = require('./input.txt');
// const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

// const transformMap = (value: number, group: string) => {
//   const lines = group.split('\n');
//   lines.shift();
//
//   let a: Map<string, string> = new Map()
//
//   let result = value
//
//   for (const line of lines) {
//     const [destStart, sourceStart, length] = line.split(' ').map(Number);
//
//     if (value >= sourceStart && value <= sourceStart + length) {
//       result = destStart + (value - sourceStart)
//       break
//     }
//   }
//
//   return result
// }

// const transform = (value: number, groups: string[]) => {
//   let val1 = transformMap(value, groups[1])
//   let val2 = transformMap(val1, groups[2])
//   let val5 = transformMap(val2, groups[5])
//   let val3 = transformMap(val5, groups[3])
//   let val4 = transformMap(val3, groups[4])
//   let val6 = transformMap(val4, groups[6])
//   let val7 = transformMap(val6, groups[7].replace(/\n$/, ''))
//
//   return val7
// }


export default function run() {
  const input = data.split('\n\n');
  const seedRanges = input[0].split(': ')[1].replace(/(\d+\s\d+)\s/gm, '$1\n').split('\n').map(x => x.split(' ').map(Number))
  const transformations = input.slice(1).map(x => x.split('\n').slice(1).map(y => y.split(' ').map(Number)))

  let result = -1

  // for (const seed of seeds) {
  //   for (const transformation of transformations) {
  //     let n = 0
  //     for (const transformationElement of transformation) {
  //       console.log(transformationElement)
  //       const destinationStart = transformationElement[0]
  //       const sourceStart = transformationElement[1]
  //       const length = transformationElement[2]
  //
  //       if (seed >= sourceStart && seed <= sourceStart + length)
  //         n = destinationStart + (seed - sourceStart)
  //     }
  //     console.log(n)
  //   }
  //   break
  // }

  // const transform = (seed: number) => {
  //   for (const transformation of transformations) {
  //     for (const [destinationStart, sourceStart, length] of transformation) {
  //       if (seed >= sourceStart && seed <= sourceStart + length) {
  //         seed = destinationStart + (seed - sourceStart)
  //         break
  //       }
  //     }
  //   }
  //   return seed
  // }
  //
  //
  // return seeds.map(s => transform(s))

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
      break;
    }
  }
}

console.log('result:', run())
