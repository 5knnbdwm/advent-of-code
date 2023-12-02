const {default: data} = require('./input.txt');
// const {default: data} = require('./test.txt');

export default async function run(): Promise<void> {
  const lines = data.split('\n').slice(0, -1);

  let result = 0;

  for (const line of lines) {
    const game = Number(line.replace(/\w+\s(\d+):.+/gm, '$1'));
    let minRed = -1
    let minGreen = -1
    let minBlue = -1

    const hands = line.replace(/Game\s\d+:\s/gm, '').split('; ').map((hand: string) => hand.split(', '));

    for (const hand of hands) {
      for (const card of hand) {
        const [value, suit] = card.split(' ');

        if (suit === 'red') {
          if (minRed === -1 || Number(value) > minRed) {
            minRed = Number(value)
          }
        } else if (suit === 'green') {
          if (minGreen === -1 || Number(value) > minGreen) {
            minGreen = Number(value)
          }
        } else if (suit === 'blue') {
          if (minBlue === -1 || Number(value) > minBlue) {
            minBlue = Number(value)
          }
        }

      }
    }
    // console.log(game, minRed, minGreen, minBlue);
    result += minRed * minBlue * minGreen;
  }

  console.log(result);
}

run();
