'use strict';

var d            = require('d')
  , Observable   = require('./')
  , isObservable = require('./is-observable-value')

  , slice = Array.prototype.slice
  , defineProperty = Object.defineProperty;

module.exports = function (entry/*, …names*/) {
	var names, add, l, observable;
	if (entry == null) return entry;
	names = slice.call(arguments, 1);
	if (!names.length) return entry;

	while (!isObservable(entry) && names.length) {
		entry = entry[names.shift()];
		if (entry == null) return entry;
	}
	l = names.length;
	if (!l) return entry;

	add = function (value, i, observable) {
		var clear, onChange;
		if (value == null) {
			observable.value = value;
			return;
		}
		if (!isObservable(value)) {
			if (i === l) observable.value = value;
			else return add(value[names[i]], i + 1, observable);
			return;
		}
		value.on('change', onChange = function (event) {
			var nu = event.newValue;
			if (clear) clear();
			if ((i === l) || (nu == null)) observable.value = nu;
			else clear = add(nu[names[i]], i + 1, observable);
		});
		if ((i === l) || (value.value == null)) observable.value = value.value;
		else clear = add(value.value[names[i]], i + 1, observable);
		return function () {
			if (clear) clear();
			value.off('change', onChange);
		};
	};

	observable = new Observable();
	return defineProperty(observable, 'destroy', d(add(entry, 0, observable)));
};
