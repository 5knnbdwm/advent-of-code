const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

// const data = `p=2,4 v=2,-3`

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
  // console.log(data)
  const robots = data.split('\n').map((line) => {
    const [p, v] = line.split(' ')
    return {
      p: p.slice(2).split(',').map(Number),
      v: v.slice(2).split(',').map(Number)
    } as Robot
  })

  const width = 101
  const height = 103
  // const width = 11
  // const height = 7
  const itterations = 6377
  // console.log(robots)

  // print(width, height, robots)

  const quad = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0
  }

  for (const robot of robots) {
    for (let i = 0; i < itterations; i++) {
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

      // console.log([x, y], robot.p, robot.v)
      // print(width, height, robots,)
    }

    // console.log(robot.p, (width-1) / 2, (height-1) / 2)

    const centerWidth = (width-1) / 2
    const centerHeight = (height-1) / 2
    if (robot.p[0] < centerWidth && robot.p[1] < centerHeight) {
      quad.topLeft++
    }
    if (robot.p[0] > centerWidth && robot.p[1] < centerHeight) {
      quad.topRight++
    }
    if (robot.p[0] < centerWidth && robot.p[1] > centerHeight) {
      quad.bottomLeft++
    }
    if (robot.p[0] > centerWidth && robot.p[1] > centerHeight) {
      quad.bottomRight++
    }
  }

  console.log(quad)


  print(width, height, robots)

  return quad.topLeft * quad.topRight * quad.bottomLeft * quad.bottomRight
  
  // console.log(robots)
}

console.log('result:', run())
