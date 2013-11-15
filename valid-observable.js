'use strict';

var isObservable = require('./is-observable');

module.exports = function (value) {
	if (!isObservable(value)) {
		throw new TypeError(value + " is not an observable");
	}
	return value;
};
