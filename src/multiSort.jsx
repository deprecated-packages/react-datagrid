export default function (order, columns, a, b) {
	for (let i = 0; i < order.length; i++) {
		let prop = order[i];
		let dir = columns[prop];
		if (a[prop] !== b[prop]) {
			if (dir === 'ASC') {
				return a[prop] < b[prop] ? -1 : 1;
			} else {
				return a[prop] > b[prop] ? -1 : 1;
			}
		}
	}
	return 0;
}