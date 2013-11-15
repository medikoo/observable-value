'use strict';

var isObservableSymbol = require('./symbol-is-observable');

module.exports = function (value) {
	return Boolean(value && value[isObservableSymbol]);
};
