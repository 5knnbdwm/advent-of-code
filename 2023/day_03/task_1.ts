const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

const adjacents = [
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: -1},
  {x: -1, y: 0},
  // {x: 0, y: 0},
  {x: 1, y: 0},
  {x: -1, y: 1},
  {x: 0, y: 1},
  {x: 1, y: 1},
]

export default function run() {
  let numbers = [] as {
    key: string,
    row: number,
    col: number[],
    value: number
  }[];
  let result = 0;
  const lines = data.split('\n');

  function getNumber(x: number, y: number) {
    return numbers.find(n => n.row === x && n.col.includes(y));
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineChars = line.split('');

    let group = undefined as { key: string, col: number[], value: string } | undefined;

    for (let j = 0; j < lineChars.length; j++) {
      const char = lineChars[j];
      if (group === undefined && char.match(/\d/)) {
        // console.log('found number', char);
        group = {key: (Math.random()).toString(36).substring(2, 7), col: [j], value: char};
      } else if (group !== undefined && char.match(/\d/)) {
        // console.log('add', char, group);
        group.col.push(j);
        group.value += char;
      } else if (group !== undefined && !char.match(/\d/)) {
        // console.log('end', char, group);
        numbers.push({
          row: i,
          ...group,
          value: Number(group.value),
        });
        group = undefined;
      }
    }

    if (group !== undefined) {
      // console.log('end', group);
      numbers.push({
        row: i,
        ...group,
        value: Number(group.value),
      });
    }
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char.match(/[^\d.]/)) {
        let tmp = [] as string[]
        for (const adjacent of adjacents) {
          const number = getNumber(i + adjacent.x, j + adjacent.y);

          if (number !== undefined && !tmp.includes(number.key)) {
            tmp.push(number.key);
            result += number.value;
          }
        }
      }
    }
  }

  return result;
}

console.log('result:', run());
