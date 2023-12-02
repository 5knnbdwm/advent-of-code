const { readFile } = require("fs/promises");

// const data = async () => {
//   return (await readFile("./input.txt")).toString();
// };
const data = async () => {
  return (await readFile("./test.txt")).toString();
};

let cleanTunnels = (lines) => {
  let tunnels = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    tunnels[line[0]] = {
      key: line[0],
      flow: Number(line[1]),
      open: Number(line[1]) === 0 ? true : false,
      c: line.slice(2),
    };
  }

  for (const key in tunnels) {
    for (let i = 0; i < tunnels[key].c.length; i++) {
      const conected = tunnels[key].c[i];
      tunnels[key].c[i] = tunnels[conected];
    }
  }
  return tunnels;
};

let getMoves = (tunnels, start, end, lookedAt = []) => {
  let current = tunnels[start]

  if (current.c.findIndex((item) => item.key === end) !== -1)
    return 1
  else {
    let lowest = 100
    let keys = current.c.map((item) => item.key)

    keys.forEach(item => {
      if (!lookedAt.includes(item)) {
        let res = getMoves(tunnels, item, end, [...lookedAt, ...keys])
        if (res < lowest)
          lowest = res
      }
    });

    return lowest + 1
  }
}

let checkRemaining = (tunnels, current, time) => {
  let relevant = {}

  for (const key in tunnels) {
    const item = tunnels[key];
    if (!item.open) {
      let g = getMoves(tunnels, 'AA', item.key)
      let h = (time - g - 1) * item.flow

      relevant[key] = {
        ...item,
        h,
        g: g + 1
      }
    }
  }

  for (const key in relevant) {
    const element = relevant[key];
    let tunnelsCopy = { ...tunnels }
    tunnelsCopy[key] = { ...tunnelsCopy[key], open: true }
    console.log(tunnelsCopy)
  }
}

(async () => {
  const file = await data();
  const lines = file.split("\n").map((item) => item.match(/[A-Z]{2}|(\d+)/g));

  let tunnels = cleanTunnels(lines);
okay
  let time = 30;


  console.log(checkRemaining(tunnels, 'AA', 30))
  // console.log(getMoves(tunnels, 'AA', 'GG'));
})();
