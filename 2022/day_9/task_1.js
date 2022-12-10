const { readFile } = require("fs/promises");

// const data = async () => {
//   return (await readFile("./input.txt")).toString();
// };
const data = async () => {
  return (await readFile("./test.txt")).toString();
};

// const moveTail = (head, oldHead, tail) => {
//   const move = {
//     x: head.x - oldHead.x,
//     y: head.y - oldHead.y,
//   };

//   const relativePos = {
//     x: oldHead.x - tail.x,
//     y: oldHead.y - tail.y,
//   };

//   // moving up
//   if (
//     relativePos.x === -1 &&
//     relativePos.y === 1 &&
//     move.x === 0 &&
//     move.y === 1
//   ) {
//     tail.y += 1;
//     tail.x -= 1;
//   } else if (
//     relativePos.x === 0 &&
//     relativePos.y === 1 &&
//     move.x === 0 &&
//     move.y === 1
//   ) {
//     tail.y += 1;
//   } else if (
//     relativePos.x === 1 &&
//     relativePos.y === 1 &&
//     move.x === 0 &&
//     move.y === 1
//   ) {
//     tail.y += 1;
//     tail.x += 1;
//   }
//   // moving right
//   else if (
//     relativePos.x === 1 &&
//     relativePos.y === 1 &&
//     move.x === 1 &&
//     move.y === 0
//   ) {
//     tail.y += 1;
//     tail.x += 1;
//   } else if (
//     relativePos.x === 1 &&
//     relativePos.y === 0 &&
//     move.x === 1 &&
//     move.y === 0
//   ) {
//     tail.x += 1;
//   } else if (
//     relativePos.x === 1 &&
//     relativePos.y === -1 &&
//     move.x === 1 &&
//     move.y === 0
//   ) {
//     tail.y -= 1;
//     tail.x += 1;
//   }
//   // moving down
//   else if (
//     relativePos.x === 1 &&
//     relativePos.y === -1 &&
//     move.x === 0 &&
//     move.y === -1
//   ) {
//     tail.y -= 1;
//     tail.x += 1;
//   } else if (
//     relativePos.x === 0 &&
//     relativePos.y === -1 &&
//     move.x === 0 &&
//     move.y === -1
//   ) {
//     tail.y -= 1;
//   } else if (
//     relativePos.x === -1 &&
//     relativePos.y === -1 &&
//     move.x === 0 &&
//     move.y === -1
//   ) {
//     tail.y -= 1;
//     tail.x -= 1;
//   }
//   // moving left
//   else if (
//     relativePos.x === -1 &&
//     relativePos.y === -1 &&
//     move.x === -1 &&
//     move.y === 0
//   ) {
//     tail.y -= 1;
//     tail.x -= 1;
//   } else if (
//     relativePos.x === -1 &&
//     relativePos.y === 0 &&
//     move.x === -1 &&
//     move.y === 0
//   ) {
//     tail.x -= 1;
//   } else if (
//     relativePos.x === -1 &&
//     relativePos.y === 1 &&
//     move.x === -1 &&
//     move.y === 0
//   ) {
//     tail.y += 1;
//     tail.x -= 1;
//   }

//   return tail;
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
    }

    else if (move.x === -1 && move.y === 0) {
      tail.x += -1;
      tail.y += 1;
    }

    else if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    }

    else if (move.x === 0 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    }

    else if (move.x === 1 && move.y === 1) {
      tail.x += 0;
      tail.y += 1;
    }
  }
  // top
  if (relativePos.x === 0 && relativePos.y === 1) {
    if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    }

    else if (move.x === 0 && move.y === 1) {
      tail.x += 0;
      tail.y += 1;
    }

    else if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    }
  }
  // top right
  if (relativePos.x === 1 && relativePos.y === 1) {
    if (move.x === -1 && move.y === 1) {
      tail.x += 0;
      tail.y += 1;
    }

    else if (move.x === 0 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    }

    else if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    }

    else if (move.x === 1 && move.y === 0) {
      tail.x += 1;
      tail.y += 1;
    }

    else if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += 0;
    }
  }
  // right
  if (relativePos.x === 1 && relativePos.y === 0) {
    if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 1;
    }

    else if (move.x === 1 && move.y === 0) {
      tail.x += 1;
      tail.y += 0;
    }

    else if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    }
  }
  // bottom right
  if (relativePos.x === 1 && relativePos.y === -1) {
    if (move.x === 1 && move.y === 1) {
      tail.x += 1;
      tail.y += 0;
    }

    else if (move.x === 1 && move.y === 0) {
      tail.x += 1;
      tail.y += -1;
    }

    else if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    }

    else if (move.x === 0 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    }

    else if (move.x === -1 && move.y === -1) {
      tail.x += 0;
      tail.y += -1;
    }
  }
  // bottom
  if (relativePos.x === 0 && relativePos.y === -1) {
    if (move.x === 1 && move.y === -1) {
      tail.x += 1;
      tail.y += -1;
    }

    else if (move.x === 0 && move.y === -1) {
      tail.x += 0;
      tail.y += -1;
    }

    else if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    }
  }
  // bottom left
  if (relativePos.x === -1 && relativePos.y === -1) {
    if (move.x === 1 && move.y === -1) {
      tail.x += 0;
      tail.y += -1;
    }

    else if (move.x === 0 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    }

    else if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    }

    else if (move.x === -1 && move.y === 0) {
      tail.x += -1;
      tail.y += -1;
    }

    else if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 0;
    }
  }
  // left
  if (relativePos.x === -1 && relativePos.y === 0) {
    if (move.x === -1 && move.y === -1) {
      tail.x += -1;
      tail.y += -1;
    }

    else if (move.x === -1 && move.y === 0) {
      tail.x += -1;
      tail.y += 0;
    }

    else if (move.x === -1 && move.y === 1) {
      tail.x += -1;
      tail.y += 1;
    }
  }

  return tail;
};

const printState = (tail, head) => {
  let print = ''
  for (let k = 0; k < 5; k++) {
    let line = ''
    for (let l = 0; l < 6; l++) {
      if (k === head.y && l === head.x) {
        line += 'H'
      }
      else if (k === tail.y && l === tail.x) {
        line += 'T'
      }
      else line += '.'
    }
    print = line + '\n' + print
  }
  console.log(print)
}

(async () => {
  const file = await data();
  const moves = file.split("\n");

  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };

  let visited = ['0_0'];

  printState(tail, head)

  for (let i = 0; i < moves.length; i++) {
    const [direction, amount] = moves[i].split(" ");

    console.log('==', moves[i], '==\n')

    for (let j = 0; j < Number(amount); j++) {
      const oldHead = { ...head };

      if (direction === "U") {
        head.y += 1;
      } else if (direction === "R") {
        head.x += 1;
      } else if (direction === "D") {
        head.y -= 1;
      } else if (direction === "L") {
        head.x -= 1;
      }

      tail = moveTail(head, oldHead, tail);

      printState(tail, head)

      if (!visited.includes(tail.x + '_' + tail.y))
        visited.push(tail.x + '_' + tail.y)
    }
  }
  console.log('result:', visited.length)
})();
