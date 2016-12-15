"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _autobind = require("./autobind");

var _autobind2 = _interopRequireDefault(_autobind);

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
						style: style },
					_react2.default.createElement(
						"span",
						{ className: "ellipsis-clip" },
						' '
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
					' '
				)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"thead",
				null,
				this.renderTitleHeader()
			);
		}
	}]);

	return TableHeader;
}(_react2.default.Component);

TableHeader.propTypes = {
	model: _react2.default.PropTypes.shape({
		columns: _react2.default.PropTypes.object.isRequired,
		narrow: _react2.default.PropTypes.bool.isRequired
	}),
	actionColumnWidth: _react2.default.PropTypes.number.isRequired,
	onEvent: _react2.default.PropTypes.func
};

exports.default = TableHeader;