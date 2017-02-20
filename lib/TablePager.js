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

var TablePager = function (_React$Component) {
	_inherits(TablePager, _React$Component);

	function TablePager(props) {
		_classCallCheck(this, TablePager);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TablePager).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(TablePager, [{
		key: "onPrevPageClick",
		value: function onPrevPageClick() {
			if (this.props.model.pager.currentPage > 1) {
				this.props.onEvent({ eventName: _actions.PREV_PAGE });
			}
		}
	}, {
		key: "onNextPageClick",
		value: function onNextPageClick() {
			if (this.props.model.pager.currentPage < this._getNumberOfPages()) {
				this.props.onEvent({ eventName: _actions.NEXT_PAGE });
			}
		}
	}, {
		key: "onPageClick",
		value: function onPageClick(pageNumber) {
			this.props.onEvent({ eventName: _actions.GOTO_PAGE, pageNumber: pageNumber });
		}
	}, {
		key: "renderPageButton",
		value: function renderPageButton(pageNumber) {
			var className = "btn btn-default btn-xs";
			if (pageNumber === this.props.model.pager.currentPage) {
				className += " active";
			}
			return _react2.default.createElement(
				"button",
				{ key: pageNumber, onClick: this.onPageClick.bind(this, pageNumber), className: className },
				pageNumber
			);
		}
	}, {
		key: "_getNumberOfPages",
		value: function _getNumberOfPages() {
			return Math.ceil(this.props.model.pager.count / this.props.model.pager.currentPageSize);
		}
	}, {
		key: "renderPageButtons",
		value: function renderPageButtons() {
			var numberOfPages = this._getNumberOfPages();
			var MAX_PAGE = numberOfPages < 5 ? numberOfPages : 5;
			var currentPage = this.props.model.pager.currentPage;
			var buttons = [],
			    to = 1,
			    from = 1;
			if (currentPage <= MAX_PAGE) {
				from = 1;
				to = MAX_PAGE;
			} else if (currentPage > numberOfPages - 2) {
				from = numberOfPages - 4;
				to = numberOfPages;
			} else if (currentPage > 3 && currentPage < numberOfPages - 1) {
				from = currentPage - 2;
				to = currentPage + 2;
			}
			for (var i = from; i <= to; i++) {
				buttons.push(this.renderPageButton(i));
			}
			return buttons;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"span",
				{ className: "table-pager" },
				_react2.default.createElement(
					"button",
					{ className: "btn btn-default btn-xs", onClick: this.onPrevPageClick },
					_react2.default.createElement("i", { className: this.props.model.icons.prevIcon })
				),
				' ',
				_react2.default.createElement(
					"span",
					{ className: "btn-group" },
					this.renderPageButtons()
				),
				' ',
				_react2.default.createElement(
					"button",
					{ className: "btn btn-default btn-xs", onClick: this.onNextPageClick },
					_react2.default.createElement("i", { className: this.props.model.icons.nextIcon })
				)
			);
		}
	}]);

	return TablePager;
}(_react2.default.Component);

TablePager.propTypes = {
	onEvent: _react2.default.PropTypes.func,
	model: _react2.default.PropTypes.shape({
		icons: _react2.default.PropTypes.object.isRequired,
		pager: _react2.default.PropTypes.shape({
			count: _react2.default.PropTypes.number.isRequired,
			currentPageSize: _react2.default.PropTypes.number.isRequired,
			currentPage: _react2.default.PropTypes.number.isRequired
		}).isRequired
	})
};

exports.default = TablePager;