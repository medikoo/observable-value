'use strict';

var Observable   = require('./value')
  , isObservable = require('./is');

module.exports = function (value) {
	var not, current;
	if (!isObservable(value)) return !value;
	current = !value.value;
	not = new Observable(current);
	value.on('change', function (nu) {
		nu = !nu;
		if (nu === current) return;
		not.value = current = nu;
	});
	return not;
};
