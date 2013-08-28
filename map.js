'use strict';

var callable  = require('es5-ext/object/valid-callable')
  , memoize   = require('memoizee/lib/regular')
  , Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (value, cb/*, thisArg */) {
	var map, thisArg = arguments[2];
	callable(cb);
	if (!isMutable(value)) return cb.call(thisArg, value);
	cb = memoize(cb.bind(thisArg), { length: 1 });
	map = new Mutable(cb(value.value));
	value.on('change', function (nu) { map.value = cb(nu, value); });
	return map;
};
