'use strict';

var Observable   = require('./')
  , isObservable = require('./is-observable-value');

module.exports = function (compare) {
	return function (left, right) {
		var isLObservable, isRObservable, value;
		isLObservable = isObservable(left);
		isRObservable = isObservable(right);
		if (!isLObservable && !isRObservable) return compare(left, right);
		if (isLObservable) {
			left.on('change', function (event) {
				value.value = compare(event.newValue,
					isRObservable ? right.value : right);
			});
		}
		if (isRObservable) {
			right.on('change', function (event) {
				value.value = compare(isLObservable ? left.value : left,
					event.newValue);
			});
		}
		value = new Observable(compare(isLObservable ? left.value : left,
			isRObservable ? right.value : right));
		return value;
	};
};
