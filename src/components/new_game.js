/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import Rx from 'rx';

function intent(DOM) {
  let suits$ = DOM
    .select('.suit-count-select')
    .events('change')
    .map(e => e.target.value)
    .startWith(1);

  let newGame$ = DOM
    .select('.start-new-game')
    .events('click')
    .withLatestFrom(suits$, (e, suits) => suits);

  return newGame$;
}

function view() {
  let opt = val => (
    <option key={val} value={val}>{val}</option>
  );

  return Rx.Observable.of(
    <div>
      <select className="suit-count-select">
        {[1,2,3,4].map(opt)}
      </select>
      <button className="start-new-game">Start</button>
    </div>
  );
}

export default function newGame(DOM) {
  return {
    vtree$: view(),
    suits$: intent(DOM)
  };
}
