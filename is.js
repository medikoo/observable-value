'use strict';

module.exports = function (value) {
	return Boolean(value && (value['@@toStringTag'] === 'ObservableValue'));
};
