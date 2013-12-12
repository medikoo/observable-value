'use strict';

var assign             = require('es5-ext/object/assign-multiple')
  , d                  = require('d/d')
  , autoBind           = require('d/auto-bind')
  , lazy               = require('d/lazy')
  , toStringTagSymbol  = require('es6-symbol').toStringTag
  , ee                 = require('event-emitter/lib/core')
  , is                 = require('./is-observable-value')
  , isObservableSymbol = require('./symbol-is-observable')

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
		if (nu !== old) this._emit_(nu, old);
	}),
	_emit_: d(function (nu, old) {
		var event;
		if (!this.__postponed__) {
			this.emit('change', { type: 'change', newValue: nu, oldValue: old });
			return;
		}
		event = this.__postponedEvent__;
		if (!event) {
			this.__postponedEvent__ = { newValue: nu, oldValue: old };
			return;
		}
		if (event.oldValue === nu) {
			this.__postponedEvent__ = null;
			return;
		}
		event.newValue = nu;
	}),
	toString: d(function () { return String(this.__value__); }),
	_postponed_: d.gs(function () {
		return this.__postponed__;
	}, function (value) {
		var event;
		this.__postponed__ = value;
		if (value) return;
		event = this.__postponedEvent__;
		if (!event) return;
		this.__postponedEvent__ = null;
		event.type = 'change';
		this.emit('change', event);
	})
}, autoBind({
	_mutableListener: d('', function (event) {
		this.__value__ = event.newValue;
		this.emit('change', event);
	})
}), lazy({
	__postponed__: d('w', 0),
	__postponedEvent__: d('w', null)
})));
defineProperty(Observable.prototype, toStringTagSymbol,
	d('c', 'ObservableValue'));
defineProperty(Observable.prototype, isObservableSymbol, d('', true));
