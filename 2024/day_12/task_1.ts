const { default: data }: { default: string } = require("./file_input.txt");
// const {default: data}: {default: string} = require('./file_test.txt');

// const data = `AAAA
// BBCD
// BBCC
// EEEC`

//  1  procedure BFS(G, root) is
//  2      let Q be a queue
//  3      label root as explored
//  4      Q.enqueue(root)
//  5      while Q is not empty do
//  6          v := Q.dequeue()
//  7          if v is the goal then
//  8              return v
//  9          for all edges from v to w in G.adjacentEdges(v) do
// 10              if w is not labeled as explored then
// 11                  label w as explored
// 12                  w.parent := v
// 13                  Q.enqueue(w)

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

  // console.log(areas.length);

  for (const areaKey in areas) {
    let fencing = 0;

    // console.log(areaKey, areas[areaKey].map(join))
    for (const field of areas[areaKey]) {
      // console.log(join(field))
      for (const adjacent of adjacents) {
        const next = {
          x: field.x + adjacent[0],
          y: field.y + adjacent[1],
        };

        if (!areas[areaKey].map(join).includes(join(next))) {
          // console.log(join(next), areas[areaKey].map(join) )
          fencing++;
        }
      }
    }
    // console.log("fencing", areaKey, areas[areaKey].length, fencing);

    score += fencing * areas[areaKey].length;
  }

  return score;
}

console.log("result:", run());
