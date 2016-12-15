"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _defaultModel = require("./defaultModel");

var _defaultModel2 = _interopRequireDefault(_defaultModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
} /*eslint react/no-multi-comp: 0*/


var names = ["John Doe", "Franta Voprsalek", "Josef Dohnal", "Alois Vosahlo"];
var labels = [[], [2], [2, 1], [1], [3], [1, 2]];
var birthDate = ['1921-12-01', '1978-12-01', '1965-12-01', '1984-12-01', '1995-03-01'];
var messages = ['Hello', 'Hi', 'No cant'];

var model = _defaultModel2.default;
model.idColumn = 'myId';
model.items = [];
for (var i = 0; i < 3123; i++) {
	model.items.push({
		myId: i + 1,
		name: names[getRandomInt(0, names.length)],
		message: messages[getRandomInt(0, messages.length)],
		birthDate: birthDate[getRandomInt(0, birthDate.length)],
		labels: labels[getRandomInt(0, labels.length)]
	});
}
model.edit = {
	selected: [1],
	buttons: {
		cancel: {
			label: 'cancel',
			icon: 'icon-remove'
		},
		edit: {
			label: 'save',
			icon: 'icon-save'
		}
	}
};
model.dataSources = {
	labels: [{
		id: 1,
		name: 'Good',
		color: 'green'
	}, {
		id: 2,
		name: 'Bad',
		color: 'red'
	}, {
		id: 3,
		name: 'VIP',
		color: 'blue'
	}]
};
model.columns = {
	myId: {
		label: '#', //default key name myId
		show: true, //default false
		width: '40px',
		position: 1,
		render: function render(value) {
			return _react2.default.createElement(
				"div",
				null,
				"#",
				value
			);
		} //default CellRender
	},
	name: {
		label: 'Jméno Příjmení',
		position: 2,
		width: '150px',
		show: true,
		render: function render(value) {
			return _react2.default.createElement(
				"span",
				null,
				"/",
				value,
				"/"
			);
		}
	},
	birthDate: {
		label: 'Věk',
		position: 4,
		show: true,
		width: '100px',
		render: function render(value) {
			return _react2.default.createElement(
				"div",
				null,
				(0, _moment2.default)(value).fromNow()
			);
		}
	},
	message: {
		show: true,
		position: 5,
		label: 'Zpráva'
	},
	active: {
		show: true,
		position: 6,
		label: 'Active',
		editType: 'checkbox'
	},
	labels: {
		position: 7,
		dataSource: 'labels',
		labelId: 'name',
		valueId: 'id',
		id: 'id', //default id
		show: true,
		multi: true,
		clearable: false,
		render: function render(labels) {
			return _react2.default.createElement(
				"div",
				null,
				labels.map(function (label) {
					return _react2.default.createElement(
						"span",
						{ key: label.id, className: "label",
							style: { backgroundColor: label.color, color: 'white' } },
						label.name
					);
				})
			);
		}
	}
};
model.headerActions = {
	edit: {
		label: 'Přidat',
		icon: 'icon-plus'
	},
	filter: {
		label: 'Filtrovat',
		icon: 'icon-filter'
	}
};
model.actions = {
	edit: {
		label: 'Upravit',
		icon: 'icon-edit'
	}
};
model.settings = {
	header: true,
	filterHeader: false,
	footer: true,
	title: true,
	editableColumns: true
};
model.labels = {
	title: 'Uživatelé',
	records: 'záznamů',
	filter: 'Filtrovat',
	itemsPerPage: 'na stránku',
	clearFilter: 'Zruš filtr'
};
model.pager = {
	currentPageSize: 10,
	currentPage: 1,
	count: model.items.length
};
model.narrow = true;
exports.default = model;