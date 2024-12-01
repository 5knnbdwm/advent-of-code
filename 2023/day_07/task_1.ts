const {default: dataInput} = require('./file_input.txt');
const {default: dataTest} = require('./file_test.txt');

const reverse = -1 // -1 true 1 false

const type = (cards: string) => {
  const letters = [...new Set(cards.split(''))]

  const getAmount = (letter: string) => {
    return cards.split('').filter((card: string) => card === letter).length
  }

  if (letters.length === 1) {
    // all the same
    return 6
  } else if (letters.length === 2 && (getAmount(letters[0]) === 4 || getAmount(letters[1]) === 4)) {
    // four of a kind
    return 5
  } else if (letters.length === 2 && ((getAmount(letters[0]) === 3 && getAmount(letters[1]) === 2) || (getAmount(letters[0]) === 2 || getAmount(letters[1]) === 3))) {
    // full house
    return 4
  } else if (letters.length === 3 && (getAmount(letters[0]) === 3 || getAmount(letters[1]) === 3)) {
    // three of a kind
    return 3
  } else if (letters.length === 3) {
    // two pairs
    return 2
  } else if (letters.length === 4) {
    // one pair
    return 1
  }
  // high card
  return 0
}

const getHighest = (cards: string, pos: number) => {
  const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()
  return order.findIndex((card: string) => card === cards[pos])
}

const compare = (a: string, b: string) => {

  for (let i = 0; i < 5; i++) {
    // console.log('gestHighest', a[i], getHighest(a, i), b[i], getHighest(b, i))
    // console.log(getHighest(a, i) > getHighest(b, i) ? 'left -1' : 'right 1')

    if (getHighest(a, i) > getHighest(b, i)) {
      return 1 // 'left'
    } else if (getHighest(a, i) < getHighest(b, i)) {
      return -1 //'right'
    }
  }
  // const typeA = type(a)
  // const typeB = type(b)
  //
  // // console.log('typeA:', typeA, 'typeB:', typeB)
  //
  // if (typeA > typeB) {
  //   return reverse * -1 // 'left'
  // } else if (typeA < typeB) {
  //   return reverse * 1 //'right'
  // } else {
  //   for (let i = 0; i < a.length; i++) {
  //     // console.log('gestHighest', a[i], getHighest(a, i), b[i], getHighest(b, i))
  //     // console.log(getHighest(a, i) > getHighest(b, i) ? 'left -1' : 'right 1')
  //
  //     if (getHighest(a, i) > getHighest(b, i)) {
  //       return reverse * -1 // 'left'
  //     } else if (getHighest(a, i) < getHighest(b, i)) {
  //       return reverse * 1 //'right'
  //     }
  //   }
  // }

  return 0 // 'none'
}

export default function run(data: string) {
  let hands = data.split('\n').map((line: string) => line.split(' '))
  hands.pop()

  // hands = hands.sort((a: string[], b: string[]) => {
  //   return compare(a[0], b[0])
  // })

  for (const hand of hands) {
    console.log(hand[0],hand[1], type(hand[0]))
  }

  // console.log(hands.map((hand: string[]) => hand[0]).join(' '))
  // console.log(hands.map((hand: string[]) => hand[1]).join('*  +'))

  let result = 0
  for (let i = 0; i < hands.length; i++) {

    result += Number(hands[i][1]) * (i+1)
  }
  return result

}

const test1 = `77888 1
77788 1
`

const test2 = `KAKKK 1
AAAAK 1
`

// console.log('result:', run(data))
const result = run(dataTest)
console.log('test:', result)

if (result === 6440) {
  console.log('result:', run(dataInput))
}
