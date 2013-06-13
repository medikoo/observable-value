'use strict';

var ee = require('event-emitter/lib/core')

  , defineProperty = Object.defineProperty
  , dscr = { value: true, enumerable: false, configurable: true,
		writable: true };

module.exports = function (value) {
	if (value == null) value = {};
	if (!value.on || !value.off) ee(value);
	return defineProperty(value, '_isMutableEmitterValue_', dscr);
};
