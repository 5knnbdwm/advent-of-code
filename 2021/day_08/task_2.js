const data = require('./input.json');
// const data = require('./test.json');
// const data = ['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf']

//  1111
// 2    3
// 2    3
//  4444
// 5    6
// 5    6
//  7777

let sum = 0

const keys = [
  ["k_0", "0", "d_1", "d_2", "d_3", "d_5", "d_6", "d_7"],
  ["k_1", "1", "d_3", "d_6"],
  ["k_2", "2", "d_1", "d_3", "d_4", "d_5", "d_7"],
  ["k_3", "3", "d_1", "d_3", "d_4", "d_6", "d_7"],
  ["k_4", "4", "d_2", "d_3", "d_4", "d_6"],
  ["k_5", "5", "d_1", "d_2", "d_4", "d_6", "d_7"],
  ["k_6", "6", "d_1", "d_2", "d_4", "d_5", "d_6", "d_7"],
  ["k_7", "7", "d_1", "d_3", "d_6"],
  ["k_8", "8", "d_1", "d_2", "d_3", "d_4", "d_5", "d_6", "d_7"],
  ["k_9", "9", "d_1", "d_2", "d_3", "d_4", "d_6", "d_7"],
]

const length = {
  l_0: 6,
  l_1: 2,
  l_2: 5,
  l_3: 5,
  l_4: 4,
  l_5: 5,
  l_6: 6,
  l_7: 3,
  l_8: 7,
  l_9: 6,
}

function includesAll(arr1, arr2) {
  let tmp = 0

  arr1.forEach((item) => {
    if (arr2.includes(item)) {
      tmp += 1
    }
  })

  return tmp === arr2.length
}

for (let i = 0; i < data.length; i += 1) {
  const line = data[i].split(' | ');
  const signal = line[0].split(' ')
  const digit = line[1].split(' ')

  let decode = {}

  let used = function () {
    let letters = []
    Object.keys(decode).forEach((item) => {
      decode[item].forEach((letter) => {
        if (!letters.includes(letter)) {
          letters.push(letter)
        }
      })
    })
    return letters
  }
  let all = function () {
    return ["a", "b", "c", "d", "e", "f", "g"]
  }

  const s_1 = signal.find((item) => item.length === length.l_1).split('')
  const s_4 = signal.find((item) => item.length === length.l_4).split('')
  const s_7 = signal.find((item) => item.length === length.l_7).split('')
  const s_8 = signal.find((item) => item.length === length.l_8).split('')

  decode.d_1 = s_7.filter((item) => !s_1.includes(item))

  decode.d_3 = s_1
  decode.d_6 = s_1

  decode.d_2 = s_4.filter((item) => !s_1.includes(item))
  decode.d_4 = s_4.filter((item) => !s_1.includes(item))

  decode.d_5 = s_8.filter((item) => !used().includes(item))
  decode.d_7 = decode.d_5

  const s_0 = signal
    .find((item) => item.length === length.l_0 && includesAll(item.split(''), s_1) && !includesAll(item.split(''), decode.d_2)).split('')

  decode.d_4 = all().filter((item) => !s_0.includes(item))
  decode.d_2 = decode.d_2.filter((item) => !decode.d_4.includes(item))

  const s_6 = signal
    .find((item) => item.length === length.l_0 && includesAll(item.split(''), decode.d_7) && includesAll(item.split(''), decode.d_4)).split('')

  decode.d_3 = decode.d_3.filter((item) => !s_6.includes(item))
  decode.d_6 = decode.d_6.filter((item) => s_6.includes(item))

  decode.d_7 = signal.find((item) => item.length === length.l_3 && item.includes(decode.d_1) && item.includes(decode.d_3) && item.includes(decode.d_6)).split('').filter((item) => decode.d_7.includes(item))

  decode.d_5 = decode.d_5.filter((item) => !decode.d_7.includes(item))

  // now starts the decoding of the problem

  let decode_key = function () {
    let tmp = {}
    Object.keys(decode).forEach((item) => tmp[decode[item]] = item)
    return tmp
  }

  let number = ''

  for (let j = 0; j < digit.length; j++) {
    let char_keys = []

    digit[j].split('').forEach((item) => {
      char_keys.push(decode_key()[item])
    });

    number += keys.find((item) => includesAll(item, char_keys) && item.length - 2 === char_keys.length)[1]
  }
  sum += Number(number)
}

console.log(sum)