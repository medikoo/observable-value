'use strict';

var Observable   = require('./')
  , isObservable = require('./is-observable-value');

module.exports = function (value) {
	var not, current;
	if (!isObservable(value)) return !value;
	current = !value.value;
	not = new Observable(current);
	value.on('change', function (event) {
		var nu = !event.newValue;
		if (nu === current) return;
		not.value = current = nu;
	});
	return not;
};
