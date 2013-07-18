'use strict';

var Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (a, b) {
	var isAMutable, isBMutable, value;
	isAMutable = isMutable(a);
	isBMutable = isMutable(b);
	if (!isAMutable && !isBMutable) return Boolean(a && b);
	if (isAMutable) {
		a.on('change', function (a) {
			value.value = Boolean(a && (isBMutable ? b.value : b));
		});
	}
	if (isBMutable) {
		b.on('change', function (b) {
			value.value = Boolean((isAMutable ? a.value : a) && b);
		});
	}
	value = new Mutable(Boolean((isAMutable ? a.value : a) &&
		(isBMutable ? b.value : b)));
	return value;
};
