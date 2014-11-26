'use strict';

var is = require('../is-observable-value');

module.exports = function (T, a) {
	var value = new T(), invoked = false, x = {}
	  , o1, o2, o3;
	a(is(value), true, "Create");
	value.on('change', function (event) { invoked = event.newValue; });
	a(invoked, false, "Pre emit");
	value.value = 'raz';
	a(invoked, 'raz', "After emit");

	invoked = false;
	value = new T(x);
	a(value.value, x, "Value");

	value.value = new T('raz');
	a(value.value, 'raz', "Inner mutable");

	o2 = new T(2);
	o3 = new T(3);
	o1 = o2.add(o3);
	a(o1.value, 5);

	o1 = new T(0);
	a(o1.subtract(0).value, 0);
	a(o1.subtract(0, 0).value, 0);
};
