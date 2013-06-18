'use strict';

var isMutable = require('../is')
  , Mutable   = require('../').Mutable;

module.exports = function (t, a) {
	var x = new Mutable('foo'), r;

	a(t('raz', function (input) { return input[0]; }), 'r', "Immutable");

	r = t(x, function (input) { return input[0]; });
	a(isMutable(r), true, "Mutable");
	a(r.value, 'f', "Mutable: value");
	x.value = 'bar';
	a(r.value, 'b', "Mutable: change");
};
