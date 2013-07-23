'use strict';

var Mutable   = require('./')
  , isMutable = require('./is')

  , some = Array.prototype.some;

module.exports = function (map) {
	return function (a, b/* …other*/) {
		var value = map(), makeMutable, onChange, current = Infinity
		  , values = arguments, l = values.length;

		onChange = function (nu, old) {
			var i = 0, val;
			if (Boolean(nu) === Boolean(old)) return;
			if (this > current) return;
			if (map(nu)) {
				current = this;
				value.value = nu;
				return;
			}
			for (i = current + 1; i < l; ++i) {
				val = isMutable(values[i]) ? values[i].value : values[i];
				if (map(val)) {
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
					if (map(arg.value) && !map(value)) {
						value = arg.value;
						current = index;
					}
					return;
				}
				if (map(arg) && !map(value)) {
					value = arg;
					if (!makeMutable) return true;
					current = index;
				}
			})) {
			return value;
		}

		if (!makeMutable) return l ? values[l - 1] : undefined;
		if (!map(value)) {
			value = isMutable(values[l - 1]) ? values[l - 1].value : values[l - 1];
		}
		value = new Mutable(value);
		return value;
	};
};
