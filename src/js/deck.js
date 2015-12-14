import {shuffle, cloneDeep} from 'lodash';

const SUITS = "spade club heart diamond".split(" ");
const FACES = "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ");

let deck = [];

let _cardId = 0;
function cardId() {
  return `card${++_cardId}`;
}

function build(suitCount=4) {
  let suits = shuffle(SUITS).slice(0, suitCount);
  let deck = [];
  for (let suit of suits) {
    for (let face of FACES) {
      deck.push({suit, face});
    }
  }
  let doubleDeck = deck.concat(cloneDeep(deck));
  doubleDeck.forEach(card => card.id = cardId());
  return shuffle(doubleDeck);
}

export default build;
