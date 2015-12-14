import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';

import main from './components/main';

let drivers = {
  DOM: makeDOMDriver('.app')
};

Cycle.run(main, drivers);
