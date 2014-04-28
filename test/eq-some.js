'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var x = new Observable(), y = new Observable(), z = new Observable(), r;

	a(t(['raz', 'dwa'], 'raz'), true, "Immutable");
	a(t(['foo', 'bar'], 'raz'), false, "Immutable");

	a(isObservable(r = t(['foo', 'bar'], x)), true, "Observable value");
	a(r.value, false, "Observable value: value");
	x.value = 'foo';
	a(r.value, true, "Observable value: Update 1");
	x.value = 'bar';
	a(r.value, true, "Observable value: Update 2");
	x.value = 'elo';
	a(r.value, false, "Observable value: Update 3");

	a(isObservable(r = t([x, y], 'foo')), true, "Observable list");
	a(r.value, false, "Observable list: value");
	x.value = 'foo';
	a(r.value, true, "Observable list: Update 1");
	x.value = 'bar';
	a(r.value, false, "Observable list: Update 2");
	x.value = 'foo';
	a(r.value, true, "Observable list: Update 3");
	y.value = 'foo';
	a(r.value, true, "Observable list: Update 4");
	x.value = 'elo';
	a(r.value, true, "Observable list: Update 5");
	y.value = 'melo';
	a(r.value, false, "Observable list: Update 6");

	z.value = 'foo';
	a(isObservable(r = t([x, y], z)), true, "Observable list & value");
	a(r.value, false, "Observable list & value: value");
	x.value = 'foo';
	a(r.value, true, "Observable list & value: Update 1");
	x.value = 'bar';
	a(r.value, false, "Observable list & value: Update 2");
	x.value = 'foo';
	a(r.value, true, "Observable list & value: Update 3");
	y.value = 'foo';
	a(r.value, true, "Observable list & value: Update 4");
	x.value = 'elo';
	a(r.value, true, "Observable list & value: Update 5");
	y.value = 'melo';
	a(r.value, false, "Observable list & value: Update 6");
	z.value = 'melo';
	a(r.value, true, "Observable list & value: Update 7");
};
