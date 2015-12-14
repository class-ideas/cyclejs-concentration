/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
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

function model({flip$, suits$}) {
  let cards$ = suits$.map(n => deck(n));

  let [odd$, even$] = flip$
    .partition((card, index) => index % 2 === 0)
  
  let oddPairs$ = odd$.map(odd => [odd, {}]);
  let evenPairs$ = even$
    .withLatestFrom(odd$, (even, odd) => odd.id === even.id ? [{},{}] : [odd, even])
  
  let pairs$ = Rx.Observable
    .merge(oddPairs$, evenPairs$)
    .startWith([{}, {}]);

  let moves$ = suits$.flatMapLatest(() => (
    evenPairs$
      .takeUntil(suits$)
      .scan((n) => ++n, 0)
      .startWith(0)
  ))

  let matches$ = suits$.flatMapLatest(() => (
    evenPairs$
      .takeUntil(suits$)
      .filter(([a, b]) => (
        a.face === b.face && a.suit === b.suit
      ))
      .scan((set, [a, b]) => {
        a.id && set.add(a.id);
        b.id && set.add(b.id);
        return set;
      }, new Set())
      .startWith(new Set())
  ));

  let clear$ = matches$
    .combineLatest(suits$, (matches, suits) => ({
      matches, suits
    }))
    .filter(({matches, suits}) => {
      return matches.size === (suits * 26)
    });

  let state$ = pairs$
    .combineLatest(matches$, cards$, 
      ([a, b], matches, cards) => {
        cards.forEach(card => {
          card.shown = (card.id === a.id || card.id === b.id);
          card.match = matches.has(card.id);
        });
        return cards;
      }
    );

  return {
    state$,
    moves$,
    matches$,
    clear$
  }
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

  return state$.map(cards => (
    <div className="cards">{cards.map(card)}</div>
  ));
}

export default function cards({DOM, suits$}) {

  let {flip$} = intent(DOM);

  let {state$, moves$, matches$, clear$} = model({flip$, suits$});

  let vtree$ = view(state$);

  return {
    vtree$,
    moves$,
    matches$,
    clear$
  };

}
