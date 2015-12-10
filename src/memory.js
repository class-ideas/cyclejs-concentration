import {h} from '@cycle/dom';
import Rx from 'rx';

import deck from './deck';
import Cards from './cards';

function view(DOM) {

  let cards$ = Rx.Observable.of(deck(4))

  return Cards(DOM
    .select('.card')
    .events('click')
    .map(e => e.currentTarget.getAttribute('data-id'))
    .do(c => console.log('card:', c))
    .startWith(null)
    .combineLatest(cards$, (id, cards) => {
      cards.forEach(card => {
        card.shown = (card.id === id);
      });
      return cards;
    })).DOM;
}

export default function memory({DOM}) {
  return {
    DOM: view(DOM)
  };
}
