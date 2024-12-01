// const { default: data } = require("./file_input.txt");
const { default: data } = require("./file_test.txt");

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

    const works = directionsToCheck.every((d: keyof typeof directions) => {
      const next: [number, number] = [
        current[0] + directions[d][0],
        current[1] + directions[d][1],
      ];

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
        break;
      }
    }

    if (n === 0) {
      return;
    }

    return findTunnel(nextPos, nextPipe);
  }

  findTunnel(startingPoint, startingPointPipe);

  const cleanTunnel = new Array(...visitedTunnels).map((t: string) =>
    t.split(",").map((n: string) => parseInt(n))
  );

  // const minX = Math.min(...cleanTunnel.map((t) => t[1]));
  const minX = 0;
  // const maxX = Math.max(...cleanTunnel.map((t) => t[1]));
  const maxX = grid[0].length - 1;
  // const minY = Math.min(...cleanTunnel.map((t) => t[0]));
  const minY = 0;
  // const maxY = Math.max(...cleanTunnel.map((t) => t[0]));
  const maxY = grid.length - 1;

  // loop through all spots based on the min and max

  let enclosed = 0;
  for (let i = minY; i <= maxY; i++) {
    let line = "";
    let row = cleanTunnel.filter((t) => t[0] === i);
    for (let j = minX; j <= maxX; j++) {
      // how many tunnel spots are to the left of this spot

      if (visitedTunnels.has([i, j].join(","))) {
        line += "_";
      } else {
        const tunnelSpotsLeft = row.filter((t) => t[1] <= j);
        const tunnelSpotsRight = row.filter((t) => t[1] > j);
        console.log(
          grid[i][j],
          "tunnelSpotsLeft",
          tunnelSpotsLeft.length,
          tunnelSpotsLeft.length % 2,
          visitedTunnels.has([i, j].join(",")),
          "tunnelSpotsRight",
          tunnelSpotsRight.length
          // tunnelSpotsRight.length % 2
        );

        if (
          tunnelSpotsLeft.length % 2 ===
          0
          // tunnelSpotsRight.length % 2 === 0 ||
          // tunnelSpotsRight.length === 0 ||
        ) {
          line += "_";
        } else {
          // console.log("tunnelSpots", tunnelSpots);
          line += "X";
          enclosed++;
        }
      }

      // console.log("tunnelSpots", tunnelSpots);
    }
    console.log(line);
    console.log(
      grid[i]
        .map((x: string, j: number) => {
          if (visitedTunnels.has([i, j].join(","))) return x;
          return ".";
        })
        .join("")
    );
  }

  return enclosed;
}

console.log("result:", run());
