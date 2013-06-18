'use strict';

var is        = require('es5-ext/lib/Object/is')
  , Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (left, right) {
	var isLMutable, isRMutable, value;
	isLMutable = isMutable(left);
	isRMutable = isMutable(right);
	if (!isLMutable && !isRMutable) return is(left, right);
	if (isLMutable) {
		left.on('change', function (l) {
			value.value = is(l, isRMutable ? right.value : right);
		});
	}
	if (isRMutable) {
		right.on('change', function (r) {
			value.value = is(isLMutable ? left.value : left, r);
		});
	}
	value = new Mutable(is(isLMutable ? left.value : left,
			isRMutable ? right.value : right));
	return value;
};
