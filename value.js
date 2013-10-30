'use strict';

var assign   = require('es5-ext/object/assign')
  , d        = require('d/d')
  , autoBind = require('d/auto-bind')
  , ee       = require('event-emitter/lib/core')
  , mark     = require('./_mark')
  , is       = require('./is')

  , defineProperty = Object.defineProperty
  , Observable;

module.exports = Observable = function (value) {
	if (is(value)) return value;
	if (!(this instanceof Observable)) return new Observable(value);
	defineProperty(this, '__value', d('w', value));
};
mark(Object.defineProperties(ee(Observable.prototype), assign({
	__value: d('', undefined),
	_value: d('', undefined),
	value: d.gs('ec', function () { return this.__value; }, function (nu) {
		var old = this.__value, isOldObservable = this.hasOwnProperty('_value');
		if (isOldObservable) {
			if (nu === this._value) return;
			this._value.off('change', this._mutableListener);
		}
		if (is(nu)) {
			if (isOldObservable) this._value = nu;
			else defineProperty(this, '_value', d(nu));
			nu.on('change', this._mutableListener);
			this.__value = nu = nu.value;
		} else {
			if (isOldObservable) delete this._value;
			this.__value = nu;
		}
		if (nu !== old) this.emit('change', nu, old);
	}),
	toString: d(function () { return String(this.__value); })
}, autoBind({
	_mutableListener: d('', function (nu) {
		if (this.__value === nu) return;
		this.__value = nu;
		this.emit('change', nu);
	})
}))));
