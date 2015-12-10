import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';

import memory from './memory';

// import {h} from '@cycle/dom';
// import Rx from 'rx';
// let memory = (DOM) => {
//   return {
//     DOM: Rx.Observable.of(h('h1', 'hello, world'))
//   }
// }

let drivers = {
  DOM: makeDOMDriver('.app')
};

Cycle.run(memory, drivers);
