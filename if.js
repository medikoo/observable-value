'use strict';

var Observable   = require('./value')
  , isObservable = require('./is');

module.exports = function (cond, onTrue, onFalse) {
	var isTObservable, isFObservable, value;
	if (!isObservable(cond)) return cond ? onTrue : onFalse;

	isTObservable = isObservable(onTrue);
	isFObservable = isObservable(onFalse);
	if (isTObservable) {
		onTrue.on('change', function (t) {
			if (!cond.value) return;
			value.value = t;
		});
	}
	if (isFObservable) {
		onFalse.on('change', function (f) {
			if (cond.value) return;
			value.value = f;
		});
	}
	cond.on('change', function (nu) {
		if (nu) value.value = isTObservable ? onTrue.value : onTrue;
		else value.value = isFObservable ? onFalse.value : onFalse;
	});
	if (cond.value) value = isTObservable ? onTrue.value : onTrue;
	else value = isFObservable ? onFalse.value : onFalse;
	value = new Observable(value);
	return value;
};
