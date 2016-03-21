import Cycle from '@cycle/core';
import { hJSX, makeDOMDriver, input, ul, li, span } from '@cycle/dom';

const checkboxes = {
	one: { checked: true },
	two: { checked: false },
	three: { checked: false },
};

Cycle.run(
  (drivers) => (
    { DOM: drivers.DOM.select('input').events('click')
		.map(ev => Object.assign(checkboxes, { [ev.target.value]: { checked: ev.target.checked } }))
		.startWith('')
		.map(() =>
			ul([
				li([
					input(new function(){
					    this.type = "checkbox";
						this.value = "one";
					    checkboxes.one.checked && (this.checked = true);
					}),
					span(checkboxes.one.checked ? 'ON' : 'off'),
					ul([
						li([
							input(new function(){
							    this.type = "checkbox";
								this.value = "two";
							    checkboxes.two.checked && (this.checked = true);
							}),
							span(checkboxes.two.checked ? 'ON' : 'off'),
						])
					]),
				]),
				li([
					input(new function(){
						this.type = "checkbox";
						this.value = "three";
						checkboxes.three.checked && (this.checked = true);
					}),
					span(checkboxes.three.checked ? 'ON' : 'off'),
				]),
			])
		),
	}
  ),
  { DOM: makeDOMDriver('#app') }
);
