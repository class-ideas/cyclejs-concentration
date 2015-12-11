/** @jsx hJSX */

import {h, hJSX} from '@cycle/dom';
import Rx from 'rx';
import Cards from './cards';

function model(DOM) {
  let suits$ = Rx.Observable.of(1);
  let cards$ = Cards({DOM, suits$}).vtree$;
  return Rx.Observable.combineLatest(suits$, cards$, 
    (suits, cards) => {
      return {suits, cards};
    }
  );
}

function view(state$) {
  let layout = ({suits, cards}) => (
    <div>
      <h1>Memory</h1>
      <div>Suits: {suits}</div>
      {cards}
    </div>
  );

  return state$.map(layout);
}

export default function memory({DOM}) {
  return {
    DOM: view(model(DOM))
  };
}
