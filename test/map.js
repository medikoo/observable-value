'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable('foo'), r;

	a(t('raz', function (input) { return input[0]; }), 'r', "Immutable");

	r = t(x, function (input) { return input[0]; });
	a(isObservable(r), true, "Observable");
	a(r.value, 'f', "Observable: value");
	x.value = 'bar';
	a(r.value, 'b', "Observable: change");
};
