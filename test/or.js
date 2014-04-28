'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable(), y = new Observable(), r, ev;
	a(t(12, 'raz'), 12, "Immutable: A & B");
	a(t(34, 0), 34, "Immutable: A");
	a(t(0, 'raz'), 'raz', "Immutable: B");
	a(t(0, false), false, "Immutable: None");

	a(t(), undefined, "Undefined");
	a(t('raz'), 'raz', "Immutable: One: True");
	a(t(0), 0, "Immutable: One: False");

	a(isObservable(r = t(x, 'raz')), true, "Observable: A");
	a(r.value, 'raz', "A: value");
	r.on('change', function (event) { ev = event.newValue; });
	x.value = 'foo';
	a(ev, 'foo', "A: True");
	a(r.value, 'foo', "A: True: value");
	x.value = false;
	a(ev, 'raz', "A: False");
	a(r.value, 'raz', "A: False: value");

	x.value = '343';
	a(t('dwa', x), 'dwa', "B");

	a(isObservable(r = t(x, y)), true, "Both");
	a(r.value, '343', "Both: value");
	ev = null;
	r.on('change', function (event) { ev = event.newValue; });
	y.value = 'dwa';
	a(ev, null, "Both: True");
	a(r.value, '343', "Both: True: value");
	x.value = null;
	a(ev, 'dwa', "First: False");
	a(r.value, 'dwa', "First: False: value");
	y.value = 0;
	a(ev, 0, "Both: False");
	a(r.value, 0, "Both: False: value");
};
