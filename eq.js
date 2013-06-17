'use strict';

var isEqual   = require('es5-ext/lib/Object/is')
  , mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (left, right) {
	var isLMutable, isRMutable, value;
	isLMutable = isMutable(left);
	isRMutable = isMutable(right);
	if (!isLMutable && !isRMutable) return isEqual(left, right);
	if (isLMutable) {
		left.on('change', function (l) {
			value.value = isEqual(l, isRMutable ? right.value : right);
		});
	}
	if (isRMutable) {
		right.on('change', function (r) {
			value.value = isEqual(isLMutable ? left.value : left, r);
		});
	}
	value = mutable();
	value.value = isEqual(isLMutable ? left.value : left,
		isRMutable ? right.value : right);
	return value;
};
