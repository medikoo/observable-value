'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var c = new Observable(), x = new Observable(), y = new Observable(), r
	  , ev = null;

	a(t('raz', 'foo', 'bar'), undefined, "Immutable: Primitive");
	a(t({ foo: { bar: 'raz' } }, 'foo', 'bar'), 'raz', "Immutable");

	a(t(), undefined, "Undefined");
	a(t(undefined, null), undefined, "Undefined & Null");
	a(t(null, undefined), null, "Null & Undefined");

	a(isObservable(r = t(c, 'foo', 'bar')), true, "Observable");
	a(r.value, undefined, "False: value");

	r.on('change', function (event) { ev = event.newValue; });
	c.value = {};
	a(ev, null, "Switch entry value: event");
	a(r.value, undefined, "Switch entry value: value");
	c.value = { foo: { bar: 23 } };
	a(ev, 23, "Switch entry value: valid: event");
	a(r.value, 23, "Switch entry value: valid: value");

	x.value = { bar: y };
	c.value = { foo: x };
	a(ev, undefined, "Switch entry value: mutable: event");
	a(r.value, undefined, "Switch entry value: mutable: value");

	y.value = 'elo';
	a(ev, 'elo', "Update deep value: event");
	a(r.value, 'elo', "Update deep value: value");

	x.value = { bar: 'marko' };
	a(ev, 'marko', "Update deep value #2: event");
	a(r.value, 'marko', "Update deep value #2: value");

	ev = null;
	y.value = 'miszka';
	a(ev, null, "Update of unbinded: event");
	a(r.value, 'marko', "Update of unbinded: value");
};
