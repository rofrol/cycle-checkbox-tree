import Cycle from '@cycle/core';
import { hJSX, makeDOMDriver } from '@cycle/dom';

Cycle.run(
  (drivers) => (
    { DOM: drivers.DOM.select('input').events('click')
		.map(ev => ev.target.checked)
		.startWith(false)
		.map(toggled =>
			<div>
				<input type="checkbox" /> Toggle me
				<p>{toggled ? 'ON' : 'off'}</p>
			</div>
		),
	}
  ),
  { DOM: makeDOMDriver('#app') }
);
