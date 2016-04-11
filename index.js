import Cycle from '@cycle/core';
import { makeDOMDriver, input, ul, li, span, label } from '@cycle/dom';

const checkboxes = {
	one: {
		checked: true,
		children: {
			two: { checked: false },
			four: {
				checked: true,
				children: {
					five: { checked: false },
					six: { checked: true },
				},
			},
		},
	},
	three: { checked: false },
};

function modifyProperty(obj, key, key2, value) {
	if (key in obj) {
		/* eslint no-param-reassign: ["error", { "props": false }] */
		obj[key][key2] = value;
	} else {
		for (const k in obj) {
			if ('children' in obj[k]) {
				for (const j in obj[k].children) {
					if (obj[k].children.hasOwnProperty(j)) {
						modifyProperty(obj[k].children, key, key2, value);
					}
				}
			}
		}
	}
}

function children2DOM(children) {
	return typeof children === 'object' && Object.keys(children).length &&
	ul(Object.keys(children).map(key =>
		li([
			label([
				input(new function newInput() {
					this.type = 'checkbox';
					this.value = key;
					if (children[key].checked) this.checked = true;
				}),
				key, ' ',
				span(children[key].checked ? 'ON' : 'off'),
			]),
			children2DOM(children[key].children),
		])
	)) || [];
}

Cycle.run(
  (drivers) => (
    { DOM: drivers.DOM.select('input').events('click')
		.map(ev => modifyProperty(checkboxes, ev.target.value, 'checked', ev.target.checked))
		.startWith('')
		.map(() => children2DOM(checkboxes)),
	}
  ),
  { DOM: makeDOMDriver('#app') }
);
