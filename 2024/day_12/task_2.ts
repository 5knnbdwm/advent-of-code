const { default: data }: { default: string } = require("./file_input.txt");
// const { default: data }: { default: string } = require("./file_test.txt");

// const data = `EEEEE
// EXXXX
// EEEEE
// EXXXX
// EEEEE`;

const adjacents = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

type Point = {
  x: number;
  y: number;
};

function join(p: Point) {
  return `${p.x},${p.y}`;
}

function has(ps: Point[], p: Point) {
  return ps.map(join).includes(join(p));
}

export default function run() {
  const graph = data.split("\n").map((line) => line.split(""));
  const globalVisited = new Set<string>();
  let score = 0;

  const areas = {} as { [key: string]: Point[] };

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (globalVisited.has(join({ x: i, y: j }))) continue;
      const queue: Point[] = [{ x: i, y: j }];
      const visited = new Set<string>();
      const origin = { x: i, y: j };

      areas[join(origin)] = [origin];
      visited.add(join(origin));

      while (queue.length > 0) {
        const current = queue.shift()!;

        for (const adjacent of adjacents) {
          const next = {
            x: current.x + adjacent[0],
            y: current.y + adjacent[1],
          };

          if (
            next.x < 0 ||
            next.x >= graph.length ||
            next.y < 0 ||
            next.y >= graph[0].length
          )
            continue;

          const nextKey = join(next);
          if (visited.has(nextKey)) continue;

          if (graph[next.x][next.y] === graph[current.x][current.y]) {
            queue.push(next);
            visited.add(nextKey);
            areas[join(origin)].push(next);
          }
        }
      }

      visited.forEach((point) => globalVisited.add(point));
    }
  }

  for (const areaKey in areas) {
    // const areasKeySplit = areaKey.split(',').map(Number)
    // const letter = graph[areasKeySplit[0]][areasKeySplit[1]]
    // if (letter !== 'E') continue

    const horFences: { [key: number]: Point[] } = {};
    const verFences: { [key: number]: Point[] } = {};

    const horAdjacents = [
      [-1, 0],
      [1, 0],
    ] as const;
    const verAdjacents = [
      [0, -1],
      [0, 1],
    ] as const;

    for (const field of areas[areaKey]) {
      for (const adjacent of horAdjacents) {
        const next = {
          x: field.x + adjacent[0],
          y: field.y + adjacent[1],
        };

        if (!areas[areaKey].map(join).includes(join(next))) {
          if (!horFences[`${next.x},${field.x}`])
            horFences[`${next.x},${field.x}`] = [];
          horFences[`${next.x},${field.x}`].push(next);
        }
      }
    }

    for (const field of areas[areaKey]) {
      for (const adjacent of verAdjacents) {
        const next = {
          x: field.x + adjacent[0],
          y: field.y + adjacent[1],
        };

        if (!areas[areaKey].map(join).includes(join(next))) {
          if (!verFences[`${next.y},${field.y}`])
            verFences[`${next.y},${field.y}`] = [];
          verFences[`${next.y},${field.y}`].push(next);
        }
      }
    }

    let verFencesNum = 0;
    let horFencesNum = 0;

    for (const i in verFences) {
      let last: Point | undefined = undefined;
      const currentFences = verFences[i].sort((a, b) => a.x - b.x);
      // console.log('ver',i, currentFences.map(join))

      for (let j = 0; j < currentFences.length; j++) {
        const current = currentFences[j];
        if (!last) {
          verFencesNum++;
        } else if (current.x !== last.x + 1) {
          verFencesNum++;
        }
        last = current;
      }
    }

    for (const i in horFences) {
      let last: Point | undefined = undefined;
      const currentFences = horFences[i].sort((a, b) => a.y - b.y);
      // console.log('hor',i, currentFences.map(join))

      for (let j = 0; j < currentFences.length; j++) {
        const current = currentFences[j];
        if (!last) {
          horFencesNum++;
        } else if (current.y !== last.y + 1) {
          horFencesNum++;
        }
        last = current;
      }
    }

    // console.log('verFencesNum', verFencesNum)
    // console.log('horFencesNum', horFencesNum)

    const fencesNum = verFencesNum + horFencesNum;

    // console.log(letter, areas[areaKey].length, fencesNum, fencesNum * areas[areaKey].length)
    score += fencesNum * areas[areaKey].length;
  }

  return score;
}

console.log("result:", run());
