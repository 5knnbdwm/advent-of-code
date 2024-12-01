const {default: data} = require('./file_input.txt');
// const {default: data} = require('./file_test_2.txt');

export default function run() {
  let [instruction, _, ...nodesText] = data.split('\n')
  nodesText.pop()

  instruction = instruction.split('')

  const nodes: Record<string, [string, string]> = {}
  nodesText.forEach((n: string) => {
    const [key, arg] = n.split(' = ')
    nodes[key] = [arg.substring(1, arg.length - 1).split(', ')[0], arg.substring(1, arg.length - 1).split(', ')[1]]
  })

  let result = 0
  let currentNodes: string[] = Object.keys(nodes).filter((n) => n.endsWith('A'))


  console.log(currentNodes)

  loop: while (true) {
    for (const ins of instruction) {
      if (ins === 'R') {
        currentNodes[0] = nodes[currentNodes[0]][1]
        currentNodes[1] = nodes[currentNodes[1]][1]
        currentNodes[2] = nodes[currentNodes[2]][1]
        currentNodes[3] = nodes[currentNodes[3]][1]
        currentNodes[4] = nodes[currentNodes[4]][1]
        currentNodes[5] = nodes[currentNodes[5]][1]
      } else {
        currentNodes[0] = nodes[currentNodes[0]][0]
        currentNodes[1] = nodes[currentNodes[1]][0]
        currentNodes[2] = nodes[currentNodes[2]][0]
        currentNodes[3] = nodes[currentNodes[3]][0]
        currentNodes[4] = nodes[currentNodes[4]][0]
        currentNodes[5] = nodes[currentNodes[5]][0]
      }
      result++

      if (
        currentNodes[0].endsWith('Z') &&
        currentNodes[1].endsWith('Z') &&
        currentNodes[2].endsWith('Z') &&
        currentNodes[3].endsWith('Z') &&
        currentNodes[4].endsWith('Z') &&
        currentNodes[5].endsWith('Z')
      ) break loop

      if (result % 10_000_000 === 0)
        console.log('step:', result)
    }
  }
  return result
}

console.log('result:', run())

