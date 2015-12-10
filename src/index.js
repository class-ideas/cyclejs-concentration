import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';

import memory from './memory';

let drivers = {
  DOM: makeDOMDriver('.app')
};

Cycle.run(memory, drivers);
