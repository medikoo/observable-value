'use strict';

var Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (cond, onTrue, onFalse) {
	var isTMutable, isFMutable, value;
	if (!isMutable(cond)) return cond ? onTrue : onFalse;

	isTMutable = isMutable(onTrue);
	isFMutable = isMutable(onFalse);
	if (isTMutable) {
		onTrue.on('change', function (t) {
			if (!cond.value) return;
			value.value = t;
		});
	}
	if (isFMutable) {
		onFalse.on('change', function (f) {
			if (cond.value) return;
			value.value = f;
		});
	}
	cond.on('change', function (nu) {
		if (nu) value.value = isTMutable ? onTrue.value : onTrue;
		else value.value = isFMutable ? onFalse.value : onFalse;
	});
	if (cond.value) value = isTMutable ? onTrue.value : onTrue;
	else value = isFMutable ? onFalse.value : onFalse;
	value = new Mutable(value);
	return value;
};
