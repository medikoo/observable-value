'use strict';

var assign             = require('es5-ext/object/assign')
  , d                  = require('d')
  , autoBind           = require('d/auto-bind')
  , lazy               = require('d/lazy')
  , toStringTagSymbol  = require('es6-symbol').toStringTag
  , ee                 = require('event-emitter')
  , is                 = require('./is-observable-value')
  , isObservableSymbol = require('./symbol-is-observable')

  , push = Array.prototype.push, defineProperty = Object.defineProperty
  , toMethod, Observable;

toMethod = function (fn) {
	return function (arg) {
		var args = [this];
		push.apply(args, arguments);
		return fn.apply(null, args);
	};
};

module.exports = Observable = function (value) {
	if (!(this instanceof Observable)) return new Observable(value);
	if (is(value)) {
		defineProperty(this, '__link__', d(value));
		value.on('change', this._linkedObserver);
		value = value.value;
	}
	defineProperty(this, '__value__', d('w', value));
};

Object.defineProperties(ee(Observable.prototype), assign({
	value: d.gs(function () { return this.__value__; }, function (nu) {
		var old = this.__value__, isOldObservable = this.hasOwnProperty('__link__');
		if (isOldObservable) {
			if (nu === this.__link__) return;
			this.__link__.off('change', this._linkedObserver);
		}
		if (is(nu)) {
			if (isOldObservable) this.__link__ = nu;
			else defineProperty(this, '__link__', d(nu));
			nu.on('change', this._linkedObserver);
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
			this.emit('change', { type: 'change', newValue: nu, oldValue: old, target: this });
			return;
		}
		event = this.__postponedEvent__;
		if (!event) {
			this.__postponedEvent__ = { type: 'change', newValue: nu, oldValue: old, target: this };
			return;
		}
		if (event.oldValue === nu) {
			this.__postponedEvent__ = null;
			return;
		}
		event.newValue = nu;
	}),
	add: d(toMethod(require('./add'))),
	and: d(toMethod(require('./and'))),
	eq: d(toMethod(require('./eq'))),
	eqSloppy: d(toMethod(require('./eq-sloppy'))),
	gtOrEq: d(toMethod(require('./gt-or-eq'))),
	gt: d(toMethod(require('./gt'))),
	ltOrEq: d(toMethod(require('./lt-or-eq'))),
	lt: d(toMethod(require('./lt'))),
	map: d(toMethod(require('./map'))),
	not: d(toMethod(require('./not'))),
	or: d(toMethod(require('./or'))),
	subtract: d(toMethod(require('./subtract'))),
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
		this.emit('change', event);
	})
}, autoBind({
	_linkedObserver: d('', function (event) {
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
