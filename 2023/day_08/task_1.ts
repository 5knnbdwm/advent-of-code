const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test.txt');

export default function run() {
  let [instruction, _, ...nodesText] = data.split('\n')
  nodesText.pop()

  const nodes: Record<string, [string, string]> = {}
  let currentNode = 'AAA'
  nodesText.forEach((n:string) => {
    const [key, arg] = n.split(' = ')
    nodes[key] = [arg.substring(1, arg.length - 1).split(', ')[0],arg.substring(1, arg.length - 1).split(', ')[1]]
  })

  let result = 0

  loop: while(true) {
    for (const ins of instruction.split('')) {
      if (ins === 'R') {
        currentNode = nodes[currentNode][1]
      } else if (ins === 'L') {
        currentNode = nodes[currentNode][0]
      }
      console.log(currentNode)
      result++
      if (currentNode === 'ZZZ') {
        break loop
      }
    }
  }

  return result
}

console.log('result:', run())

