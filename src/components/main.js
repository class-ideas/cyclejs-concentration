/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import scenes from './scenes';

function view(state$) {
  let layout = scene => (
    <div>
      <h1>Memory</h1>
      {scene}
    </div>
  )

  return state$.map(layout);
}

export default function main({DOM}) {
  return {
    DOM: view(scenes(DOM))
  };
}
