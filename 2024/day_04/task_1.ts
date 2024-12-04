const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const box = data.split('\n').map(line => line.split(''))
  const width = box[0].length
  const height = box.length

  let score = 0

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const field = box[y][x]

      if (field === 'X') {
        const margin = 3

        // middle right
        if (x < width - margin && box[y][x + 1] === 'M' && box[y][x + 2] === 'A' && box[y][x + 3] === 'S') {
          score += 1
        }
        // middle left
        if (x >= margin && box[y][x - 1] === 'M' && box[y][x - 2] === 'A' && box[y][x - 3] === 'S') {
          score += 1
        }
        // middle bottom
        if (y < height - margin && box[y + 1][x] === 'M' && box[y + 2][x] === 'A' && box[y + 3][x] === 'S') {
          score += 1
        }
        // middle top
        if (y >= margin && box[y - 1][x] === 'M' && box[y - 2][x] === 'A' && box[y - 3][x] === 'S') {
          score += 1
        }

        // bottom right
        if (x < width - margin && y < height - margin && box[y + 1][x + 1] === 'M' && box[y + 2][x + 2] === 'A' && box[y + 3][x + 3] === 'S') {
          score += 1
        }
        // bottom left
        if (x >= margin && y < height - margin && box[y + 1][x - 1] === 'M' && box[y + 2][x - 2] === 'A' && box[y + 3][x - 3] === 'S') {
          score += 1
        }
        
        // top right
        if (x < width - margin && y >= margin && box[y-1][x+1] === 'M' && box[y-2][x+2] === 'A' && box[y-3][x+3] === 'S') {
          score += 1
        }
        // top left
        if (x >= margin && y >= margin && box[y-1][x-1] === 'M' && box[y-2][x-2] === 'A' && box[y-3][x-3] === 'S') {
          score += 1
        }
        
      }
    }
  }

  return score
}

console.log('result:', run())
