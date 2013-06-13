'use strict';

var d = require('es5-ext/lib/Object/descriptor')
  , ee = require('event-emitter/lib/core')

  , defineProperty = Object.defineProperty
  , idDscr = d(true)
  , _valueDscr = d()

  , valueDscr, Mutable;

valueDscr = d.gs('ec', function () { return this._value; }, function (nu) {
	var old = this._value;
	if (!this.hasOwnProperty('_value')) {
		_valueDscr.value = nu;
		defineProperty(this, '_value', _valueDscr);
	} else {
		this._value = nu;
	}
	if (nu !== old) this.emit('change', nu);
});

Mutable = function () {};
Object.defineProperties(ee(Mutable.prototype), {
	_isMutableEmitterValue_: idDscr,
	value: valueDscr,
	toString: d(function () { return String(this._value); })
});

module.exports = function (value) {
	if (value == null) return new Mutable();
	if (!value.on || !value.off) ee(value);
	if (!('value' in value)) defineProperty(value, 'value', valueDscr);
	return defineProperty(value, '_isMutableEmitterValue_', idDscr);
};
