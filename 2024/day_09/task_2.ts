const { default: data }: { default: string } = require("./file_input.txt");
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const diskMap = data.split("").map(Number);
  let disk = [] as string[];
  let fileId = 0;
  let writeFile = true;
  const fileIdLength = {} as { [key: string]: number };

  for (let i = 0; i < diskMap.length; i++) {
    if (writeFile) {
      for (let j = 0; j < diskMap[i]; j++) {
        disk.push(fileId.toString());
      }
      fileIdLength[fileId] = diskMap[i];
      fileId += 1;
    } else {
      for (let j = 0; j < diskMap[i]; j++) {
        disk.push(".");
      }
    }

    writeFile = !writeFile;
  }

  let fileIdToCheck = fileId - 1;

  while (fileIdToCheck >= 0) {
    const lastIndex = disk.findIndex((val) => val === fileIdToCheck.toString());
    const fileLength = fileIdLength[fileIdToCheck.toString()];
    let indexOfFreeSpace = -1;
    for (let i = 0; i < lastIndex; i++) {
      let spaces = 0;

      for (let j = i; j < lastIndex; j++) {
        if (disk[j] === ".") {
          spaces++;
        } else {
          break;
        }
      }

      if (spaces >= fileLength) {
        indexOfFreeSpace = i;
        break;
      }
    }

    if (indexOfFreeSpace !== -1) {
      for (let i = 0; i < fileLength; i++) {
        const tmp = disk[indexOfFreeSpace + i];
        disk[indexOfFreeSpace + i] = disk[lastIndex + i];
        disk[lastIndex + i] = tmp;
      }
    }

    fileIdToCheck--;
  }

  return disk
    .map((val, index) => (val !== "." ? Number(val) * index : 0))
    .reduce((a, b) => a + b, 0);
}

console.log("result:", run());
