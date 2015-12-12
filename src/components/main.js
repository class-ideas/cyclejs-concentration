/** @jsx hJSX */

import {h, hJSX} from '@cycle/dom';
import Rx from 'rx';
import Cards from './cards';
import NewGame from './new_game';

function model(DOM) {
  let game = NewGame(DOM);
  let cards = Cards({DOM, suits$: game.suits$});
  return Rx.Observable
    .combineLatest(game.vtree$, cards.vtree$.startWith(null), 
    (menu, cards) => {
      return {menu, cards};
    }
  );
}

function view(state$) {
  let layout = ({menu, cards}) => (
    <div>
      <h1>Memory</h1>
      {menu}
      {cards}
    </div>
  );

  return state$.map(layout);
}

export default function main({DOM}) {
  return {
    DOM: view(model(DOM))
  };
}
