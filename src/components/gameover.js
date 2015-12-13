/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import Rx from 'rx';

function intent(DOM) {
  let playAgain$ = DOM
    .select('.play-again')
    .events('click');

  return playAgain$;
}

function view(stats$) {
  return stats$.map(({matched, moves}) => (
    <div className="gameover">
      <div className="gameover-item">
        <div className="gameover-title">Sweet!</div>
      </div>
      <div className="gameover-item">
        <div>You found all {matched} matches in only {moves} moves.</div>
      </div>
      <div className="gameover-item">
        <button className="play-again">Play Again</button>
      </div>
    </div>
  ));
}

export default function gameover({DOM, stats$}) {
  return {
    vtree$: view(stats$),
    playAgain$: intent(DOM)
  };
}
