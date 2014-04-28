'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable(), y = new Observable(), r, ev;
	a(t(23, 10), true, "Immutable");
	a(t(), false, "Undefined");
	a(t('raz'), false, "Immutable: one argument");
	a(t(20, 34), false, "Immutable: less than");

	a(isObservable(r = t(x, 15)), true, "Left");
	a(r.value, false, "Left: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 20;
	a(ev, true, "Left: Equalized");
	a(r.value, true, "Left: Equalized: value");
	x.value = 15;
	a(ev, false, "Left: Disequalized");
	a(r.value, false, "Left: Disequalized: value");

	ev = null;
	a(isObservable(r = t(20, x)), true, "Right");
	a(r.value, true, "Right: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 30;
	a(ev, false, "Right: Disqualized");
	a(r.value, false, "Right: Disqualized: value");
	x.value = 19;
	a(ev, true, "Right: Equalized");
	a(r.value, true, "Right: Equalized: value");

	a(isObservable(r = t(x, y)), true, "Both");
	a(r.value, false, "Both: value");
	r.on('change', function (event) { ev = event.newValue; });
	y.value = 17;
	a(ev, true, "Both: Equalized");
	a(r.value, true, "Both: Equalized: value");
	x.value = 16;
	a(ev, false, "Both: Disequalized");
	a(r.value, false, "Both: Disequalized: value");
};
