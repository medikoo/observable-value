'use strict';

module.exports = function (value) {
	return Boolean(value && value._isObservableValue_);
};
