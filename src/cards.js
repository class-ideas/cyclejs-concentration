/** @jsx hJSX */

import {h, hJSX} from '@cycle/dom';
import classes from 'classnames';

function view(cards$) {

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

  let vtree$ = cards$.map(cards => (
    <div className="cards">{cards.map(card)}</div>
  ));

  return {
    vtree$
  }
}

export default function card(cards$) {

  let {vtree$} = view(cards$);

  return {
    DOM: vtree$
  };

}
