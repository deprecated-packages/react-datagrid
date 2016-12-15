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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TablePagerPageSize = function (_React$Component) {
	_inherits(TablePagerPageSize, _React$Component);

	function TablePagerPageSize(props) {
		_classCallCheck(this, TablePagerPageSize);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TablePagerPageSize).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(TablePagerPageSize, [{
		key: "onSetPage",
		value: function onSetPage(pageSize, e) {
			//To supress the hash click
			e.preventDefault();
			e.stopPropagation();
			this.props.onEvent({ eventName: _actions.SET_PAGE_SIZE, pageSize: pageSize });
		}
	}, {
		key: "renderLabel",
		value: function renderLabel() {
			if (this.props.model.narrow) {
				return null;
			} else {
				return this.props.model.labels.itemsPerPage;
			}
		}
	}, {
		key: "render",
		value: function render() {
			var label = this.renderLabel();
			return _react2.default.createElement(
				"span",
				{ className: "dropdown" },
				_react2.default.createElement(
					"button",
					{ className: "btn btn-default btn-xs dropdown-toggle",
						type: "button",
						id: "dropdownMenu1",
						"data-toggle": "dropdown",
						"aria-haspopup": "true", "aria-expanded": "true" },
					this.props.model.pager.currentPageSize,
					' ',
					label,
					' ',
					_react2.default.createElement("span", { className: "caret" })
				),
				_react2.default.createElement(
					"ul",
					{ className: "dropdown-menu", "aria-labelledby": "dropdownMenu1" },
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 5) },
							"5 ",
							this.props.model.labels.itemsPerPage
						)
					),
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 10) },
							"10 ",
							this.props.model.labels.itemsPerPage
						)
					),
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 15) },
							"15 ",
							this.props.model.labels.itemsPerPage
						)
					),
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 30) },
							"30 ",
							this.props.model.labels.itemsPerPage
						)
					),
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 50) },
							"50 ",
							this.props.model.labels.itemsPerPage
						)
					),
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 75) },
							"75 ",
							this.props.model.labels.itemsPerPage
						)
					),
					_react2.default.createElement(
						"li",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#", onClick: this.onSetPage.bind(this, 100) },
							"100 ",
							this.props.model.labels.itemsPerPage
						)
					)
				)
			);
		}
	}]);

	return TablePagerPageSize;
}(_react2.default.Component);

TablePagerPageSize.propTypes = {
	onEvent: _react2.default.PropTypes.func,
	model: _react2.default.PropTypes.shape({
		pager: _react2.default.PropTypes.shape({
			currentPageSize: _react2.default.PropTypes.number.isRequired
		}).isRequired,
		labels: _react2.default.PropTypes.object.isRequired,
		narrow: _react2.default.PropTypes.bool.isRequired
	}).isRequired
};

exports.default = TablePagerPageSize;