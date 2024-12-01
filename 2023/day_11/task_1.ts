// const {default: data} = require('./file_input.txt');
const { default: data } = require("./file_test.txt");

import { aStar } from "./aStar";
import { Graph } from "./dij";

function printGrid(grid: string[][]) {
  let print = "";

  for (let i = 0; i < grid.length; i++) {
    let row = "";
    for (let j = 0; j < grid[i].length; j++) {
      row += grid[i][j];
    }
    // console.log(row);
    print += "\n" + row;
  }
  return print;
}

function transpose(matrix: string[][]) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

export default function run() {
  let gridSmall: string[][] = data
    .split("\n")
    .map((row: string) => row.split(""));

  // console.log("gridSmall:", printGrid(gridSmall), gridSmall.length);
  // loop through every row
  for (let i = 0; i < gridSmall.length; i++) {
    const row = gridSmall[i];
    if (row.every((c) => c === ".")) {
      gridSmall.splice(i, 0, row);
      i++;
    }
  }

  // console.log("gridSmall:", printGrid(gridSmall), gridSmall.length);

  gridSmall = transpose(gridSmall);
  // loop through every row
  for (let i = 0; i < gridSmall.length; i++) {
    const row = gridSmall[i];
    if (row.every((c) => c === ".")) {
      gridSmall.splice(i, 0, row);
      i++;
    }
  }
  gridSmall = transpose(gridSmall);

  const points: {
    x: number;
    y: number;
  }[] = [];

  for (let i = 0; i < gridSmall.length; i++) {
    for (let j = 0; j < gridSmall[i].length; j++) {
      if (gridSmall[i][j] === "#") {
        points.push({ x: i, y: j });
      }
    }
  }

  // const graph = new Graph(points.length);

  // for (let i = 0; i < points.length; i++) {
  //   for (let j = i + 1; j < points.length; j++) {
  //     const distance =
  //       Math.abs(points[i].x - points[j].x) +
  //       Math.abs(points[i].y - points[j].y);
  //     graph.addEdge(i, j, distance);
  //   }
  // }

  // const distances = graph.dijkstra(0);
  // console.log("distances:", distances);

  // gridSmall = transpose(gridSmall);
  // gridLarger = transpose(gridLarger);

  interface Point {
    x: number;
    y: number;
  }

  interface Path {
    from: Point;
    to: Point;
    distance: number;
  }

  function manhattanDistance(p1: Point, p2: Point): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  function computeShortestPaths(points: Point[]): Path[] {
    const numPoints = points.length;
    const graph = new Graph(numPoints);

    // Add edges between all pairs of points with Manhattan distance as weight
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const weight = manhattanDistance(points[i], points[j]);
        graph.addEdge(i, j, weight);
      }
    }

    // Compute shortest paths between all pairs of points
    const allPaths = graph.allShortestPaths();

    // Convert shortest paths to Path objects
    const paths: Path[] = [];
    allPaths.forEach((distances, from) => {
      distances.forEach((distance, to) => {
        if (from !== to) {
          paths.push({
            from: points[from],
            to: points[to],
            distance: distance,
          });
        }
      });
    });

    return paths;
  }

  console.log("points:", points);
  console.log("computeShortestPaths:", computeShortestPaths(points));
}

console.log("result:", run());
