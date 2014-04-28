'use strict';

var Observable        = require('../')
  , isObservableValue = require('../is-observable-value');

module.exports = function (t, a) {
	var ReadOnly = t(Observable), value = new ReadOnly(20);

	a(isObservableValue(value), true, "Observable value");
	a(value instanceof ReadOnly, true, "Subclass");
	a(value.value, 20, "Content");

	a.throws(function () { value.value = 'elo'; }, TypeError, "Set");
	a(value.value, 20, "Content unaltered");

	value._setValue(30);
	a(value.value, 30, "Hidden set");
};
