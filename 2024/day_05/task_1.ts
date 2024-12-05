const {default: data}: {default: string} = require('./file_input.txt');
// const {default: data}: {default: string} = require('./file_test.txt');

export default function run() {
  const rules = data.split('\n\n')[0].split('\n')
  const sets = data.split('\n\n')[1].split('\n').map(l => l.split(',').map(Number))

  let score = 0

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i]
    let valid = true
    
    for (let j = 0; j < set.length; j++) {
      const position = set[j]
      const afterRules = set.filter((x, i) => i !== j).map(n => `${position}|${n}`).filter(r => rules.includes(r))
      const beforeRules = set.filter((x, i) => i !== j).map(n => `${n}|${position}`).filter(r => rules.includes(r))
      
      const afterNumbers = set.slice(j+1, set.length)
      const beforeNumbers = set.slice(0, j)

      for (let a = 0; a < afterRules.length; a++) {
        const rule = afterRules[a].split('|').map(Number)
        if (valid && !afterNumbers.includes(rule[1])) valid = false
      }
      for (let b = 0; b < beforeRules.length; b++) {
        const rule = beforeRules[b].split('|').map(Number)
        if (valid && !beforeNumbers.includes(rule[0])) valid = false
      }
      
    }

    // if (valid) console.log(set, valid,set.length/2-.5, set[set.length/2-.5])
    score += valid ? set[set.length/2-.5] : 0
  }

  return score
}

console.log('result:', run())
