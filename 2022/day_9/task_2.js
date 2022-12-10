const { readFile } = require("fs/promises");

const data = async () => {
  return (await readFile("./input.txt")).toString();
};
// const data = async () => {
//   return (await readFile("./test.txt")).toString();
// };
// const data = async () => {
//   return (
//     "R 5\n" +
//     "U 8\n" +
//     "L 8\n" +
//     "D 3\n" +
//     "R 17\n" +
//     "D 10\n" +
//     "L 25\n" +
//     "U 20"
//   );
// };

const moveTail = (head, old, tail) => {
  const move = {
    x: head.x - old.x,
    y: head.y - old.y,
  };

  const relativePos = {
    x: old.x - tail.x,
    y: old.y - tail.y,
  };

  // top left
  if (relativePos.x === -1 && relativePos.y === 1) {
    if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += 0;
    } else if (move.x === -1 && move.y === 0) {
      tail.x += -1;
      tail.y += 1;
    } else if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    } else if (move.x === 0 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    } else if (move.x === 1 && move.y === 1) {
      tail.x += 0;
      tail.y += 1;
    }
  }
  // top
  if (relativePos.x === 0 && relativePos.y === 1) {
    if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    } else if (move.x === 0 && move.y === 1) {
      tail.x += 0;
      tail.y += 1;
    } else if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    }
  }
  // top right
  if (relativePos.x === 1 && relativePos.y === 1) {
    if (move.x === -1 && move.y === 1) {
      tail.x += 0;
      tail.y += 1;
    } else if (move.x === 0 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    } else if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    } else if (move.x === 1 && move.y === 0) {
      tail.x += 1;
      tail.y += 1;
    } else if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += 0;
    }
  }
  // right
  if (relativePos.x === 1 && relativePos.y === 0) {
    if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    } else if (move.x === 1 && move.y === 0) {
      tail.x += 1;
      tail.y += 0;
    } else if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    }
  }
  // bottom right
  if (relativePos.x === 1 && relativePos.y === -1) {
    if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 0;
    } else if (move.x === 1 && move.y === 0) {
      tail.x += 1;
      tail.y += -1;
    } else if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    } else if (move.x === 0 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    } else if (move.x === -1 && move.y === -1) {
      tail.x += 0;
      tail.y += -1;
    }
  }
  // bottom
  if (relativePos.x === 0 && relativePos.y === -1) {
    if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    } else if (move.x === 0 && move.y === -1) {
      tail.x += 0;
      tail.y += -1;
    } else if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    }
  }
  // bottom left
  if (relativePos.x === -1 && relativePos.y === -1) {
    if (move.x === 1 && move.y === -1) {
      tail.x += 0;
      tail.y += -1;
    } else if (move.x === 0 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    } else if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    } else if (move.x === -1 && move.y === 0) {
      tail.x += -1;
      tail.y += -1;
    } else if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 0;
    }
  }
  // left
  if (relativePos.x === -1 && relativePos.y === 0) {
    if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    } else if (move.x === -1 && move.y === 0) {
      tail.x += -1;
      tail.y += 0;
    } else if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    }
  }

  return tail;
};

const config = {
  xMax: 15,
  xMin: -11,
  yMax: 16,
  yMin: -5,
};

const printState = (tails, head) => {
  let print = "";
  for (let i = config.yMin; i < config.yMax; i++) {
    let line = "";
    for (let j = config.xMin; j < config.xMax; j++) {
      let char = ".";

      if (i === head.y && j === head.x) {
        char = "H";
      }

      for (let k = 0; k < tails.length; k++) {
        const element = tails[k];
        if (i === element.y && j === element.x && char === ".") char = k + 1;
      }

      if (i === 0 && j === 0 && char === ".") char = "s";

      line += char;
    }
    print = line + "\n" + print;
  }
  return print;
};

(async () => {
  const file = await data();
  const moves = file.split("\n");

  let head = { x: 0, y: 0 };

  let tailsNum = 9;
  let tails = [];

  for (let i = 0; i < tailsNum; i++) {
    tails.push({ x: 0, y: 0 });
  }

  let visited = ["0_0"];

  // console.log(printState(tails, head))

  for (let i = 0; i < moves.length; i++) {
    const [direction, amount] = moves[i].split(" ");

    // console.log('==', moves[i], '==\n')

    for (let j = 0; j < Number(amount); j++) {
      let old = { ...head };

      if (direction === "U") {
        head.y += 1;
      } else if (direction === "R") {
        head.x += 1;
      } else if (direction === "D") {
        head.y -= 1;
      } else if (direction === "L") {
        head.x -= 1;
      }

      let pre = head;

      for (let l = 0; l < tailsNum; l++) {
        tmpOld = { ...tails[l] };

        tails[l] = moveTail(pre, old, tails[l]);
        pre = tails[l];

        old = tmpOld;
      }

      if (
        !visited.includes(tails[tailsNum - 1].x + "_" + tails[tailsNum - 1].y)
      )
        visited.push(tails[tailsNum - 1].x + "_" + tails[tailsNum - 1].y);
    }
    // console.log(printState(tails, head))
  }
  console.log("result:", visited.length);
})();
