'use strict';

var ee      = require('event-emitter/lib/core')
  , Mutable = require('../');

module.exports = function (t, a) {
	var x = {};
	a(t(new Mutable()), true, "Auto created");
	a(t(x), false, "Plain object");
	a(t(ee(x)), false, "Emitter");
	a(t(new Mutable(x)), true, "Mutable value");
};
