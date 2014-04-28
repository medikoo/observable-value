'use strict';

var ee         = require('event-emitter')
  , Observable = require('../');

module.exports = function (t, a) {
	var x = {};
	a(t(new Observable()), true, "Auto created");
	a(t(x), false, "Plain object");
	a(t(ee(x)), false, "Emitter");
	a(t(new Observable(x)), true, "Observable value");
};
