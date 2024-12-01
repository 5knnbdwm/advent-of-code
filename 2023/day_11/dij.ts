export class Graph {
  private vertices: number;
  private adjacencyList: Map<number, [number, number][]>;

  constructor(vertices: number) {
    this.vertices = vertices;
    this.adjacencyList = new Map();
    for (let i = 0; i < vertices; i++) {
      this.adjacencyList.set(i, []);
    }
  }

  addEdge(u: number, v: number, weight: number) {
    this.adjacencyList.get(u)?.push([v, weight]);
    this.adjacencyList.get(v)?.push([u, weight]); // If the graph is undirected
  }

  dijkstra(start: number): Map<number, number> {
    const distances = new Map<number, number>();
    const visited = new Set<number>();
    const pq = new PriorityQueue<number>();

    // Initialize distances
    for (let i = 0; i < this.vertices; i++) {
      distances.set(i, Infinity);
    }
    distances.set(start, 0);

    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
      const [u, dist] = pq.dequeue();

      visited.add(u);

      const neighbors = this.adjacencyList.get(u);
      if (neighbors) {
        for (const [v, weight] of neighbors) {
          if (!visited.has(v)) {
            const newDist = dist + weight;
            if (newDist < (distances.get(v) ?? Infinity)) {
              distances.set(v, newDist);
              pq.enqueue(v, newDist);
            }
          }
        }
      }
    }

    return distances;
  }

  allShortestPaths(): Map<number, Map<number, number>> {
    const allPaths = new Map<number, Map<number, number>>();
    for (let i = 0; i < this.vertices; i++) {
      allPaths.set(i, this.dijkstra(i));
    }
    return allPaths;
  }
}

class PriorityQueue<T> {
  private heap: [T, number][]; // [element, priority]

  constructor() {
    this.heap = [];
  }

  enqueue(element: T, priority: number) {
    this.heap.push([element, priority]);
    this.heapifyUp();
  }

  dequeue(): [T, number] | undefined {
    if (this.isEmpty()) return undefined;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (end !== undefined && this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown();
    }
    return max;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private heapifyUp() {
    let index = this.heap.length - 1;
    const [element, priority] = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (priority >= this.heap[parentIndex][1]) break;
      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
    }
    this.heap[index] = [element, priority];
  }

  private heapifyDown() {
    let index = 0;
    const [element, priority] = this.heap[index];
    const length = this.heap.length;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChildPriority, rightChildPriority;
      let swapIndex = null;

      if (leftChildIndex < length) {
        leftChildPriority = this.heap[leftChildIndex][1];
        if (leftChildPriority < priority) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChildPriority = this.heap[rightChildIndex][1];
        if (
          (swapIndex === null && rightChildPriority < priority) ||
          (swapIndex !== null && rightChildPriority < leftChildPriority)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      this.heap[index] = this.heap[swapIndex];
      index = swapIndex;
    }
    this.heap[index] = [element, priority];
  }
}

// // Example usage
// const grid = new Graph(6);
// grid.addEdge(0, 1, 4);
// grid.addEdge(0, 2, 2);
// grid.addEdge(1, 2, 1);
// grid.addEdge(1, 3, 5);
// grid.addEdge(2, 3, 8);
// grid.addEdge(2, 4, 10);
// grid.addEdge(3, 4, 2);
// grid.addEdge(3, 5, 6);
// grid.addEdge(4, 5, 3);

// const start = 0;
// const distances = grid.dijkstra(start);
