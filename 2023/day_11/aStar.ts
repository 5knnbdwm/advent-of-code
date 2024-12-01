// source: OpenAI

interface Point {
  x: number;
  y: number;
}

interface Node {
  point: Point;
  gScore: number;
  hScore: number;
  fScore: number;
  parent?: Node;
}

function euclideanDistance(pointA: Point, pointB: Point): number {
  return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2);
}

function reconstructPath(currentNode: Node): Point[] {
  const path: Point[] = [];
  let current: Node | undefined = currentNode;
  while (current !== undefined) {
    path.unshift(current.point);
    current = current.parent;
  }
  return path;
}

export function aStar(points: Point[], start: Point, end: Point): Point[] {
  const openSet: Node[] = [];
  const closedSet: Node[] = [];

  const startNode: Node = {
    point: start,
    gScore: 0,
    hScore: euclideanDistance(start, end),
    fScore: 0 + euclideanDistance(start, end),
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.fScore - b.fScore);
    const current: Node = openSet.shift()!;

    if (current.point.x === end.x && current.point.y === end.y) {
      return reconstructPath(current);
    }

    closedSet.push(current);

    const neighbors = points.filter((point) => {
      return (
        Math.abs(point.x - current.point.x) <= 1 &&
        Math.abs(point.y - current.point.y) <= 1 &&
        !(point.x === current.point.x && point.y === current.point.y)
      );
    });

    console.log("neighbors:", neighbors);

    for (const neighbor of neighbors) {
      const gScore = current.gScore + 1; // assuming unit cost for each step
      const hScore = euclideanDistance(neighbor, end);
      const fScore = gScore + hScore;

      const existingNode = closedSet.find(
        (node) => node.point.x === neighbor.x && node.point.y === neighbor.y
      );
      if (existingNode && gScore >= existingNode.gScore) {
        continue;
      }

      const openSetNode = openSet.find(
        (node) => node.point.x === neighbor.x && node.point.y === neighbor.y
      );
      if (!openSetNode || gScore < openSetNode.gScore) {
        const newNode: Node = {
          point: neighbor,
          gScore,
          hScore,
          fScore,
          parent: current,
        };
        if (!openSetNode) {
          openSet.push(newNode);
        } else {
          openSetNode.gScore = gScore;
          openSetNode.hScore = hScore;
          openSetNode.fScore = fScore;
          openSetNode.parent = current;
        }
      }
    }
  }

  return [];
}
