'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (order, columns, a, b) {
	for (var i = 0; i < order.length; i++) {
		var prop = order[i];
		var dir = columns[prop];
		if (a[prop] !== b[prop]) {
			if (dir === 'ASC') {
				return a[prop] < b[prop] ? -1 : 1;
			} else {
				return a[prop] > b[prop] ? -1 : 1;
			}
		}
	}
	return 0;
};