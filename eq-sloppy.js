'use strict';

var isNaN = require('es5-ext/number/is-nan');

module.exports = require('./_eq')(function (a, b) {
	if (a == b) return true; //jslint: ignore
	return (isNaN(a) && isNaN(b));
});
