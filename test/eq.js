'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable(), y = new Observable(), r, ev;
	a(t('raz', 'raz'), true, "Immutable");
	a(t(), true, "Undefined");
	a(t('raz'), false, "Immutable: not equal");

	a(isObservable(r = t(x, 'raz')), true, "Left");
	a(r.value, false, "Left: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 'raz';
	a(ev, true, "Left: Equalized");
	a(r.value, true, "Left: Equalized: value");
	x.value = 'dwa';
	a(ev, false, "Left: Disequalized");
	a(r.value, false, "Left: Disequalized: value");

	ev = null;
	a(isObservable(r = t('dwa', x)), true, "Right");
	a(r.value, true, "Right: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 'raz';
	a(ev, false, "Right: Disqualized");
	a(r.value, false, "Right: Disqualized: value");
	x.value = 'dwa';
	a(ev, true, "Right: Equalized");
	a(r.value, true, "Right: Equalized: value");

	a(isObservable(r = t(x, y)), true, "Both");
	a(r.value, false, "Both: value");
	r.on('change', function (event) { ev = event.newValue; });
	y.value = 'dwa';
	a(ev, true, "Both: Equalized");
	a(r.value, true, "Both: Equalized: value");
	x.value = 'raz';
	a(ev, false, "Both: Disequalized");
	a(r.value, false, "Both: Disequalized: value");
};
