'use strict';

var toStringTagSymbol = require('es6-symbol').toStringTag;

module.exports = function (value) {
	return Boolean(value && (value[toStringTagSymbol] === 'ObservableValue'));
};
