import {h} from '@cycle/dom';
import Rx from 'rx';

import deck from './deck';
import Cards from './cards';

function view(DOM) {

  let cards$ = Rx.Observable.of(deck(1)) // 1 - 4

  let flip$ = DOM
    .select('.card')
    .events('click')
    .map(e => {
      let id   = e.currentTarget.getAttribute('data-id');
      let suit = e.currentTarget.getAttribute('data-suit');
      let face = e.currentTarget.getAttribute('data-face');
      return {id, face, suit};
    });

  let [odd$, even$] = flip$
    .partition((card, index) => index % 2 === 0)
  
  let oddPairs$ = odd$.map(odd => [odd, {}]);
  let evenPairs$ = even$
    .withLatestFrom(odd$, (even, odd) => odd.id === even.id ? [{},{}] : [odd, even])
  
  let pairs$ = Rx.Observable
    .merge(oddPairs$, evenPairs$)
    .startWith([{}, {}]);

  let matches$ = evenPairs$
    .filter(([a, b]) => (
      a.face === b.face && a.suit === b.suit
    ))
    .do(([a, b]) => console.log('MATCH!', a, b))
    .scan((set, [a, b]) => {
      set.add(a.id);
      set.add(b.id);
      return set;
    }, new Set())
    .startWith(new Set())
    .do(m => console.log('matches:', m))

  return Cards(
    pairs$
      .combineLatest(matches$, cards$, 
        ([a, b], matches, cards) => {
        cards.forEach(card => {
          card.shown = (card.id === a.id || card.id === b.id);
          card.match = matches.has(card.id);
        });
        return cards;
      })
  ).DOM;
}

export default function memory({DOM}) {
  return {
    DOM: view(DOM)
  };
}
