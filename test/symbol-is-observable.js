'use strict';

var isSymbol = require('es6-symbol/is-symbol');

module.exports = function (t, a) { a(isSymbol(t), true); };
