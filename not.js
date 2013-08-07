'use strict';

var Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (value) {
	var not, current;
	if (!isMutable(value)) return !value;
	current = !value.value;
	not = new Mutable(current);
	value.on('change', function (nu) {
		nu = !nu;
		if (nu === current) return;
		not.value = current = nu;
	});
	return not;
};
