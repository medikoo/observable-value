'use strict';

var isMutable = require('../is')
  , Mutable   = require('../');

module.exports = function (t, a) {
	var x = new Mutable(), y = new Mutable(), r, ev;
	a(t(true, 'raz'), true, "Immutable: A & B");
	a(t(true, 0), false, "Immutable: A");
	a(t(NaN, 33), false, "Immutable: B");
	a(t(NaN, false), false, "Immutable: None");

	a(t(), false, "Undefined");
	a(t('raz'), true, "Immutable: One: True");
	a(t(0), false, "Immutable: One: False");

	a(isMutable(r = t(x, 'raz')), true, "Mutable: A");
	a(r.value, false, "A: value");
	r.on('change', function (val) { ev = val; });
	x.value = 'raz';
	a(ev, true, "A: True");
	a(r.value, true, "A: True: value");
	x.value = false;
	a(ev, false, "A: False");
	a(r.value, false, "A: False: value");

	ev = null;
	x.value = '343';
	a(isMutable(r = t('dwa', x)), true, "B");
	a(r.value, true, "B: value");
	r.on('change', function (val) { ev = val; });
	x.value = 0;
	a(ev, false, "B: False");
	a(r.value, false, "B: False: value");
	x.value = 'elo';
	a(ev, true, "B: True");
	a(r.value, true, "B: True: value");

	a(isMutable(r = t(x, y)), true, "Both");
	a(r.value, false, "Both: value");
	r.on('change', function (val) { ev = val; });
	y.value = 'dwa';
	a(ev, true, "Both: True");
	a(r.value, true, "Both: True: value");
	x.value = null;
	a(ev, false, "Both: False");
	a(r.value, false, "Both: False: value");
};
