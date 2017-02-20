"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _autobind = require("./autobind");

var _autobind2 = _interopRequireDefault(_autobind);

var _actions = require("./actions");

var _TableHeaderFilter = require("./TableHeaderFilter");

var _TableHeaderFilter2 = _interopRequireDefault(_TableHeaderFilter);

var _DropdownMenu = require("./DropdownMenu");

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _columnsHelper = require("./columnsHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeader = function (_React$Component) {
	_inherits(TableHeader, _React$Component);

	function TableHeader(props) {
		_classCallCheck(this, TableHeader);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableHeader).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(TableHeader, [{
		key: "renderSortArrow",
		value: function renderSortArrow(name) {
			if (this.props.model.sort.columns[name] === 'DESC') {
				return _react2.default.createElement("i", { className: this.props.model.icon.sortDownIcon });
			} else if (this.props.model.sort.columns[name] === 'ASC') {
				return _react2.default.createElement("i", { className: this.props.model.icon.sortUpIcon });
			} else {
				return null;
			}
		}
	}, {
		key: "onTableClick",
		value: function onTableClick(name) {
			this.props.onEvent({ eventName: _actions.HEADER_CLICK, columnName: name });
		}
	}, {
		key: "renderTitleCell",
		value: function renderTitleCell(column) {
			if (column.show) {
				var style = {};
				if (column.width && !this.props.model.narrow) {
					style.width = column.width;
				}
				return _react2.default.createElement(
					"th",
					{
						className: "table-header-" + column.name,
						key: column.name,
						style: style,
						onClick: this.onTableClick.bind(this, column.name) },
					_react2.default.createElement(
						"span",
						{ className: "ellipsis-clip" },
						column.label ? column.label : column.name,
						_react2.default.createElement(
							"span",
							{ className: "pull-right" },
							this.renderSortArrow(column.name)
						)
					)
				);
			} else {
				return null;
			}
		}
	}, {
		key: "renderTitleCells",
		value: function renderTitleCells() {
			if (!this.props.model.narrow) {
				return (0, _columnsHelper.getColumnsToRender)(this.props.model.columns).map(this.renderTitleCell);
			}
		}
	}, {
		key: "onActionButtonClick",
		value: function onActionButtonClick(name, e) {
			e.preventDefault();
			e.stopPropagation();
			var event = {
				eventName: _actions.HEADER_BUTTON_CLICK,
				buttonName: name
			};
			this.props.onEvent(event);
		}
	}, {
		key: "renderTitleButton",
		value: function renderTitleButton(name) {
			var action = this.props.model.headerActions[name];
			if (action.icon) {
				return _react2.default.createElement(
					"button",
					{ key: name,
						className: "btn btn-xs btn-default",
						onClick: this.onActionButtonClick.bind(this, name),
						title: action.label },
					_react2.default.createElement("i", { className: action.icon })
				);
			} else {
				return _react2.default.createElement(
					"button",
					{
						onClick: this.onActionButtonClick.bind(this, name),
						key: name,
						className: "btn btn-xs btn-default" },
					action.label
				);
			}
		}
	}, {
		key: "renderTitleHeaderActions",
		value: function renderTitleHeaderActions() {
			if (this.props.model.headerActions) {
				return Object.keys(this.props.model.headerActions).map(this.renderTitleButton);
			} else {
				return null;
			}
		}
	}, {
		key: "renderTitleButtons",
		value: function renderTitleButtons() {
			if (Object.keys(this.props.model.headerActions).length > 0) {
				return _react2.default.createElement(
					"div",
					{ className: "btn-group", role: "group" },
					this.renderTitleHeaderActions()
				);
			} else {
				return null;
			}
		}
	}, {
		key: "renderColumnsSettingsMenu",
		value: function renderColumnsSettingsMenu() {
			var _this2 = this;

			if (!this.props.model.settings.editableColumns) {
				return null;
			}
			var items = Object.keys(this.props.model.columns).map(function (columnName) {
				var label = columnName;
				if (_this2.props.model.columns[columnName].hasOwnProperty('label')) {
					label = _this2.props.model.columns[columnName].label;
				}
				return {
					label: label,
					type: 'checker',
					name: columnName
				};
			});
			return _react2.default.createElement(_DropdownMenu2.default, {
				items: items,
				icon: this.props.model.icons.menuIcon,
				model: this.props.model,
				name: "column-settings",
				menuClassName: "dropdown-menu-right",
				label: "Columns",
				onEvent: this.props.onEvent,
				selected: (0, _columnsHelper.getColumnsToRender)(this.props.model.columns).map(function (c) {
					return c.name;
				})
			});
		}
	}, {
		key: "renderTitleForNarrow",
		value: function renderTitleForNarrow() {
			var columnsToRender = (0, _columnsHelper.getColumnsToRender)(this.props.model.columns);
			if (this.props.model.narrow && columnsToRender.length === 1) {
				return _react2.default.createElement(
					"span",
					{ className: "single-column" },
					columnsToRender[0].label || columnsToRender[0].name
				);
			} else {
				return null;
			}
		}
	}, {
		key: "renderTitleHeader",
		value: function renderTitleHeader() {
			var style = {};
			if (!this.props.model.narrow) {
				style.width = this.props.actionColumnWidth + 'px';
			}
			return _react2.default.createElement(
				"tr",
				{ className: "table-header" },
				this.renderTitleCells(),
				_react2.default.createElement(
					"th",
					{ className: "column-right", style: style },
					this.renderTitleForNarrow(),
					this.renderTitleButtons(),
					' ',
					this.renderColumnsSettingsMenu()
				)
			);
		}
	}, {
		key: "renderFilterHeader",
		value: function renderFilterHeader() {
			if (this.props.model.settings.filterHeader) {
				return _react2.default.createElement(_TableHeaderFilter2.default, this.props);
			} else {
				return null;
			}
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"thead",
				null,
				this.renderTitleHeader(),
				this.renderFilterHeader()
			);
		}
	}]);

	return TableHeader;
}(_react2.default.Component);

TableHeader.propTypes = {
	model: _react2.default.PropTypes.shape({
		sort: _react2.default.PropTypes.shape({
			order: _react2.default.PropTypes.array.isRequired,
			columns: _react2.default.PropTypes.object.isRequired
		}).isRequired,
		columns: _react2.default.PropTypes.object.isRequired,
		headerActions: _react2.default.PropTypes.object.isRequired,
		settings: _react2.default.PropTypes.shape({
			filterHeader: _react2.default.PropTypes.bool.isRequired,
			editableColumns: _react2.default.PropTypes.bool.isRequired
		}).isRequired,
		narrow: _react2.default.PropTypes.bool.isRequired
	}),
	actionColumnWidth: _react2.default.PropTypes.number.isRequired,
	onEvent: _react2.default.PropTypes.func
};

exports.default = TableHeader;