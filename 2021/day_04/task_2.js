const { keys, boards } = require('./input.json');
// const { keys, boards } = require('./test.json');

let winning_boards = []

function checkVertical(board) {
  let tmp = true

  for (let i = 0; i < 5; i += 1) {
    tmp = true

    for (let j = 0; j < 5; j += 1) {
      if (tmp && !board[i + j * 5]) {
        tmp = false
      }
    }
    if (tmp) { return tmp }
  }
  return tmp
}
function checkHorizontal(board) {
  let tmp = true

  for (let i = 0; i < 5; i += 1) {
    tmp = true

    for (let j = 0; j < 5; j += 1) {
      if (tmp && !board[i * 5 + j]) {
        tmp = false
      }
    }
    if (tmp) { return tmp }
  }
  return tmp
}

function checkBoard(board) {
  if (checkVertical(board)) { return true }
  if (checkHorizontal(board)) { return true }
  return false
}

function keyBoard(board, keys) {
  let keyed = []

  for (let i = 0; i < board.length; i += 1) {
    if (keys.includes(board[i])) {
      keyed[i] = true
    } else {
      keyed[i] = false
    }
  }
  return keyed
}

outer:
for (let i = 0; i < keys.length; i += 1) {
  const some_keys = keys.slice(0, i);

  for (let j = 0; j < boards.length; j += 1) {
    const board = boards[j];
    const keyed_board = keyBoard(board, some_keys)

    if (checkBoard(keyed_board)) {
      const unmarked = board.filter((item) => !some_keys.includes(item))
      let sum = 0

      for (let m = 0; m < unmarked.length; m += 1) {
        sum += unmarked[m]
      }

      if (winning_boards.findIndex((item) => item.board === j) === -1) {
        winning_boards.push({
          "board": j,
          "sum": sum,
          "keys": some_keys,
          "solved_by": i,
          "solution": sum * some_keys[i - 1]
        })
      }
    }
  }
}

console.log(winning_boards)
console.log(winning_boards[winning_boards.length - 1].solution)