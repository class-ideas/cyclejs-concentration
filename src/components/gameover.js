/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import Rx from 'rx';

function intent(DOM) {
  let playAgain$ = DOM
    .select('.play-again')
    .events('click');

  return playAgain$;
}

function view() {
  return Rx.Observable.of(
    <div>
      <div>Game Over</div>
      <button className="play-again">Play Again</button>
    </div>
  );
}

export default function gameover(DOM) {
  return {
    vtree$: view(),
    playAgain$: intent(DOM)
  };
}
