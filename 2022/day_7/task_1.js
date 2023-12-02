const { readFile } = require("fs/promises");

// const data = async () => {
//   return (await readFile("./input.txt")).toString();
// };
const data = async () => {
  return (await readFile("./test.txt")).toString();
};

const resolveSize = (currentDir, dirSize, dirStructure) => {
  let size = dirSize[currentDir]

  for (let i = 0; i < dirStructure[currentDir].length; i++) {
    const dirChild = dirStructure[currentDir][i];
    if (dirChild in dirStructure) {
      const tmp = resolveSize(dirChild, dirSize, dirStructure)
      size += tmp
      console.log(dirChild, tmp)

    }
  }


  return size
}

(async () => {
  const file = await data();

  const lines = file.split("\n");

  let dirSize = { "/": 0 };
  let currentDir = "/";
  let currentDirLevel = 0;
  let dirParents = { "/": [] };


  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lineParts = lines[i].split(" ");

    if (/^\$ cd/.test(line)) {
      // is command

      if (lineParts[2] === "..") {
        currentDirLevel -= 1;

        if (currentDirLevel === 0) {
          currentDir = "/";
        }
      } else {

        if (!(currentDir in dirParents))
          dirParents[currentDir] = []

        dirParents[currentDir].push(lineParts[2])

        currentDir = lineParts[2];
        currentDirLevel += 1;
      }
    } else if (/^\d/.test(line)) {
      // is create file

      if (dirSize[currentDir] === undefined) dirSize[currentDir] = 0;
      dirSize[currentDir] += Number(lineParts[0]);
    }
  }


  // let result = 0

  // for (const key in dirSize) {
  //   const element = dirSize[key];

  //   if (element < 100000 && result < element)
  //     result = element

  // }

  // console.log(dirSize);
  // console.log(dirParents);
  // console.log('');
  // console.log('result:', result);
})();
