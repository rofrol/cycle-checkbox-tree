import Cycle from '@cycle/core';
import { hJSX, makeDOMDriver, input, ul, li, span } from '@cycle/dom';

const checkboxes = {
	one: {
		checked: true,
		children: [
			{
				two: { checked: false },
			},
		]
	},
	three: { checked: false },
};

function modifyProperty(obj, key, key2, value) {
	if (key in obj) {
	    obj[key][key2] = value;
	} else {
		for (let k in obj) {
			if ('children' in obj[k]) {
				for (let i = 0; i < obj[k].children.length; ++i) {
					modifyProperty(obj[k].children[i], key, key2, value);
				}
			}
		}
	}
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
							    checkboxes.one.children[0].two.checked && (this.checked = true);
							}),
							span(checkboxes.one.children[0].two.checked ? 'ON' : 'off'),
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
