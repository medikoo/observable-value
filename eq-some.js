'use strict';

var validValue    = require('es5-ext/object/valid-value')
  , d             = require('d')
  , memoize       = require('memoizee/plain')
  , getNormalizer = require('memoizee/normalizers/get-1')
  , Observable    = require('./')
  , isObservable  = require('./is-observable-value')
  , eq            = require('./eq')

  , some = Array.prototype.some, defineProperty = Object.defineProperty
  , EqSome;

EqSome = function (list, value) {
	this.testee = value;
	this.list = validValue(list);
	this._listeners = [];
	if (isObservable(list)) {
		this.addItem = memoize(this.addItem.bind(this), { normalizer: getNormalizer() });
		this._listeners.push(this.addItem.clearAll);
		this.updateList = this.updateList.bind(this);
		list.on('change', this.updateList);
		this._listeners.push(list.off.bind(list, 'change', this.updateList));
	}
	defineProperty(this, '__value__', d('w', false));
	this.updateList();
};

EqSome.prototype = Object.create(Observable.prototype, {
	constructor: d(EqSome),
	_isObservable: d(null),
	_count: d(0),
	addItem: d(function (item) {
		var current, listener;
		item = eq(item, this.testee);
		if (!isObservable(item)) {
			if (item) {
				this._isObservable = false;
				this.value = true;
				this.clear();
				return true;
			}
			return false;
		}
		this._isObservable = true;
		item.on('change', listener = function (event) {
			var nu = event.newValue;
			if (current === nu) return;
			current = nu;
			if (nu) {
				if (++this._count === 1) this.value = true;
			} else if (!--this._count) {
				this.value = false;
			}
		}.bind(this));
		this._listeners.push(item.off.bind(item, 'change', listener));
		current = item.value;
		if (current && (++this._count === 1)) this.value = true;
		return false;
	}),
	clear: d(function () {
		if (!this._listeners) return;
		this._listeners.forEach(function (listener) { listener(); });
		delete this._listeners;
	}),
	updateList: d(function () {
		some.call(this.list, this.addItem, this);
	})
});

module.exports = function (list, value) {
	var mutable = new EqSome(list, value);
	if (mutable._isObservable) return mutable;
	mutable.clear();
	return mutable.value;
};
