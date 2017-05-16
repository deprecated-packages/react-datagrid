"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobind = require("./autobind");

var _autobind2 = _interopRequireDefault(_autobind);

var _actions = require("./actions");

var _columnsHelper = require("./columnsHelper");

var _Select = require("./Select");

var _Select2 = _interopRequireDefault(_Select);

var _deepClone = require("./deepClone");

var _deepClone2 = _interopRequireDefault(_deepClone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableRowEditor = function (_React$Component) {
	_inherits(TableRowEditor, _React$Component);

	function TableRowEditor(props) {
		_classCallCheck(this, TableRowEditor);

		var _this = _possibleConstructorReturn(this, (TableRowEditor.__proto__ || Object.getPrototypeOf(TableRowEditor)).call(this, props));

		(0, _autobind2.default)(_this);
		_this.state = {
			item: props.item
		};
		return _this;
	}

	_createClass(TableRowEditor, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ item: nextProps.item });
		}
	}, {
		key: "onChangeValue",
		value: function onChangeValue(e) {
			var item = (0, _deepClone2.default)(this.state.item);
			item[e.target.name] = e.target.value;
			this.setState({ item: item });
		}
	}, {
		key: "onChangeSelectValue",
		value: function onChangeSelectValue(name, value) {
			var item = (0, _deepClone2.default)(this.state.item);
			item[name] = value;
			this.setState({ item: item });
		}
	}, {
		key: "loadOptions",
		value: function loadOptions(info, input, callback) {
			var options = this.props.dataSources[info.dataSource];
			return callback(null, { options: options });
		}
	}, {
		key: "renderValue",
		value: function renderValue(info, name) {
			var value = this.state.item[name];
			if (info.dataSource) {
				return _react2.default.createElement(_Select2.default, { className: "form-control-block",
					name: name,
					loadOptions: this.loadOptions.bind(this, info),
					value: value,
					multi: info.multi,
					valueKey: info.valueId,
					labelKey: info.labelId,
					clearable: info.clearable,
					simpleValue: true,
					icons: this.props.icons,
					onChange: this.onChangeSelectValue.bind(this, name)
				});
			} else if (info.editType === "checkbox") {
				return _react2.default.createElement("input", {
					checked: value ? "checked" : false,
					name: name,
					type: "checkbox",
					onChange: this.onChangeValue
				});
			} else {
				return _react2.default.createElement("input", {
					value: value,
					name: name,
					className: "form-control",
					onChange: this.onChangeValue
				});
			}
		}
	}, {
		key: "renderNarrowOrNormal",
		value: function renderNarrowOrNormal(info, name) {
			if (this.props.narrow && (0, _columnsHelper.getColumnsToRender)(this.props.columns).length > 1) {
				return _react2.default.createElement(
					"span",
					{ className: "row-narrow" },
					_react2.default.createElement(
						"span",
						{ className: "row-label" },
						info.label || name
					),
					_react2.default.createElement(
						"span",
						{ className: "row-value" },
						this.renderValue(info, name)
					)
				);
			}
			return this.renderValue(info, name);
		}
	}, {
		key: "renderCell",
		value: function renderCell(name) {
			var info = this.props.columns[name];
			if (info.show) {
				return _react2.default.createElement(
					"td",
					{ className: "table-edit table-cell-" + name, key: name },
					this.renderNarrowOrNormal(info, name)
				);
			} else {
				return null;
			}
		}
	}, {
		key: "renderRowBody",
		value: function renderRowBody() {
			return Object.keys(this.props.columns).map(this.renderCell);
		}
	}, {
		key: "onActionButtonClick",
		value: function onActionButtonClick(name, e) {
			e.stopPropagation();
			e.preventDefault();
			var event = {
				item: this.state.item,
				eventName: _actions.ROW_BUTTON_CLICK,
				buttonName: name
			};
			this.props.onEvent(event);
		}
	}, {
		key: "renderActionButton",
		value: function renderActionButton(name) {
			var action = this.props.actions[name];
			if (action.icon) {
				return _react2.default.createElement(
					"button",
					{ key: name,
						onClick: this.onActionButtonClick.bind(this, name),
						className: "btn btn-sm btn-default",
						"data-title": action.label },
					_react2.default.createElement("i", { className: action.icon })
				);
			} else {
				return _react2.default.createElement(
					"button",
					{ key: name,
						onClick: this.onActionButtonClick.bind(this, name),
						className: "btn btn-sm btn-default" },
					action.label
				);
			}
		}
	}, {
		key: "renderActions",
		value: function renderActions() {
			return Object.keys(this.props.actions).map(this.renderActionButton);
		}
	}, {
		key: "onRowClick",
		value: function onRowClick(e) {
			var event = {
				item: this.state.item,
				eventName: _actions.ROW_CLICK,
				keys: { ctrl: e.ctrlKey || e.metaKey, shift: e.shiftKey, alt: e.altKey }
			};
			this.props.onEvent(event);
		}
	}, {
		key: "render",
		value: function render() {
			var className = this.props.selected ? "active" : "";
			return _react2.default.createElement(
				"tr",
				{ className: className },
				this.renderRowBody(),
				_react2.default.createElement(
					"td",
					{ className: "table-edit column-right actions" },
					_react2.default.createElement(
						"div",
						{ className: "btn-group" },
						this.renderActions()
					)
				)
			);
		}
	}]);

	return TableRowEditor;
}(_react2.default.Component);

TableRowEditor.propTypes = {
	item: _propTypes2.default.object.isRequired,
	icons: _propTypes2.default.any,
	dataSources: _propTypes2.default.object,
	columns: _propTypes2.default.object.isRequired,
	actions: _propTypes2.default.object,
	onEvent: _propTypes2.default.func.isRequired,
	selected: _propTypes2.default.bool.isRequired,
	narrow: _propTypes2.default.bool.isRequired
};

TableRowEditor.defaultProps = {
	dataSources: {},
	actions: {}
};

exports.default = TableRowEditor;