"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _autobind = require("./autobind");

var _autobind2 = _interopRequireDefault(_autobind);

var _TableHeader = require("./TableHeader");

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableRow = require("./TableRow");

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableRowEditor = require("./TableRowEditor");

var _TableRowEditor2 = _interopRequireDefault(_TableRowEditor);

var _TableFooter = require("./TableFooter");

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TableTitle = require("./TableTitle");

var _TableTitle2 = _interopRequireDefault(_TableTitle);

var _TableBodyHeader = require("./TableBodyHeader");

var _TableBodyHeader2 = _interopRequireDefault(_TableBodyHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataGrid = function (_React$Component) {
	_inherits(DataGrid, _React$Component);

	function DataGrid(props) {
		_classCallCheck(this, DataGrid);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataGrid).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(DataGrid, [{
		key: "onResize",
		value: function onResize() {
			if (this.props.onResize) {
				this.props.onResize({
					width: this._dataGridRootNode.clientWidth,
					height: this._dataGridRootNode.clientHeight
				});
			}
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener('resize', this.onResize, true);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.onResize, true);
		}
	}, {
		key: "renderBody",
		value: function renderBody() {
			return this.props.model.items.map(this.renderRow);
		}
	}, {
		key: "renderRow",
		value: function renderRow(item) {
			var selected = this.props.model.selected.includes(item[this.props.model.idColumn]);
			var edit = this.props.model.edit.selected.includes(item[this.props.model.idColumn]);
			if (edit) {
				return _react2.default.createElement(_TableRowEditor2.default, {
					item: item,
					selected: selected,
					dataSources: this.props.model.dataSources,
					onEvent: this.props.onEvent,
					columns: this.props.model.columns,
					actions: this.props.model.edit.buttons,
					narrow: this.props.model.narrow,
					key: item[this.props.model.idColumn]
				});
			} else {
				return _react2.default.createElement(_TableRow2.default, {
					item: item,
					selected: selected,
					dataSources: this.props.model.dataSources,
					onEvent: this.props.onEvent,
					columns: this.props.model.columns,
					actions: this.props.model.actions,
					narrow: this.props.model.narrow,
					key: item[this.props.model.idColumn] });
			}
		}
	}, {
		key: "renderHeader",
		value: function renderHeader() {
			if (this.props.model.settings.header) {
				return _react2.default.createElement(_TableHeader2.default, {
					actionColumnWidth: this.props.actionColumnWidth,
					model: this.props.model,
					onEvent: this.props.onEvent });
			} else {
				return null;
			}
		}
	}, {
		key: "renderFooter",
		value: function renderFooter() {
			if (this.props.model.settings.footer) {
				return _react2.default.createElement(_TableFooter2.default, { model: this.props.model, onEvent: this.props.onEvent });
			} else {
				return null;
			}
		}
	}, {
		key: "renderTableTitle",
		value: function renderTableTitle() {
			if (this.props.model.settings.title) {
				return _react2.default.createElement(_TableTitle2.default, this.props);
			} else {
				return null;
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var className = "data-grid " + (this.props.className || '');
			if (this.props.model.narrow) {
				className += " narrow";
			}
			var scrollerClassName = "";
			var actionColumnWidth = this.props.actionColumnWidth;
			var infiniteScroll = this.props.model.settings.infiniteScroll;
			if (infiniteScroll) {
				scrollerClassName = "scroller";
				//we need to adjust the action column for table body because of scrollbar
				//so the columns match with header
				actionColumnWidth = this.props.actionColumnWidth - (infiniteScroll ? this.props.scrollBarWidth : 0);
			}
			return _react2.default.createElement(
				"div",
				{ className: className, ref: function ref(c) {
						_this2._dataGridRootNode = c;
					} },
				this.renderTableTitle(),
				_react2.default.createElement(
					"table",
					{ className: this.props.tableClassName, style: { tableLayout: 'fixed' } },
					this.renderHeader()
				),
				_react2.default.createElement(
					"div",
					{ className: scrollerClassName },
					_react2.default.createElement(
						"table",
						{ className: "virtual-header " + this.props.tableClassName, style: { tableLayout: 'fixed' } },
						_react2.default.createElement(_TableBodyHeader2.default, {
							model: this.props.model,
							actionColumnWidth: actionColumnWidth,
							onEvent: this.props.onEvent }),
						_react2.default.createElement(
							"tbody",
							null,
							this.renderBody()
						),
						this.renderFooter()
					)
				)
			);
		}
	}]);

	return DataGrid;
}(_react2.default.Component);

DataGrid.propTypes = {
	className: _react2.default.PropTypes.string,
	tableClassName: _react2.default.PropTypes.string,
	onEvent: _react2.default.PropTypes.func,
	onResize: _react2.default.PropTypes.func,
	scrollBarWidth: _react2.default.PropTypes.number.isRequired,
	actionColumnWidth: _react2.default.PropTypes.number.isRequired,
	model: _react2.default.PropTypes.shape({
		idColumn: _react2.default.PropTypes.string.isRequired,
		items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired,
		selected: _react2.default.PropTypes.array.isRequired,
		edit: _react2.default.PropTypes.shape({
			buttons: _react2.default.PropTypes.object.isRequired,
			selected: _react2.default.PropTypes.array.isRequired
		}).isRequired,
		dataSources: _react2.default.PropTypes.object.isRequired,
		columns: _react2.default.PropTypes.object.isRequired,
		sort: _react2.default.PropTypes.shape({
			order: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string).isRequired,
			columns: _react2.default.PropTypes.object.isRequired
		}).isRequired,
		filter: _react2.default.PropTypes.object.isRequired,
		headerActions: _react2.default.PropTypes.object.isRequired,
		actions: _react2.default.PropTypes.object.isRequired,
		settings: _react2.default.PropTypes.shape({
			header: _react2.default.PropTypes.bool,
			filterHeader: _react2.default.PropTypes.bool,
			footer: _react2.default.PropTypes.bool,
			title: _react2.default.PropTypes.bool,
			infiniteScroll: _react2.default.PropTypes.bool,
			editableColumns: _react2.default.PropTypes.bool
		}).isRequired,
		labels: _react2.default.PropTypes.shape({
			title: _react2.default.PropTypes.string,
			records: _react2.default.PropTypes.string,
			filter: _react2.default.PropTypes.string,
			itemsPerPage: _react2.default.PropTypes.string
		}).isRequired,
		pager: _react2.default.PropTypes.shape({
			currentPageSize: _react2.default.PropTypes.number,
			currentPage: _react2.default.PropTypes.number,
			count: _react2.default.PropTypes.number
		}).isRequired,
		narrow: _react2.default.PropTypes.bool
	}).isRequired
};

exports.default = DataGrid;