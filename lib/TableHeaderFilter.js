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

var _columnsHelper = require("./columnsHelper");

var _deepClone = require("./deepClone");

var _deepClone2 = _interopRequireDefault(_deepClone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeaderFilter = function (_React$Component) {
	_inherits(TableHeaderFilter, _React$Component);

	function TableHeaderFilter(props) {
		_classCallCheck(this, TableHeaderFilter);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableHeaderFilter).call(this, props));

		(0, _autobind2.default)(_this);
		var filter = props.model.filter || {};
		_this.state = { filter: filter };
		return _this;
	}

	_createClass(TableHeaderFilter, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				filter: nextProps.model.filter || {}
			});
		}
	}, {
		key: "onClickClear",
		value: function onClickClear() {
			this.setState({ filter: {} });
			this.props.onEvent({
				eventName: _actions.CLEAR_FILTER_BUTTON_CLICK
			});
		}
	}, {
		key: "onClickFilter",
		value: function onClickFilter() {
			this.props.onEvent({
				eventName: _actions.FILTER_BUTTON_CLICK,
				filter: this.state.filter
			});
		}
	}, {
		key: "onChangeFilter",
		value: function onChangeFilter(column, e) {
			var filter = (0, _deepClone2.default)(this.state.filter);
			filter[column.name] = e.target.value;
			this.setState({ filter: filter });
		}
	}, {
		key: "renderFilterCell",
		value: function renderFilterCell(column) {
			var info = column;
			var style = {};
			if (info.width && !this.props.model.narrow) {
				style.width = info.width;
			}
			return _react2.default.createElement(
				"th",
				{ className: "table-header-" + column.name, key: column.name, style: style },
				_react2.default.createElement("input", {
					type: "text",
					value: this.state.filter[column.name],
					onChange: this.onChangeFilter.bind(this, column),
					placeholder: this.props.model.narrow ? column.label || column.name : '',
					name: column.name, className: "form-control input-sm" })
			);
		}
	}, {
		key: "renderFilterHeaderCells",
		value: function renderFilterHeaderCells() {
			return (0, _columnsHelper.getColumnsToRender)(this.props.model.columns).map(this.renderFilterCell);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"tr",
				{ className: "info" },
				this.renderFilterHeaderCells(),
				_react2.default.createElement(
					"th",
					{ className: "column-right" },
					_react2.default.createElement(
						"div",
						{ className: "btn-group", role: "group" },
						_react2.default.createElement(
							"button",
							{ className: "btn btn-default btn-sm", "data-title": this.props.model.labels.clearFilter,
								onClick: this.onClickClear },
							_react2.default.createElement("i", { className: this.props.model.icons.removeIcon })
						),
						_react2.default.createElement(
							"button",
							{ className: "btn btn-primary btn-sm", "data-title": this.props.model.labels.filter,
								onClick: this.onClickFilter },
							_react2.default.createElement("i", { className: this.props.model.icons.filterIcon })
						)
					)
				)
			);
		}
	}]);

	return TableHeaderFilter;
}(_react2.default.Component);

TableHeaderFilter.propTypes = {
	model: _react2.default.PropTypes.shape({
		columns: _react2.default.PropTypes.object.isRequired,
		filter: _react2.default.PropTypes.object.isRequired,
		labels: _react2.default.PropTypes.shape({
			filter: _react2.default.PropTypes.string.isRequired,
			clearFilter: _react2.default.PropTypes.string.isRequired
		}),
		narrow: _react2.default.PropTypes.bool.isRequired
	}),
	onEvent: _react2.default.PropTypes.func
};

exports.default = TableHeaderFilter;