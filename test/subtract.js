'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable(2), y = new Observable(7), r, ev;
	a(t(2, -3), 5, "Immutable");

	a(t(), 0, "No args");
	a(t('raz'), 'raz', "Immutable: One arg");

	a(isObservable(r = t(x, 3)), true, "Observable: A");
	a(r.value, -1, "A: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 1;
	a(ev, -2, "A: Evented");
	a(r.value, -2, "A: Updated");

	a(isObservable(r = t(x, y)), true, "Both");
	a(r.value, -6, "Both: value");
	ev = null;
	r.on('change', function (event) { ev = event.newValue; });
	y.value = 3;
	a(ev, -2, "B: evented");
	a(r.value, -2, "B: updated");
	x.value = 4;
	a(ev, 1, "A: evented");
	a(r.value, 1, "A: updated");
};
