const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

function next({x, y}: {x: number, y: number}, facing: 'n' | 's' | 'e' | 'w') {
  if (facing === 'n') return {x: x, y: y-1}
  if (facing === 's') return {x: x, y: y+1}
  if (facing === 'e') return {x: x+1, y: y}
  if (facing === 'w') return {x: x-1, y: y}
  throw new Error('invalid facing')
}

function join(a: {x: number, y: number}) {
  return `${a.x},${a.y}`
}

export default function run() {
  const grid = data.split('\n').map(l => l.split(''))
  const width = grid[0].length
  const height = grid.length

  let guard = {x: 0, y: 0}
  let facing = 'n' as 'n' | 's' | 'e' | 'w'
  let movedTo = [] as string[]
  // let movedTo = new Set<{x: number, y: number}>()

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === '^') {
        guard.x = j
        guard.y = i
        break
      }
    }
  }

  // console.log(guard)
  movedTo.push(join(guard))
  let sanity = 100000

  while(sanity) {
    sanity--

    let nextPos = next(guard, facing)
    
    if (nextPos.x < 0 || nextPos.x >= width || nextPos.y < 0 || nextPos.y >= height) break

    if (grid[nextPos.y][nextPos.x] === '#') {
      if (facing === 'n') facing = 'e'
      else if (facing === 'e') facing = 's'
      else if (facing === 's') facing = 'w'
      else if (facing === 'w') facing = 'n'
      
      nextPos = next(guard, facing)
    }

    guard = nextPos
    if (!movedTo.includes(join(guard))) movedTo.push(join(guard))

    console.log(JSON.stringify(guard))
  }
  // console.log(movedTo)

  let text = ''
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (movedTo.includes(join({
        x: j,
        y: i
      }))) text += 'X'
      else grid[i][j] === '#' ? text += '#' : text += '.'
    }
    text += '\n'
  }

  console.log(text)



  return movedTo.length
}

console.log('result:', run())
