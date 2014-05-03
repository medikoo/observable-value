'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable(2), y = new Observable(7), r, ev;
	a(t(2, 3), 5, "Immutable");

	a(t(), 0, "No args");
	a(t('raz'), 'raz', "Immutable: One arg");

	a(isObservable(r = t(x, 3)), true, "Observable: A");
	a(r.value, 5, "A: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 1;
	a(ev, 4, "A: Evented");
	a(r.value, 4, "A: Updated");

	a(isObservable(r = t(x, y)), true, "Both");
	a(r.value, 8, "Both: value");
	ev = null;
	r.on('change', function (event) { ev = event.newValue; });
	y.value = 3;
	a(ev, 4, "B: evented");
	a(r.value, 4, "B: updated");
	x.value = 4;
	a(ev, 7, "A: evented");
	a(r.value, 7, "A: updated");
};
