'use strict';

var callable  = require('es5-ext/lib/Object/valid-callable')
  , memoize   = require('memoizee/lib/regular')
  , Mutable   = require('./')
  , isMutable = require('./is');

module.exports = function (value, cb) {
	var map;
	callable(cb);
	if (!isMutable(value)) return cb(value);
	cb = memoize(cb, { length: 1 });
	map = new Mutable(cb(value.value));
	value.on('change', function (value) { map.value = cb(value); });
	return map;
};
