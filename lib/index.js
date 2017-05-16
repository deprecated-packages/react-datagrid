"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactDom = require("react-dom");

var _DataGrid = require("./DataGrid");

var _DataGrid2 = _interopRequireDefault(_DataGrid);

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _deepClone = require("./deepClone");

var _deepClone2 = _interopRequireDefault(_deepClone);

var _multiSort = require("./multiSort");

var _multiSort2 = _interopRequireDefault(_multiSort);

var _columnsHelper = require("./columnsHelper");

var _scrollBarWidthMeasure = require("./scrollBarWidthMeasure.jsx");

var _scrollBarWidthMeasure2 = _interopRequireDefault(_scrollBarWidthMeasure);

require("../styles/main.less");

require("bootstrap");

require("../styles/css/bootstrap.css");

require("../styles/css/app.css");

require("../styles/css/pe-icon-7-stroke.css");

var _autobind = require("./autobind");

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint no-console: 0*/
/*eslint max-statements: 0*/


var scrollBarWidth = (0, _scrollBarWidthMeasure2.default)();

_model2.default.pager.currentPageSize = 100;
_model2.default.settings.footer = false;
_model2.default.settings.infiniteScroll = true;

function getItems(model) {
	var pager = model.pager;
	var from = (pager.currentPage - 1) * pager.currentPageSize;
	var to = from + pager.currentPageSize;
	var items = (0, _deepClone2.default)(_model2.default.items);
	items = items.filter(function (i) {
		var match = true;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.keys(model.filter)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var columnName = _step.value;

				var filter = model.filter[columnName];
				if (filter && filter.length && i[columnName].indexOf(filter) === -1) {
					match = false;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return match;
	});
	items = items.sort(_multiSort2.default.bind(this, model.sort.order, model.sort.columns));
	return items.slice(from, to);
}

var Wrapper = function (_React$Component) {
	_inherits(Wrapper, _React$Component);

	function Wrapper(props) {
		_classCallCheck(this, Wrapper);

		var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

		(0, _autobind2.default)(_this);
		var model = (0, _deepClone2.default)(_model2.default);
		model.items = getItems(_model2.default);
		model.narrow = false;
		model.headerActions = {
			plus: {
				label: "Plus",
				icon: "icon-plus"
			}
		};
		_this.state = { model: model };
		return _this;
	}

	_createClass(Wrapper, [{
		key: "onResize",
		value: function onResize(info) {
			var columns = (0, _columnsHelper.getColumnsToRender)(this.state.model.columns);
			var minWidth = columns.reduce(function (sum, i) {
				return parseInt(i.width ? i.width : 0) + sum;
			}, 100);
			var narrow = info.width < minWidth;
			var model = (0, _reactAddonsUpdate2.default)(this.state.model, { narrow: { $set: narrow } });
			this.setState({ model: model });
		}
	}, {
		key: "onEvent",
		value: function onEvent(event) {
			var model = this.state.model;
			if (event.eventName === _actions2.default.GOTO_PAGE) {
				model.pager.currentPage = event.pageNumber;
			}
			if (event.eventName === _actions2.default.NEXT_PAGE) {
				model.pager.currentPage++;
			}
			if (event.eventName === _actions2.default.PREV_PAGE) {
				model.pager.currentPage--;
			}
			if (event.eventName === _actions2.default.SELECT_MENU_ITEM && event.menuName === "column-settings") {
				model.columns[event.item.name].show = !model.columns[event.item.name].show;
			}
			if (event.eventName === _actions2.default.HEADER_CLICK) {
				if (model.sort.columns[event.columnName] === "ASC") {
					model.sort.columns[event.columnName] = "DESC";
				} else if (model.sort.columns[event.columnName] === "DESC") {
					delete model.sort.columns[event.columnName];
					model.sort.order = model.sort.order.filter(function (i) {
						return i !== event.columnName;
					});
				} else {
					model.sort.columns[event.columnName] = "ASC";
					model.sort.order.push(event.columnName);
				}
			}
			if (event.eventName === _actions2.default.HEADER_BUTTON_CLICK && event.buttonName === "filter") {
				model.settings.filterHeader = !model.settings.filterHeader;
			}
			if (event.eventName === _actions2.default.CLEAR_FILTER_BUTTON_CLICK) {
				model.filter = {};
			}
			if (event.eventName === _actions2.default.FILTER_BUTTON_CLICK) {
				model.filter = event.filter;
			}
			if (event.eventName === _actions2.default.ROW_CLICK) {
				model.selected = [event.item.myId];
			}
			if (event.eventName === _actions2.default.SET_PAGE_SIZE) {
				model.pager.currentPageSize = event.pageSize;
			}
			model.items = getItems(model);
			if (event.eventName === _actions2.default.ROW_BUTTON_CLICK && event.buttonName === "edit") {
				for (var i = 0; i < model.items.length; i++) {
					if (model.items[i].myId === event.item.myId) {
						model.items[i] = event.item;
						console.log("saved");
					}
				}
			}
			console.log(event);
			this.setState({ model: model });
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_DataGrid2.default, { tableClassName: "table table-hover table-bordered table-condensed",
				onResize: this.onResize,
				model: this.state.model,
				onEvent: this.onEvent,
				scrollBarWidth: scrollBarWidth,
				actionColumnWidth: 100
			});
		}
	}]);

	return Wrapper;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(Wrapper, null), document.getElementById("data-grid-mount"));