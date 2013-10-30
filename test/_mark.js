'use strict';

var ee = require('event-emitter/lib/core')
  , is = require('../is');

module.exports = function (t, a) {
	var x;
	a.throws(function () { t(); }, "No value");
	a.throws(function () { t({}); }, "No emitter");
	a.throws(function () { t(ee()); }, "No value dscr");
	x = ee();
	x.value = 'raz';
	a(is(x), false, "Not yet mutable");
	a(t(x), x, "Returns self");
	a(is(x), true, "Observable");
};
