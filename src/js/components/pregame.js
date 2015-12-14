/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import Rx from 'rx';

function intent(DOM) {
  let suits$ = DOM
    .select('.suit-count-select')
    .events('change')
    .map(e => e.target.value)
    .startWith(1);

  let start$ = DOM
    .select('.start-new-game')
    .events('click');

  return start$
    .withLatestFrom(suits$, 
      (e, suits) => suits
    );
}

function view() {
  let opt = val => (
    <option key={val} value={val}>{val}</option>
  );

  return Rx.Observable.of(
    <div className="pre-game-menu">
      <div className="pre-game-menu-item">
        <label>Choose Number of Suits</label>
        {" "}
        <select className="suit-count-select">
          {[1,2,3,4].map(opt)}
        </select>
      </div>
      <div className="pre-game-menu-item">
        <button className="start-new-game">Start</button>
      </div>
    </div>
  );
}

export default function newGame(DOM) {
  return {
    vtree$: view(),
    suits$: intent(DOM)
  };
}
