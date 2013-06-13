'use strict';

var ee           = require('event-emitter/lib/core')
  , mutableValue = require('../');

module.exports = function (t, a) {
	var x = {};
	a(t(mutableValue()), true, "Auto created");
	a(t(x), false, "Plain object");
	a(t(ee(x)), false, "Emitter");
	a(t(mutableValue(x)), true, "Mutable value");
};
