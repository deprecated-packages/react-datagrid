"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getColumnsToRender = getColumnsToRender;
function comparePosition(a, b) {
	return a.position - b.position;
}

function getColumnsToRender(columnsObject) {
	var retval = Object.keys(columnsObject).map(function (columnName) {
		var item = columnsObject[columnName];
		item.name = columnName;
		if (!item.position) {
			item.position = -1;
		}
		return item;
	}).filter(function (column) {
		return column.show;
	});
	retval.sort(comparePosition);
	return retval;
}