'use strict';

var Mutable   = require('./')
  , isMutable = require('./is')

  , some = Array.prototype.some;

module.exports = function (a, b/* …other*/) {
	var value, makeMutable, onChange, current = Infinity
	  , values = arguments, l = values.length;

	onChange = function (nu, old) {
		var i = 0, val;
		if (Boolean(nu) === Boolean(old)) return;
		if (this > current) return;
		if (nu) {
			current = this;
			value.value = nu;
			return;
		}
		for (i = current + 1; i < l; ++i) {
			val = isMutable(values[i]) ? values[i].value : values[i];
			if (val) {
				current = i;
				value.value = val;
				return;
			}
		}
		current = Infinity;
		value.value = isMutable(values[l - 1]) ? values[l - 1].value :
				values[l - 1];
	};

	if (some.call(values, function (arg, index) {
			if (isMutable(arg)) {
				makeMutable = true;
				arg.on('change', onChange.bind(index));
				if (arg.value && !value) {
					value = arg.value;
					current = index;
				}
				return;
			} else if (arg) {
				if (!value) {
					value = arg;
					current = index;
				}
				if (!makeMutable) return true;
			}
		})) {
		return value;
	}

	if (!makeMutable) return l ? values[l - 1] : undefined;
	if (!value) {
		value = isMutable(values[l - 1]) ? values[l - 1].value : values[l - 1];
	}
	value = new Mutable(value);
	return value;
};
