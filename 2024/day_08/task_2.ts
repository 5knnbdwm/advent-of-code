const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const grid = data.split('\n').map((l) => l.split(''));
  const width = grid[0].length
  const height = grid.length

  type Position = {
    x: number,
    y: number
  }
  const signals = {} as {[key: string]: Position[]}
  const antinodes = [] as string[]

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === '.') continue
      const signal = grid[i][j]
      if (!signals[signal]) signals[signal] = []
      signals[signal].push({x: j, y: i})
    }
  }

  for (let signal in signals) {
    for (let i = 0; i < signals[signal].length; i++) {
      const currentPosition = signals[signal][i]
      for (let j = 0; j < signals[signal].length; j++) {
        if (i === j) continue
        const otherPosition = signals[signal][j]
        
        const xDiff = currentPosition.x - otherPosition.x
        const yDiff = currentPosition.y - otherPosition.y
        let repeat = 0

        while(true) {
          const anti = { x: currentPosition.x + xDiff * repeat, y: currentPosition.y + yDiff * repeat }
          if (anti.x < 0 || anti.x >= width || anti.y < 0 || anti.y >= height) break
          if (!antinodes.includes(anti.x + ',' + anti.y)){
            antinodes.push(anti.x + ',' + anti.y)
          }
          repeat++
        }
      }
    }
  }

  // let text = ''
  // for (let i = 0; i < height; i++) {
  //   for (let j = 0; j < width; j++) {
  //     if (grid[i][j] !== '.') {
  //       text += grid[i][j]
  //     } else 
  //     if (antinodes.includes(j + ',' + i)) {
  //       text += '#'
  //     } else {
  //       text += '.'
  //     }
  //   }
  //   text += '\n'
  // }
  // console.log(text)
  
  return antinodes.length
}

console.log('result:', run())
