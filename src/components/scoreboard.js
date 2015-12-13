/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import Rx from 'rx';

function model({matches$, suits$, moves$}) {
  return Rx.Observable.combineLatest(
    matches$, suits$, moves$,
    (matches, suits, moves) => {
      return {
        matched: matches.size / 2,
        total: suits * 13,
        moves
      }
    }
  );
}

function view(state$) {
  let scoreboard = ({matched, total, moves}) => (
    <div className="scoreboard">
      <div className="score-item">
        <span className="score-key">Moves Made</span>
        <span className="score-val">{moves}</span>
      </div>
      <div className="score-item">
        <span className="score-key">Matches Made</span>
        <span className="score-val">{matched} of {total}</span>
      </div>
    </div>
  );

  return state$.map(scoreboard);
}

export default function scoreBoard(args) {
  return {
    vtree$: view(model(args))
  };
}
