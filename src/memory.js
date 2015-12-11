import {h} from '@cycle/dom';
import Rx from 'rx';

import deck from './deck';
import Cards from './cards';

function view(DOM) {

  let cards$ = Rx.Observable.of(deck(4))

  let flip$ = DOM
    .select('.card')
    .events('click')
    .map(e => e.currentTarget.getAttribute('data-id'))
    .do(c => console.log('flip:', c))
    // .startWith(null);

  //
  let [odd$, even$] = flip$.partition((card, index) => index % 2 === 0)
  let oddPairs$ = odd$.map(card => [card, null]);
  let evenPairs$ = even$.withLatestFrom(odd$, (even, odd) => [odd, even]);
  let pairs$ = Rx.Observable.merge(oddPairs$, evenPairs$).startWith([null, null]);
  // pairs$.subscribe(([odd, even]) => console.log('pair', odd, even));
  //

  let combos$ = flip$.bufferWithCount(2)
    .startWith([null, null])
    .do(c => console.log('combo', c));

  return Cards(
    pairs$
      .combineLatest(cards$, ([aid, bid], cards) => {
        cards.forEach(card => {
          card.shown = (card.id === aid || card.id === bid);
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
