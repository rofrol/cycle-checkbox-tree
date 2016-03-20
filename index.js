import Cycle from '@cycle/core';
import { hJSX, makeDOMDriver } from '@cycle/dom';

Cycle.run(
  (drivers) => (
    { DOM: drivers.DOM.select('input').events('click')
		.map(ev => ({ value: parseInt(ev.target.value, 10), checked: ev.target.checked }))
		.startWith(false)
		.map(toggled =>
			<ul>
				<li>
					<input type="checkbox" value="1" />
					<span>{ toggled.value === 1 && toggled.checked ? 'ON' : 'off' }</span>
					<ul>
						<li>
							<input type="checkbox" value="2" />
							<span>{ toggled.value === 2 && toggled.checked ? 'ON' : 'off' }</span>
						</li>
					</ul>
				</li>
				<li>
					<input type="checkbox" value="3" />
					<span>{ toggled.value === 3 && toggled.checked ? 'ON' : 'off' }</span>
				</li>
			</ul>
		),
	}
  ),
  { DOM: makeDOMDriver('#app') }
);
