'use strict';

var Observable   = require('./')
  , isObservable = require('./is-observable-value')

  , slice = Array.prototype.slice;

module.exports = function (reducer, initial) {
	return function (first, second/* …others*/) {
		var value, resolveRest, makeObservable, onChange, resolve, rest
		  , l = arguments.length;

		if (!l) return initial;
		if (l === 1) return first;
		rest = slice.call(arguments, 1);

		onChange = function (event) { value.value = rest.reduce(resolveRest, resolve(first)); };
		resolve = function (arg) {
			if (!isObservable(arg)) return arg;
			makeObservable = true;
			arg.on('change', onChange);
			return arg.value;
		};
		value = rest.reduce(resolveRest = function (value, arg) {
			return reducer(value, resolve(arg));
		}, resolve(first));
		if (!makeObservable) return value;
		resolve = function (arg) { return isObservable(arg) ? arg.value : arg; };
		return (value = new Observable(value));
	};
};
