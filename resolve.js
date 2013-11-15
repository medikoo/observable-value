'use strict';

var d            = require('d/d')
  , Observable   = require('./value')
  , isObservable = require('./is-observable-value')

  , slice = Array.prototype.slice
  , defineProperty = Object.defineProperty;

module.exports = function (entry/*, …names*/) {
	var names, add, l, mutable;
	if (entry == null) return entry;
	names = slice.call(arguments, 1);
	if (!names.length) return entry;

	while (!isObservable(entry) && names.length) {
		entry = entry[names.shift()];
		if (entry == null) return entry;
	}
	l = names.length;
	if (!l) return entry;

	add = function (value, i, mutable) {
		var clear, onChange;
		if (value == null) {
			mutable.value = value;
			return;
		}
		if (!isObservable(value)) {
			if (i === l) mutable.value = value;
			else return add(value[names[i]], i + 1, mutable);
			return;
		}
		value.on('change', onChange = function (event) {
			var nu = event.newValue;
			if (clear) clear();
			if ((i === l) || (nu == null)) mutable.value = nu;
			else clear = add(nu[names[i]], i + 1, mutable);
		});
		if ((i === l) || (value.value == null)) mutable.value = value.value;
		else clear = add(value.value[names[i]], i + 1, mutable);
		return function () {
			if (clear) clear();
			value.off('change', onChange);
		};
	};

	mutable = new Observable();
	return defineProperty(mutable, 'destroy', d(add(entry, 0, mutable)));
};
