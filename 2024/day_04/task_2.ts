const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const box = data.split('\n').map(line => line.split(''))
  const width = box[0].length
  const height = box.length

  let score = 0

  let print = ''
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const field = box[y][x]

      if (field === 'A' && x < width - 1 && x >= 1  && y < height - 1 && y >= 1) {
        let tmp = ''
        if (box[y-1][x-1] === 'M' && box[y-1][x+1]==='M' && box[y+1][x+1] === 'S' && box[y+1][x-1] === 'S') {
          tmp += '#'
          score += 1
        }
        if (box[y-1][x-1] === 'S' && box[y-1][x+1]==='M' && box[y+1][x+1] === 'M' && box[y+1][x-1] === 'S') {
          tmp += '#'
          score += 1
        }
        if (box[y-1][x-1] === 'S' && box[y-1][x+1]==='S' && box[y+1][x+1] === 'M' && box[y+1][x-1] === 'M') {
          tmp += '#'
          score += 1
        }
        if (box[y-1][x-1] === 'M' && box[y-1][x+1]==='S' && box[y+1][x+1] === 'S' && box[y+1][x-1] === 'M') {
          tmp += '#'
          score += 1
        }

        if (tmp === '') {
          print += '.'
        } else {
          print += tmp
        }
      } else {
        print += '.'
      }
    }

    print += '\n'
  }

  // console.log(print)

  return score
}

console.log('result:', run())
