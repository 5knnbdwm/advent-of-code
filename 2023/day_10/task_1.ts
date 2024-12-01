const { default: data } = require("./file_input.txt");
// const { default: data } = require("./file_test.txt");

export default function run() {
  const grid = data.split("\n").map((l: string) => l.split(""));

  let startingPoint = [0, 0] as [number, number];
  let startingPointPipe = "|" as Exclude<PossibleChars, "." | "S">;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const element = grid[i][j];
      if (element === "S") {
        startingPoint = [i, j];
      }
    }
  }

  type PossibleChars = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

  const pipes = {
    "|": { up: true, down: true, left: false, right: false },
    "-": { up: false, down: false, left: true, right: true },
    L: { up: true, down: false, left: false, right: true },
    J: { up: true, down: false, left: true, right: false },
    "7": { up: false, down: true, left: true, right: false },
    F: { up: false, down: true, left: false, right: true },
  } as Record<
    PossibleChars,
    { up: boolean; down: boolean; left: boolean; right: boolean }
  >;

  const directions = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  function pipesConnect(
    current: [number, number],
    connecting: [number, number],
    startingReplacement: Exclude<PossibleChars, ".">
  ): boolean {
    if (current[0] < 0 || current[1] < 0) return false;
    if (current[0] >= grid.length || current[1] >= grid[0].length) return false;
    if (connecting[0] < 0 || connecting[1] < 0) return false;
    if (connecting[0] >= grid.length || connecting[1] >= grid[0].length)
      return false;

    // check if they are next to each other
    if (
      Math.abs(current[0] - connecting[0]) +
        Math.abs(current[1] - connecting[1]) !==
      1
    )
      return false;

    let currentPipe: Exclude<PossibleChars, "."> = grid[current[0]][current[1]];
    let connectingPipe: PossibleChars = grid[connecting[0]][connecting[1]];

    if (connectingPipe === ".") return false;

    if (currentPipe === "S")
      currentPipe = startingReplacement as Exclude<PossibleChars, "." | "S">;
    if (connectingPipe === "S") connectingPipe = startingReplacement;

    if (pipes[currentPipe].up && pipes[connectingPipe].down) return true;
    if (pipes[currentPipe].down && pipes[connectingPipe].up) return true;
    if (pipes[currentPipe].left && pipes[connectingPipe].right) return true;
    if (pipes[currentPipe].right && pipes[connectingPipe].left) return true;

    return false;
  }

  for (let i = 0; i < Object.keys(pipes).length; i++) {
    const pipe = Object.keys(pipes)[i] as Exclude<PossibleChars, "." | "S">;

    const current = startingPoint;
    // check all directions that the pipe can connect to

    const directionsToCheck: any = Object.keys(pipes[pipe]).filter(
      (d) => pipes[pipe][d as keyof (typeof pipes)[typeof pipe]]
    );

    // console.log(pipe, directionsToCheck);
    const works = directionsToCheck.every((d: keyof typeof directions) => {
      const next: [number, number] = [
        current[0] + directions[d][0],
        current[1] + directions[d][1],
      ];
      // console.log(
      //   d,
      //   current,
      //   directions[d],
      //   next,
      //   pipesConnect(current, next, pipe)
      // );

      return pipesConnect(current, next, pipe);
    });

    if (works) {
      startingPointPipe = pipe;
      grid[startingPoint[0]][startingPoint[1]] = pipe;
      break;
    }
  }

  const tunnel: {
    pos: [number, number];
    pipe: Exclude<PossibleChars, "." | "S">;
  }[] = [
    {
      pos: startingPoint,
      pipe: startingPointPipe,
    },
  ];

  const visitedTunnels = new Set<string>();
  visitedTunnels.add(startingPoint.join(","));

  let n = 10;
  function findTunnel(
    nextPos: [number, number],
    nextPipe: Exclude<PossibleChars, "." | "S">
  ) {
    const currentPipe = grid[nextPos[0]][nextPos[1]];
    // console.log("currentPipe", currentPipe);

    const nextDirections = Object.keys(pipes[nextPipe]).filter(
      (d) => pipes[nextPipe][d as keyof (typeof pipes)[typeof nextPipe]]
    );

    let n = 0;

    for (let i = 0; i < nextDirections.length; i++) {
      const d = nextDirections[i] as keyof typeof directions;
      const next: [number, number] = [
        nextPos[0] + directions[d][0],
        nextPos[1] + directions[d][1],
      ];

      if (visitedTunnels.has(next.join(","))) continue;

      n++;

      if (grid[next[0]][next[1]] !== ".") {
        nextPipe = grid[next[0]][next[1]] as Exclude<PossibleChars, "." | "S">;
        nextPos = next;
        visitedTunnels.add(next.join(","));
        // console.log("nextPipe", nextPipe);
        break;
      }
    }

    if (n === 0) {
      return;
    }

    return findTunnel(nextPos, nextPipe);
    // return { nextPos, nextPipe };
  }

  // console.log("tunnel", tunnel);
  // console.log("visitedTunnels", visitedTunnels);
  // console.log("findTunnel", findTunnel(startingPoint, startingPointPipe));

  findTunnel(startingPoint, startingPointPipe);
  // visitedTunnel set to array

  return new Array(...visitedTunnels).length / 2;
}

console.log("result:", run());
