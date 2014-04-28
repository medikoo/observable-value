'use strict';

var ObservableValue = require('../');

module.exports = function (t, a) {
	var observable;
	a.throws(function () { t(undefined); }, TypeError, "Undefined");
	a.throws(function () { t(null); }, TypeError, "Null");
	a.throws(function () { t(true); }, TypeError, "Primitive");
	a.throws(function () { t('raz'); }, TypeError, "String");
	a.throws(function () { t({}); }, TypeError, "Object");
	a.throws(function () { t([]); }, TypeError, "Array");
	a.throws(function () { t(function () {}); }, TypeError, "Function");
	observable = new ObservableValue();
	a(t(observable), observable, "Observable");
};
