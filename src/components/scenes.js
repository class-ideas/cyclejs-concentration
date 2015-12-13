/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import Rx from 'rx';
import Cards from './cards';
import PreGame from './pregame';
import ScoreBoard from './scoreboard';
import GameOver from './gameover';

function model(DOM) {
  let game = PreGame(DOM);
  let cards = Cards({DOM, suits$: game.suits$});
  let scoreboard = ScoreBoard(Object.assign({}, game, cards));
  let gameover = GameOver({DOM, stats$: scoreboard.stats$});

  let start$ = gameover
    .playAgain$
    .startWith(1)
    .combineLatest(
      game.vtree$, 
      (x, menu) => menu
    );

  let play$ = cards.vtree$
    .combineLatest(scoreboard.vtree$, 
      (cards, scoreboard) => {
        return {cards, scoreboard};
      }
    );

  let end$ = game.suits$.combineLatest(cards.matches$, 
    (suits, matches) => {
      return {suits, matches};
    })
    .filter(({suits, matches}) => {
      return matches.size === suits * 26;
    })
    .flatMap(x => Rx.Observable.of(x).delay(2000))
    .combineLatest(gameover.vtree$, 
      (x, credits) => credits
    );

  return {
    start$,
    play$,
    end$
  }
}

function views({start$, play$, end$}) {
  let startScene$ = start$
    .map(menu => (
      <div>
        {menu}
      </div>
    ));

  let playScene$ = play$
    .map(({cards, scoreboard}) => (
      <div>
        {scoreboard}
        {cards}
      </div>
    ));

  let endScene$ = end$
    .map(credits => (
      <div>
        {credits}
      </div>
    ));

  return Rx.Observable.merge(
    startScene$,
    playScene$,
    endScene$
  );
}

export default function scenes(DOM) {
  return views(model(DOM));
}
