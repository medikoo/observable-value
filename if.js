'use strict';

var Observable   = require('./')
  , isObservable = require('./is-observable-value');

module.exports = function (cond, onTrue, onFalse) {
	var isTObservable, isFObservable, value;
	if (!isObservable(cond)) return cond ? onTrue : onFalse;

	isTObservable = isObservable(onTrue);
	isFObservable = isObservable(onFalse);
	if (isTObservable) {
		onTrue.on('change', function (event) {
			if (!cond.value) return;
			value.value = event.newValue;
		});
	}
	if (isFObservable) {
		onFalse.on('change', function (event) {
			if (cond.value) return;
			value.value = event.newValue;
		});
	}
	cond.on('change', function (event) {
		if (event.newValue) value.value = isTObservable ? onTrue.value : onTrue;
		else value.value = isFObservable ? onFalse.value : onFalse;
	});
	if (cond.value) value = isTObservable ? onTrue.value : onTrue;
	else value = isFObservable ? onFalse.value : onFalse;
	value = new Observable(value);
	return value;
};
