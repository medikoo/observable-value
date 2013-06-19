'use strict';

var isMutable = require('../is')
  , Mutable   = require('../');

module.exports = function (t, a) {
	var x = new Mutable('foo'), r = t(x);

	a(t(true), false, "Immutable #1");
	a(t(false), true, "Immutable #2");

	a(isMutable(r), true, "Returns mutable");
	a(r.value, false, "Mutable #1");
	x.value = 0;
	a(r.value, true, "Mutable #1");
	x.value = {};
	a(r.value, false, "Mutable #3");
};
