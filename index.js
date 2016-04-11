// https://gist.github.com/Frikki/273cf63cb1cd7a181888

import { run } from '@cycle/core';
import { makeDOMDriver, div, p } from '@cycle/dom';
import dialogue from './dialogue.js';
import * as Rx from 'rx';

function main({ DOM }) {
	const dialogueInstance = dialogue(
		{
			DOM,
			props$: Rx.Observable.just({ text: 'Unicorns cycle on rainbows!' }),
		}
	);

	return {
		DOM: Rx.Observable.combineLatest(
			dialogueInstance.DOM,
			dialogueInstance.state$,
			(dialogueVTree, dialogueState) => div([
				`${dialogueVTree}`,
				p(
					`The dialogue state data is: ${dialogueState.data}
					The dialogue state text is: ${dialogueState.text}`
				),
			])
		),
	};
}

run(
	main,
	{ DOM: makeDOMDriver('.app-container') }
);
