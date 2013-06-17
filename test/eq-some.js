'use strict';

var isMutable = require('../is')
  , mutable   = require('../');

module.exports = function (t, a) {
	var x = mutable(), y = mutable(), z = mutable(), r;

	a(t(['raz', 'dwa'], 'raz'), true, "Immutable");
	a(t(['foo', 'bar'], 'raz'), false, "Immutable");

	a(isMutable(r = t(['foo', 'bar'], x)), true, "Mutable value");
	a(r.value, false, "Mutable value: value");
	x.value = 'foo';
	a(r.value, true, "Mutable value: Update 1");
	x.value = 'bar';
	a(r.value, true, "Mutable value: Update 2");
	x.value = 'elo';
	a(r.value, false, "Mutable value: Update 3");

	a(isMutable(r = t([x, y], 'foo')), true, "Mutable list");
	a(r.value, false, "Mutable list: value");
	x.value = 'foo';
	a(r.value, true, "Mutable list: Update 1");
	x.value = 'bar';
	a(r.value, false, "Mutable list: Update 2");
	x.value = 'foo';
	a(r.value, true, "Mutable list: Update 3");
	y.value = 'foo';
	a(r.value, true, "Mutable list: Update 4");
	x.value = 'elo';
	a(r.value, true, "Mutable list: Update 5");
	y.value = 'melo';
	a(r.value, false, "Mutable list: Update 6");

	z.value = 'foo';
	a(isMutable(r = t([x, y], z)), true, "Mutable list & value");
	a(r.value, false, "Mutable list & value: value");
	x.value = 'foo';
	a(r.value, true, "Mutable list & value: Update 1");
	x.value = 'bar';
	a(r.value, false, "Mutable list & value: Update 2");
	x.value = 'foo';
	a(r.value, true, "Mutable list & value: Update 3");
	y.value = 'foo';
	a(r.value, true, "Mutable list & value: Update 4");
	x.value = 'elo';
	a(r.value, true, "Mutable list & value: Update 5");
	y.value = 'melo';
	a(r.value, false, "Mutable list & value: Update 6");
	z.value = 'melo';
	a(r.value, true, "Mutable list & value: Update 7");
};
