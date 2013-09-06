'use strict';

var isMutable = require('../is')
  , Mutable   = require('../');

module.exports = function (t, a) {
	var x = new Mutable(), y = new Mutable(), r, ev;
	a(t(2, 10), true, "Immutable");
	a(t(), false, "Undefined");
	a(t('raz'), false, "Immutable: one argument");
	a(t(40, 34), false, "Immutable: greater than");

	a(isMutable(r = t(x, 15)), true, "Left");
	a(r.value, false, "Left: value");
	r.on('change', function (val) { ev = val; });
	x.value = 10;
	a(ev, true, "Left: Equalized");
	a(r.value, true, "Left: Equalized: value");
	x.value = 21;
	a(ev, false, "Left: Disequalized");
	a(r.value, false, "Left: Disequalized: value");

	ev = null;
	a(isMutable(r = t(20, x)), true, "Right");
	a(r.value, true, "Right: value");
	r.on('change', function (val) { ev = val; });
	x.value = 18;
	a(ev, false, "Right: Disqualized");
	a(r.value, false, "Right: Disqualized: value");
	x.value = 22;
	a(ev, true, "Right: Equalized");
	a(r.value, true, "Right: Equalized: value");

	a(isMutable(r = t(x, y)), true, "Both");
	a(r.value, false, "Both: value");
	r.on('change', function (val) { ev = val; });
	y.value = 25;
	a(ev, true, "Both: Equalized");
	a(r.value, true, "Both: Equalized: value");
	x.value = 30;
	a(ev, false, "Both: Disequalized");
	a(r.value, false, "Both: Disequalized: value");
};
