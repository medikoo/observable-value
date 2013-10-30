'use strict';

var callable     = require('es5-ext/object/valid-callable')
  , memoize      = require('memoizee/lib/regular')
  , Observable   = require('./value')
  , isObservable = require('./is');

module.exports = function (value, cb/*, thisArg */) {
	var map, thisArg = arguments[2];
	callable(cb);
	if (!isObservable(value)) return cb.call(thisArg, value);
	cb = memoize(cb.bind(thisArg), { length: 1 });
	map = new Observable(cb(value.value));
	value.on('change', function (nu) { map.value = cb(nu, value); });
	return map;
};
