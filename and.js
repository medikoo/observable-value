'use strict';

var Mutable   = require('./')
  , isMutable = require('./is')

  , forEach = Array.prototype.forEach;

module.exports = function (a, b/* …other*/) {
	var value, makeMutable, onChange, state = 0, l = arguments.length;

	if (!l) return false;

	onChange = function (nu, old) {
		if (Boolean(nu) === Boolean(old)) return;
		if (nu) {
			if (++state === l) value.value = true;
		} else if (state-- === l) {
			value.value = false;
		}
	};

	forEach.call(arguments, function (arg) {
		if (isMutable(arg)) {
			makeMutable = true;
			arg.on('change', onChange);
			if (arg.value) ++state;
			return;
		}
		if (arg) ++state;
	});

	if (!makeMutable) return (state === l);
	value = new Mutable(state === l);
	return value;
};
