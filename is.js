'use strict';

module.exports = function (value) {
	return Boolean(value && value._isMutableEmitterValue_);
};
