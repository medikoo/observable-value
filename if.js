'use strict';

var Observable   = require('./')
  , isObservable = require('./is-observable-value')

  , resolveArgument = function (arg) { return (typeof arg === 'function') ? arg() : arg; };

module.exports = function (cond, onTrue, onFalse) {
	var observable, isTrueResolved, isFalseResolved, update;
	if (!isObservable(cond)) return cond ? resolveArgument(onTrue) : resolveArgument(onFalse);
	observable = new Observable();
	update = function (value) {
		if (value) {
			if (isTrueResolved) {
				value = onTrue;
			} else {
				value = onTrue = resolveArgument(onTrue);
				isTrueResolved = true;
			}
		} else {
			if (isFalseResolved) {
				value = onFalse;
			} else {
				value = onFalse = resolveArgument(onFalse);
				isFalseResolved = true;
			}
		}
		observable.value = value;
	};
	update(cond.value);
	cond.on('change', function (event) { update(event.newValue); });
	return observable;
};
