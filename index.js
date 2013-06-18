'use strict';

var d      = require('es5-ext/lib/Object/descriptor')
  , extend = require('es5-ext/lib/Object/extend')
  , ee     = require('event-emitter/lib/core')
  , mark   = require('./_mark')
  , is     = require('./is')

  , defineProperty = Object.defineProperty
  , Mutable;

module.exports = Mutable = function (value) {
	if (is(value)) {
		defineProperty(this, '_value', d(value));
		value.on('change', this._mutableListener);
		value = value.value;
	}
	defineProperty(this, '__value', d('w', value));
};
mark(Object.defineProperties(ee(Mutable.prototype), extend({
	__value: d('', undefined),
	_value: d('', undefined),
	value: d.gs('ec', function () { return this.__value; }, function (nu) {
		var old = this.__value, isOldMutable = this.hasOwnProperty('_value');
		if (isOldMutable) {
			if (nu === this._value) return;
			this._value.off('change', this._mutableListener);
		}
		if (is(nu)) {
			if (isOldMutable) this._value = nu;
			else defineProperty(this, '_value', d(nu));
			nu.on('change', this._mutableListener);
			this.__value = nu = nu.value;
		} else {
			if (isOldMutable) delete this._value;
			this.__value = nu;
		}
		if (nu !== old) this.emit('change', nu);
	}),
	toString: d(function () { return String(this._value); })
}, d.binder({
	_mutableListener: d('', function (nu) {
		if (this.__value === nu) return;
		this.__value = nu;
		this.emit('change', nu);
	})
}))));
