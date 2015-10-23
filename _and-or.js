'use strict';

var Observable   = require('./')
  , isObservable = require('./is-observable-value')

  , some = Array.prototype.some;

module.exports = function (map) {
	return function (a, b/* …other*/) {
		var value = map(), makeObservable, onChange
		  , values = arguments, l = values.length, current = l - 1;

		onChange = function (event) {
			var i = 0, val, nu = event.newValue, old = event.oldValue;
			if (Boolean(nu) === Boolean(old)) {
				if (this !== current) return;
				value.value = nu;
				return;
			}
			if (this > current) return;
			if (map(nu)) {
				current = this;
				value.value = nu;
				return;
			}
			for (i = current + 1; i < l; ++i) {
				val = isObservable(values[i]) ? values[i].value : values[i];
				if (map(val)) {
					current = i;
					value.value = val;
					return;
				}
			}
			current = l - 1;
			value.value = isObservable(values[l - 1]) ? values[l - 1].value :
					values[l - 1];
		};

		if (some.call(values, function (arg, index) {
				if (isObservable(arg)) {
					makeObservable = true;
					arg.on('change', onChange.bind(index));
					if (map(arg.value) && !map(value)) {
						value = arg.value;
						current = index;
					}
					return;
				}
				if (map(arg) && !map(value)) {
					value = arg;
					if (!makeObservable) return true;
					current = index;
				}
			})) {
			return value;
		}

		if (!makeObservable) return l ? values[l - 1] : undefined;
		if (!map(value)) {
			value = isObservable(values[l - 1]) ? values[l - 1].value : values[l - 1];
		}
		value = new Observable(value);
		return value;
	};
};
