import { span, div } from '@cycle/dom';

const DIALOGUE_NAME = 'dialogue';

let idSuffix = 0;

function makeCycleId() {
	return `${DIALOGUE_NAME}-${idSuffix++}`;
}

function intent({ DOM, cycleId }) {
	return {
		isClicked$: DOM.select(`.${cycleId}`).events('click')
			.map(() => true)
			.startWith(false),
	};
}

function model({ props$, actions }) {
	return props$.combineLatest(
		actions.isClicked$,
		(props, isClicked) => ({
			data: isClicked ?
				span({ style: { whiteSpace: 'nowrap' } }, 'I was clicked') :
				'Click me!',
			text: props.text,
		})
	);
}

function view({ state$, cycleId }) {
	return state$.map(state => div(`${cycleId} ${DIALOGUE_NAME}`, `${state.text} ${state.data}`));
}

function dialogue({ DOM, props$, optCycleId = makeCycleId() }) {
	const cycleId = optCycleId.trim();
	const actions = intent({ DOM, cycleId });
	const state$ = model({ props$, actions });

	return {
		DOM: view({ props$, state$ }, cycleId),
		cycleId,
		state$,
	};
}

export default dialogue;
