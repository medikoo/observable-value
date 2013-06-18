'use strict';

var d          = require('es5-ext/lib/Object/descriptor')
  , validValue = require('es5-ext/lib/Object/valid-value')
  , memoize    = require('memoizee/lib/regular')
  , Mutable    = require('./')
  , isMutable  = require('./is')
  , eq         = require('./eq')

  , some = Array.prototype.some, defineProperty = Object.defineProperty
  , EqSome;

EqSome = function (list, value) {
	this.testee = value;
	this.list = validValue(list);
	this._listeners = [];
	if (isMutable(list)) {
		this.addItem = memoize(this.addItem.bind(this));
		this._listeners.push(this.addItem.clearAll);
		this.updateList = this.updateList.bind(this);
		list.on('change', this.updateList);
		this._listeners.push(list.off.bind(list, 'change', this.updateList));
	}
	defineProperty(this, '__value', d('w', false));
	this.updateList();
};

EqSome.prototype = Object.create(Mutable.prototype, {
	constructor: d(EqSome),
	_isMutable: d(null),
	_count: d(0),
	addItem: d(function (item) {
		var current, listener;
		item = eq(item, this.testee);
		if (!isMutable(item)) {
			if (item) {
				this._isMutable = false;
				this.value = true;
				this.clear();
				return true;
			}
			return false;
		}
		this._isMutable = true;
		item.on('change', listener = function (nu) {
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
	if (mutable._isMutable) return mutable;
	mutable.clear();
	return mutable.value;
};
