'use strict';

var d    = require('es5-ext/lib/Object/descriptor')
  , ee   = require('event-emitter/lib/core')
  , mark = require('./_mark')

  , defineProperty = Object.defineProperty
  , valueDscr = d()
  , Mutable;

module.exports = Mutable = function (value) {
	if (value === undefined) return;
	valueDscr.value = value;
	defineProperty(this, '_value', valueDscr);
	delete valueDscr.value;
};
mark(Object.defineProperties(ee(Mutable.prototype), {
	_value: valueDscr,
	value: d.gs('ec', function () { return this._value; }, function (nu) {
		var old = this._value;
		if (!this.hasOwnProperty('_value')) {
			valueDscr.value = nu;
			defineProperty(this, '_value', valueDscr);
			delete valueDscr.value;
		} else {
			this._value = nu;
		}
		if (nu !== old) this.emit('change', nu);
	}),
	toString: d(function () { return String(this._value); })
}));
