'use strict';

var isObservable = require('./is-observable-value');

module.exports = function (value) {
	if (!isObservable(value)) {
		throw new TypeError(value + " is not an observable value");
	}
	return value;
};
