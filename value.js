'use strict';

var assign   = require('es5-ext/object/assign')
  , d        = require('d/d')
  , autoBind = require('d/auto-bind')
  , ee       = require('event-emitter/lib/core')
  , is       = require('./is')

  , defineProperty = Object.defineProperty
  , Observable;

module.exports = Observable = function (value) {
	if (!(this instanceof Observable)) return new Observable(value);
	if (is(value)) {
		defineProperty(this, '__link__', d(value));
		value.on('change', this._mutableListener);
		value = value.value;
	}
	defineProperty(this, '__value__', d('w', value));
};
Object.defineProperties(ee(Observable.prototype), assign({
	value: d.gs(function () { return this.__value__; }, function (nu) {
		var old = this.__value__, isOldObservable = this.hasOwnProperty('__link__');
		if (isOldObservable) {
			if (nu === this.__link__) return;
			this.__link__.off('change', this._mutableListener);
		}
		if (is(nu)) {
			if (isOldObservable) this.__link__ = nu;
			else defineProperty(this, '__link__', d(nu));
			nu.on('change', this._mutableListener);
			this.__value__ = nu = nu.value;
		} else {
			if (isOldObservable) delete this.__link__;
			this.__value__ = nu;
		}
		if (nu !== old) {
			this.emit('change', {
				type: 'change',
				newValue: nu,
				oldValue: old
			});
		}
	}),
	'@@toStringTag': d('c', 'ObservableValue'),
	toString: d(function () { return String(this.__value__); })
}, autoBind({
	_mutableListener: d('', function (event) {
		this.__value__ = event.newValue;
		this.emit('change', event);
	})
})));
