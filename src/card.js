/** @jsx hJSX */

import {h, hJSX} from '@cycle/dom';
import classes from 'classnames';

function view(DOM, card$) {
  let pick$ = DOM
    .select('.card')
    .events('click');

  let vtree$ = card$.map(({suit, face, shown}) => {
    let className = classes('card', suit, {back: false});
    return h('div', {className}, h('span', face));
  });

  return {
    pick$,
    vtree$
  }
}

export default function card({DOM, card$}) {

  let {vtree$, pick$} = view(DOM, card$);

  return {
    DOM: vtree$,
    pick$
  };

}
