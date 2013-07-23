'use strict';

var isMutable = require('../is')
  , Mutable   = require('../');

module.exports = function (t, a) {
	var x = new Mutable(), y = new Mutable(), r, ev;
	a(t(true, 'raz'), 'raz', "Immutable: A & B");
	a(t(true, 0), 0, "Immutable: A");
	a(t('', 33), '', "Immutable: B");
	a(t(0, false), 0, "Immutable: None");

	a(t(), undefined, "Undefined");
	a(t('raz'), 'raz', "Immutable: One: True");
	a(t(0), 0, "Immutable: One: False");

	a(isMutable(r = t(x, 'raz')), true, "Mutable: A");
	a(r.value, undefined, "A: value");
	r.on('change', function (val) { ev = val; });
	x.value = 15;
	a(ev, 'raz', "A: True");
	a(r.value, 'raz', "A: True: value");
	x.value = false;
	a(ev, false, "A: False");
	a(r.value, false, "A: False: value");

	x.value = '343';
	a(isMutable(r = t('dwa', x)), true, "B");
	a(r.value, '343', "B: value");
	ev = null;
	r.on('change', function (val) { ev = val; });
	x.value = 0;
	a(ev, 0, "B: False");
	a(r.value, 0, "B: False: value");
	x.value = 'elo';
	a(ev, 'elo', "B: True");
	a(r.value, 'elo', "B: True: value");

	a(isMutable(r = t(x, y)), true, "Both");
	a(r.value, undefined, "Both: value");
	ev = null;
	r.on('change', function (val) { ev = val; });
	y.value = 'dwa';
	a(ev, 'dwa', "Both: True");
	a(r.value, 'dwa', "Both: True: value");
	x.value = null;
	a(ev, null, "Both: False");
	a(r.value, null, "Both: False: value");
};
