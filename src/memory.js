import {h} from '@cycle/dom';
import Rx from 'rx';

import deck from './deck';
import Card from './card';

function view(DOM) {

  let deck$ = Rx.Observable.of(deck(4))
    .map(cards => cards.map(card => {
      return Card({DOM, card$: Rx.Observable.of(card)}).DOM;
    }));

  // let deck$ = Rx.Observable.of(deck())
  //   .map(cards => cards.map(card => h('div', card.face)));

  // let deck$ = Rx.Observable.of(h('div', 'hello'));

  // let pick$ = DOM
  //   .select('.card')
  //   .events('click')
  //   .map(e => e.target)
  //   // .map() // get card data
  //   .bufferWithCount(2);
  return deck$.map(cards => h('div.cards', cards));
}

export default function memory({DOM}) {
  return {
    DOM: view(DOM)
  };
}
