const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

type Robot = {
  p: [number, number],
  v: [number, number]
}

function print(width: number, height: number, robots: Robot[], quads: boolean = false) {
  let text = ''
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (quads) {
        const centerWidth = (width-1) / 2
        const centerHeight = (height-1) / 2
        if (x === centerWidth || y === centerHeight) {
          text += ' '
          continue
        }
      }

      const robotsHere = robots.filter((robot) => robot.p[0] === x && robot.p[1] === y)
      if (robotsHere.length) {
        text += robotsHere.length
      } else {
        text += '.'
      }
    }
    text += '\n'
  }

  console.log(text)
}

export default function run() {
  const robots = data.split('\n').map((line) => {
    const [p, v] = line.split(' ')
    return {
      p: p.slice(2).split(',').map(Number),
      v: v.slice(2).split(',').map(Number)
    } as Robot
  })

  const width = 101
  const height = 103
  let score = 0

  while(true) {
    score ++ 
    const positions = new Set<string>()

    for (const robot of robots) {
      const [x, y] = robot.p
      const [vx, vy] = robot.v

      if (y + vy < 0) {
        robot.p[1] = height + (y + vy)
      } else if (y + vy >= height) {
        robot.p[1] = (y + vy) - height
      } else {
        robot.p[1] = y + vy
      }

      if (x + vx < 0) {
        robot.p[0] = width + (x + vx)
      } else if (x + vx >= width) {
        robot.p[0] = (x + vx) - width
      } else {
        robot.p[0] = x + vx
      }
    }

    let noOverlaps = true
    
    for (const robot of robots) {
      const pos = `${robot.p[0]},${robot.p[1]}`
      
      if (positions.has(pos)) {
        noOverlaps = false
      } else {
        positions.add(pos)
      }
    }

    if (noOverlaps) {
      print(width, height, robots)
      return score
    }
  }
  return null
}

console.log('result:', run())
