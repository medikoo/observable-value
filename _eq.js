'use strict';

var Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (compare) {
	return function (left, right) {
		var isLMutable, isRMutable, value;
		isLMutable = isMutable(left);
		isRMutable = isMutable(right);
		if (!isLMutable && !isRMutable) return compare(left, right);
		if (isLMutable) {
			left.on('change', function (l) {
				value.value = compare(l, isRMutable ? right.value : right);
			});
		}
		if (isRMutable) {
			right.on('change', function (r) {
				value.value = compare(isLMutable ? left.value : left, r);
			});
		}
		value = new Mutable(compare(isLMutable ? left.value : left,
			isRMutable ? right.value : right));
		return value;
	};
};
