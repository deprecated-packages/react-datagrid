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

var DropdownMenu = function (_React$Component) {
	_inherits(DropdownMenu, _React$Component);

	function DropdownMenu(props) {
		_classCallCheck(this, DropdownMenu);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownMenu).call(this, props));

		(0, _autobind2.default)(_this);
		return _this;
	}

	_createClass(DropdownMenu, [{
		key: "onClick",
		value: function onClick(item, group, e) {
			e.preventDefault();
			e.stopPropagation();
			var event = {
				eventName: _actions.SELECT_MENU_ITEM,
				menuName: this.props.name,
				item: item,
				group: group
			};
			this.props.onEvent(event);
		}
	}, {
		key: "renderIcon",
		value: function renderIcon(item) {
			if (this.props.selected.includes(item.name)) {
				if (item.type === 'checker') {
					return _react2.default.createElement("i", { className: "icon-check" });
				} else {
					return _react2.default.createElement("i", { className: "icon-circle" });
				}
			} else {
				if (item.type === 'checker') {
					return _react2.default.createElement("i", { className: "icon-check-empty" });
				} else {
					return _react2.default.createElement("i", { className: "icon-circle-blank" });
				}
			}
		}
	}, {
		key: "renderItem",
		value: function renderItem(group, item, uniqKey) {
			return _react2.default.createElement(
				"li",
				{ key: uniqKey },
				_react2.default.createElement(
					"a",
					{ href: "#", onClick: this.onClick.bind(this, item, group) },
					this.renderIcon(item),
					' ',
					item.label
				)
			);
		}
	}, {
		key: "renderMenu",
		value: function renderMenu() {
			var _this2 = this;

			if (this.props.groups) {
				var items = [];
				Object.keys(this.props.items).map(function (groupName) {
					var groupItems = _this2.props.items[groupName];
					items.push(groupItems.map(_this2.renderItem.bind(_this2, groupName)));
					items.push(_react2.default.createElement("li", { role: "separator", className: "divider", key: groupName }));
				});
				items.pop();
				return items;
			} else {
				return this.props.items.map(this.renderItem.bind(this, 'nogroup'));
			}
		}
	}, {
		key: "renderIconOrLabel",
		value: function renderIconOrLabel() {
			if (this.props.icon) {
				return _react2.default.createElement("i", { className: this.props.icon });
			} else {
				return this.props.label;
			}
		}
	}, {
		key: "render",
		value: function render() {
			var className = "dropdown";
			var menuClassName = "dropdown-menu";
			if (this.props.menuClassName) {
				menuClassName += " " + this.props.menuClassName;
			}
			if (this.props.className) {
				className += " " + this.props.className;
			}
			return _react2.default.createElement(
				"span",
				{ className: className },
				_react2.default.createElement(
					"button",
					{ className: "btn btn-default btn-xs dropdown-toggle",
						type: "button",
						title: this.props.label,
						id: this.props.name,
						"data-toggle": "dropdown",
						"aria-haspopup": "true", "aria-expanded": "true" },
					this.renderIconOrLabel(),
					' ',
					_react2.default.createElement("span", { className: "caret" })
				),
				_react2.default.createElement(
					"ul",
					{ className: menuClassName, "aria-labelledby": this.props.name },
					this.renderMenu()
				)
			);
		}
	}]);

	return DropdownMenu;
}(_react2.default.Component);

DropdownMenu.propTypes = {
	name: _react2.default.PropTypes.string.isRequired,
	label: _react2.default.PropTypes.string.isRequired,
	icon: _react2.default.PropTypes.string,
	items: _react2.default.PropTypes.array.isRequired,
	menuClassName: _react2.default.PropTypes.string,
	className: _react2.default.PropTypes.string,
	onEvent: _react2.default.PropTypes.func.isRequired,
	groups: _react2.default.PropTypes.bool,
	selected: _react2.default.PropTypes.array.isRequired
};

exports.default = DropdownMenu;