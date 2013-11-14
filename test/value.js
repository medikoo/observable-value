'use strict';

var is = require('../is');

module.exports = function (T, a) {
	var value = new T(), invoked = false, x = {};
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
};
