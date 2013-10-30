'use strict';

var value    = require('es5-ext/object/valid-value')
  , callable = require('es5-ext/object/valid-callable')

  , defineProperty = Object.defineProperty
  , idDscr = { value: true, enumerable: false, configurable: false,
		writable: false };

module.exports = function (obj) {
	(value(obj) && callable(obj.on) && callable(obj.off));
	if (!('value' in obj)) throw new TypeError("'value' property not defined");
	return defineProperty(obj, '_isObservableValue_', idDscr);
};
