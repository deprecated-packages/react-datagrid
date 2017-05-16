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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableTitle = function (_React$Component) {
	_inherits(TableTitle, _React$Component);

	function TableTitle(props) {
		_classCallCheck(this, TableTitle);

		var _this = _possibleConstructorReturn(this, (TableTitle.__proto__ || Object.getPrototypeOf(TableTitle)).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(TableTitle, [{
		key: "render",
		value: function render() {
			if (this.props.model.settings.title) {
				return _react2.default.createElement(
					"div",
					{ className: "title", onClick: this.onRowClick },
					this.props.model.labels.title
				);
			} else {
				return null;
			}
		}
	}]);

	return TableTitle;
}(_react2.default.Component);

TableTitle.propTypes = {
	model: _propTypes2.default.shape({
		labels: _propTypes2.default.shape({
			title: _propTypes2.default.string
		}),
		settings: _propTypes2.default.shape({
			title: _propTypes2.default.bool
		})
	}),
	onEvent: _propTypes2.default.func
};

exports.default = TableTitle;