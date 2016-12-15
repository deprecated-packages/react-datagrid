function comparePosition(a, b) {
	return a.position - b.position;
}

export function getColumnsToRender(columnsObject) {
	let retval = Object.keys(columnsObject)
		.map(columnName => {
			let item = columnsObject[columnName];
			item.name = columnName;
			if (!item.position) {
				item.position = -1;
			}
			return item;
		}).filter(column => column.show);
	retval.sort(comparePosition);
	return retval;
}