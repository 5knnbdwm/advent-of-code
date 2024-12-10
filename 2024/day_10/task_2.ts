const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

// const data = `.....0.
// ..4321.
// ..5..2.
// ..6543.
// ..7..4.
// ..8765.
// ..9....`

interface Point {
  x: number;
  y: number;
}

function join(p: Point) {
  return `${p.x},${p.y}`;
}

const adjacents = [
  {x: -1, y: 0},
  {x: 1, y: 0},
  {x: 0, y: -1},
  {x: 0, y: 1},
];

export default function run() {
  const grid = data.split('\n').map(line => line.split('').map(Number));
  let score = 0;

  const trailHeads = {} as { [key: string]: string[] };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // console.log(join({x: i, y: j}), grid[j][i]);
      if (grid[i][j] === 0) {
        let queue = [{x: i, y: j}] as Point[];
        let visited = [] as Point[]; 

        while (queue.length > 0) {
          const current = queue.shift() as Point;
          // console.log(join(current), grid[current.x][current.y], 'bfs', 'v:', JSON.stringify(visited.map(join)), 'q:', JSON.stringify(queue.map(join))); 
          visited.push(current);


          if (grid[current.x][current.y] === 9) {
            // console.log(join(current), grid[current.x][current.y]);
            if (!(join({x: i, y: j}) in trailHeads)) trailHeads[join({x: i, y: j})] = [];
            const currentTrail = trailHeads[join({x: i, y: j})];

            // if (!currentTrail.includes(join(current))) {
              currentTrail.push(join(current));
            // }
            continue;
          }
          
          for (const adjacent of adjacents) {
            const next = {x: current.x + adjacent.x, y: current.y + adjacent.y};
            const currentHeight = grid[current.x][current.y];

            if (next.x < 0 || next.x >= grid.length || next.y < 0 || next.y >= grid[0].length) continue;
            
            const nextHeight = grid?.[next.x]?.[next.y];
            // console.log(nextHeight, currentHeight);
            if (nextHeight !== undefined && nextHeight - 1 === currentHeight) {
              queue.push(next);
            }
          }
          // console.log(join(current), grid[current.x][current.y], 'bfs', 'v:', JSON.stringify(visited.map(join)), 'q:', JSON.stringify(queue.map(join))); 
        }
      }
    }
  }

  
  // console.log('trailHeads', trailHeads);
  Object.keys(trailHeads).forEach(key => {
    score += trailHeads[key].length;
  });

  return score
}

console.log('result:', run())
