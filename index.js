import Rx from 'rx';
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';

Cycle.run(
  (sources) => (
    { DOM: Rx.Observable.timer(0, 1000).map(
      i => CycleDOM.h(`div`, `Seconds elapsed test: ${i}`)
    ) }
  ),
  { DOM: CycleDOM.makeDOMDriver(`#app`) }
);
