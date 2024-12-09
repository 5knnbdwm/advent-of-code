const { default: data }: { default: string } = require("./file_input.txt");
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const diskMap = data.split("").map(Number);
  let disk = [] as string[];
  let fileId = 0;
  let writeFile = true;

  for (let i = 0; i < diskMap.length; i++) {
    if (writeFile) {
      for (let j = 0; j < diskMap[i]; j++) {
        disk.push(fileId.toString());
      }
      fileId += 1;
    } else {
      for (let j = 0; j < diskMap[i]; j++) {
        disk.push(".");
      }
    }

    writeFile = !writeFile;
  }

  let firstIndex = 0;
  let lastIndex = disk.length - 1;

  while (firstIndex !== disk.length -1) {
    while (disk[firstIndex] !== ".") firstIndex++
    while (disk[lastIndex] === ".") lastIndex--;
    if (firstIndex > lastIndex) break;

    const tmp = disk[firstIndex];
    disk[firstIndex] = disk[lastIndex];
    disk[lastIndex] = tmp;
  }

  // console.log(disk.join("").replace(/\.*$/, ''));

  const score = disk
    .map((val, index) => (val !== "." ? Number(val) * index : 0))
    .reduce((a, b) => a + b, 0);

  return score;
}

console.log("result:", run());