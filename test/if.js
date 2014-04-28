'use strict';

var isObservable = require('../is-observable-value')
  , Observable   = require('../');

module.exports = function (t, a) {
	var c = new Observable(), x = new Observable(), y = new Observable(), r, ev;
	a(t('raz', 'foo', 'bar'), 'foo', "Immutable: True");
	a(t(0, 'foo', 'bar'), 'bar', "Immutable: False");
	a(t('raz', x, y), x, "Immutable cond: True");
	a(t(0, x, y), y, "Immutable cond: False");

	a(t(), undefined, "Undefined");

	a(isObservable(r = t(c, 'foo', 'bar')), true, "Cond mutable");
	a(r.value, 'bar', "False: value");
	r.on('change', function (event) { ev = event.newValue; });
	c.value = 'raz';
	a(ev, 'foo', "Switch to true: event");
	a(r.value, 'foo', "Switch to true: value");
	c.value = false;
	a(ev, 'bar', "Switch to false: event");
	a(r.value, 'bar', "Switch to false: value");

	a(isObservable(r = t(c, x, y)), true, "Cond mutable");
	a(r.value, undefined, "False: value");
	r.on('change', function (event) { ev = event.newValue; });
	y.value = 'im-y';

	a(ev, 'im-y', "Change false value: event");
	ev = null;
	a(r.value, 'im-y', "Change false value: value");
	x.value = 'im-x';
	a(ev, null, "Other change: not evented");
	a(r.value, 'im-y', "Other change: value");
	c.value = {};
	a(ev, 'im-x', "Switch to true: event");
	a(r.value, 'im-x', "Switch to false: value");
	x.value = 'elo';
	a(ev, 'elo', "Change true value: event");
	a(r.value, 'elo', "Change true value: value");
	ev = null;
	y.value = 'marko';
	a(ev, null, "Other change: not evented");
	a(r.value, 'elo', "Other change: value");
};
