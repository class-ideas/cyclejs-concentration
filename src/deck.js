import {shuffle} from 'lodash';

const SUITS = "spade club heart diamond".split(" ");
const FACES = "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ");

let deck = [];

// for (let suit of SUITS) {
//   for (let face of FACES) {
//     deck.push({suit, face});
//   }
// }

function build(suitCount=4) {
  let suits = shuffle(SUITS).slice(0, suitCount);
  let deck = [];
  for (let suit of suits) {
    for (let face of FACES) {
      deck.push({suit, face});
    }
  }
  return shuffle(deck.concat(deck));
}

// export default function () {
//   return shuffle(deck);
// }

// export default function () {
//   return {
//     suits
//   }
// }

export default build;
