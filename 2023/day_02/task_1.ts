const {default: data} = require('./input.txt');
// const {default: data} = require('./test.txt');

export default async function run(): Promise<void> {
  const lines = data.split('\n').slice(0, -1);

  let result = 0;

  for (const line of lines) {
    let game = Number(line.replace(/\w+\s(\d+):.+/gm, '$1'));

    const hands = line.replace(/Game\s\d+:\s/gm, '').split('; ').map((hand: string) => hand.split(', '));

    hands: for (const hand of hands) {
      // console.log(hand);

      for (const card of hand) {
        const [value, suit] = card.split(' ');

        // only 12 red cubes, 13 green cubes, and 14 blue cubes

        if (suit === 'red' && Number(value) > 12) {
          // console.log('red', value);
          game = 0
        } else if (suit === 'green' && Number(value) > 13) {
          // console.log('green', value);
          game = 0
        } else if (suit === 'blue' && Number(value) > 14) {
          // console.log('blue', value);
          game = 0
        }
      }
    }

    result += game;
  }

  console.log(result);
}

run();
