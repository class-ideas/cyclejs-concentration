/** @jsx hJSX */

import {hJSX} from '@cycle/dom';
import scenes from './scenes';

function view(state$) {
  let layout = scene => (
    <div className="main-container">
      <h1>Concentration</h1>
      {scene}
      <footer>
        <div className="cycle">
          <span>Made with</span>
          {' '}
          <img src="assets/cyclejs_logo.svg"/>
          {' '}
          <strong>Cycle.js</strong>
        </div>
      </footer>
    </div>
  )

  return state$.map(layout);
}

export default function main({DOM}) {
  return {
    DOM: view(scenes(DOM))
  };
}
