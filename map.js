'use strict';

var callable      = require('es5-ext/object/valid-callable')
  , memoize       = require('memoizee/plain')
  , getNormalizer = require('memoizee/normalizers/get-1')
  , Observable    = require('./')
  , isObservable  = require('./is-observable-value');

module.exports = function (value, cb/*, thisArg */) {
	var map, thisArg = arguments[2];
	callable(cb);
	if (!isObservable(value)) return cb.call(thisArg, value);
	cb = memoize(cb.bind(thisArg), { normalizer: getNormalizer() });
	map = new Observable(cb(value.value));
	value.on('change', function (event) {
		map.value = cb(event.newValue, value);
	});
	return map;
};
