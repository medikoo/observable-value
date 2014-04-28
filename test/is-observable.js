'use strict';

var ee                 = require('event-emitter')
  , isObservableSymbol = require('../symbol-is-observable')
  , Observable         = require('../');

module.exports = function (t, a) {
	var x = {};
	a(t(new Observable()), true, "Observable");
	a(t(x), false, "Plain object");
	a(t(''), false, "String");
	a(t(function () {}), false, "Function");
	a(t(ee(x)), false, "Emitter");
	x[isObservableSymbol] = true;
	a(t(x), true, "Observable object");
};
