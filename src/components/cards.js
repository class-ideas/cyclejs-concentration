/** @jsx hJSX */

import {h, hJSX} from '@cycle/dom';
import Rx from 'rx';
import classes from 'classnames';
import deck from '../deck';

function intent(DOM) {
  return {
    flip$: DOM
      .select('.card')
      .events('click')
      .map(e => {
        let id   = e.currentTarget.getAttribute('data-id');
        let suit = e.currentTarget.getAttribute('data-suit');
        let face = e.currentTarget.getAttribute('data-face');
        return {id, face, suit};
      })
  }
}

function model(actions, {suits$}) {
  let cards$ = suits$.map(n => deck(n));

  let [odd$, even$] = actions.flip$
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

  return pairs$
    .combineLatest(matches$, cards$, 
      ([a, b], matches, cards) => {
        cards.forEach(card => {
          card.shown = (card.id === a.id || card.id === b.id);
          card.match = matches.has(card.id);
        });
        return cards;
      }
    );
}

function view(state$) {

  let card = ({suit, face, shown, match, id}) => (
    <div className="card-slot">
      <div className={classes('card', suit, {shown, match})} 
        attributes={{'data-id':id, 'data-suit':suit, 'data-face':face}}>
        <div className="back">
          <div className="content"></div>
        </div>
        <div className="front">
          <div className="content">{face}</div>
        </div>
      </div>
    </div>
  );

  let vtree$ = state$.map(cards => (
    <div className="cards">{cards.map(card)}</div>
  ));

  return {
    vtree$
  }
}

export default function cards({DOM, suits$}) {

  let {vtree$} = view(model(intent(DOM), {suits$}));

  return {
    vtree$
  };

}
