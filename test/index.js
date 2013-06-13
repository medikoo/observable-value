'use strict';

var is = require('../is');

module.exports = function (t, a) {
	var value = t(), invoked = false, x = {};
	a(is(value), true, "Create");
	value.on('change', function () { invoked = true; });
	a(invoked, false, "Pre emit");
	value.emit('change');
	a(invoked, true, "After emit");

	invoked = false;
	value = t(x);
	a(x, value, "Extend");
	a(is(value), true, "No args");
	value.on('change', function () { invoked = true; });
	a(invoked, false, "Pre emit");
	value.emit('change');
	a(invoked, true, "After emit");
};
