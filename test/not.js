'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable('foo'), r = t(x);

	a(t(true), false, "Immutable #1");
	a(t(false), true, "Immutable #2");

	a(isObservable(r), true, "Returns mutable");
	a(r.value, false, "Observable #1");
	x.value = 0;
	a(r.value, true, "Observable #1");
	x.value = {};
	a(r.value, false, "Observable #3");
};
