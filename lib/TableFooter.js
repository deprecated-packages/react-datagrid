"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobind = require("./autobind");

var _autobind2 = _interopRequireDefault(_autobind);

var _TablePager = require("./TablePager");

var _TablePager2 = _interopRequireDefault(_TablePager);

var _TablePagerPageSize = require("./TablePagerPageSize");

var _TablePagerPageSize2 = _interopRequireDefault(_TablePagerPageSize);

var _columnsHelper = require("./columnsHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableFooter = function (_React$Component) {
	_inherits(TableFooter, _React$Component);

	function TableFooter(props) {
		_classCallCheck(this, TableFooter);

		var _this = _possibleConstructorReturn(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(TableFooter, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"tfoot",
				null,
				_react2.default.createElement(
					"tr",
					{ onClick: this.onRowClick },
					_react2.default.createElement(
						"td",
						{ colSpan: (0, _columnsHelper.getColumnsToRender)(this.props.model.columns).length + 1 },
						_react2.default.createElement(
							"span",
							{ className: "total-count" },
							this.props.model.pager.count,
							" ",
							this.props.model.labels.records
						),
						" ",
						_react2.default.createElement(_TablePagerPageSize2.default, _extends({}, this.props, { onEvent: this.props.onEvent })),
						_react2.default.createElement(_TablePager2.default, this.props)
					)
				)
			);
		}
	}]);

	return TableFooter;
}(_react2.default.Component);

TableFooter.propTypes = {
	model: _propTypes2.default.shape({
		labels: _propTypes2.default.shape({
			total: _propTypes2.default.string,
			records: _propTypes2.default.string
		}),
		columns: _propTypes2.default.object.isRequired,
		pager: _propTypes2.default.shape({
			count: _propTypes2.default.number.isRequired
		}).isRequired
	}),
	onEvent: _propTypes2.default.func
};

exports.default = TableFooter;