import Cycle from '@cycle/core';
import { hJSX, makeDOMDriver, input, ul, li, span } from '@cycle/dom';

const checkboxes = {
	one: {
		checked: true,
		children: {
			two: { checked: false },
		},
	},
	three: { checked: false },
};

function modifyProperty(obj, key, key2, value) {
	if (key in obj) {
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
			input(new function() {
				this.type = "checkbox";
				this.value = key;
				children[key].checked && (this.checked = true);
			}),
			span(children[key].checked ? 'ON' : 'off'),
		])
	));
}

Cycle.run(
  (drivers) => (
    { DOM: drivers.DOM.select('input').events('click')
		.map(ev => {
			modifyProperty(checkboxes, ev.target.value, 'checked', ev.target.checked);
			return checkboxes;
		})
		.startWith('')
		.map(() =>
			ul([
				li([
					input(new function() {
					    this.type = "checkbox";
						this.value = "one";
					    checkboxes.one.checked && (this.checked = true);
					}),
					span(checkboxes.one.checked ? 'ON' : 'off'),
					children2DOM(checkboxes.one.children),
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
