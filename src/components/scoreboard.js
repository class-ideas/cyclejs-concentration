/** @jsx hJSX */

import {h, hJSX} from '@cycle/dom';
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
      <dl>
        <dt>Moves Made</dt>
        <dd>{moves}</dd>

        <dt>Matches Made</dt>
        <dd>{matched} of {total}</dd>
      </dl>
    </div>
  );

  return state$.map(scoreboard);
}

export default function scoreBoard(args) {
  return {
    vtree$: view(model(args))
  };
}
