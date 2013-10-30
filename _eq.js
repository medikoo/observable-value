'use strict';

var Observable   = require('./value')
  , isObservable = require('./is');

module.exports = function (compare) {
	return function (left, right) {
		var isLObservable, isRObservable, value;
		isLObservable = isObservable(left);
		isRObservable = isObservable(right);
		if (!isLObservable && !isRObservable) return compare(left, right);
		if (isLObservable) {
			left.on('change', function (l) {
				value.value = compare(l, isRObservable ? right.value : right);
			});
		}
		if (isRObservable) {
			right.on('change', function (r) {
				value.value = compare(isLObservable ? left.value : left, r);
			});
		}
		value = new Observable(compare(isLObservable ? left.value : left,
			isRObservable ? right.value : right));
		return value;
	};
};
