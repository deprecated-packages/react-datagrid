"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobind = require("asset-module/src/utils/autobind");

var _autobind2 = _interopRequireDefault(_autobind);

var _deepClone = require("asset-module/src/utils/deepClone");

var _deepClone2 = _interopRequireDefault(_deepClone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_React$Component) {
	_inherits(Select, _React$Component);

	function Select(props) {
		_classCallCheck(this, Select);

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		(0, _autobind2.default)(_this);
		_this.tags = [];
		_this.state = {
			options: [],
			showMenu: false,
			selectedMenuItemIndex: -1,
			input: "",
			focus: false,
			simpleValueCache: {} //this is label cache for values
		};
		return _this;
	}

	_createClass(Select, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			if (this.props.simpleValue) {
				this._loadData(""); //this will also set the simpleValueCache
			}
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			if (this.menu && this.component) {
				this.menu.style.width = this.component.clientWidth + "px";
			}
		}

		/***INPUT FIELD***/

	}, {
		key: "onInputChange",
		value: function onInputChange(e) {
			var input = e.target.value;
			this.setState({ input: input });
			this._showMenu(input);
		}
	}, {
		key: "onInputKeyDown",
		value: function onInputKeyDown(e) {
			//backspace & ve are in multi select mode & we are at the beginning of the line
			if (e.keyCode === 8 && e.target.selectionStart <= 0 && this.props.multi) {
				//Remove the last value
				var values = (0, _deepClone2.default)(this._getSanitizeValue());
				values.splice(-1);
				this._saveValue(values);
			}

			//Instead of onBlur use 'tab', since onBlur clashes with loosing focus when clicking outside to menu...
			if (e.keyCode === 9) {
				this._hideMenu();
			}

			//Arrow down
			if (!this.state.showMenu && e.keyCode === 40) {
				this._showMenu();
			}
		}
	}, {
		key: "onInputClick",
		value: function onInputClick() {
			this._showMenu();
		}
	}, {
		key: "_getPlaceholder",
		value: function _getPlaceholder() {
			if (!this.props.placeholder) {
				return null;
			}
			if (!this.props.multi) {
				return this.props.placeholder;
			}
			if (this.props.multi && this._getSanitizeValue().length === 0) {
				return this.props.placeholder;
			}
			return null;
		}
	}, {
		key: "onFocus",
		value: function onFocus() {
			this.setState({ focus: true });
		}
	}, {
		key: "onBlur",
		value: function onBlur() {
			this.setState({ focus: false });
		}
	}, {
		key: "renderInput",
		value: function renderInput() {
			//Use input value if we are showing menu or we are handling multi value select
			//otherwise just show the value of the props.value particularly the option label
			var inputValue = this.state.showMenu || this.props.multi ? this.state.input : this._getSanitizeValue()[this.props.labelKey];
			if (!inputValue) {
				inputValue = "";
			}
			return _react2.default.createElement("input", { value: inputValue,
				className: "form-control",
				disabled: this.props.disabled,
				placeholder: this._getPlaceholder(),
				onClick: this.onInputClick,
				onChange: this.onInputChange,
				onFocus: this.onFocus,
				onBlur: this.onBlur,
				onKeyDown: this.onInputKeyDown });
		}

		/***TAG***/

	}, {
		key: "onClickTag",
		value: function onClickTag(value) {
			var _this2 = this;

			//Remove the value from values
			var values = this._getSanitizeValue().filter(function (v) {
				return v[_this2.props.valueKey] !== value;
			});
			this._saveValue(values);
		}
	}, {
		key: "renderTag",
		value: function renderTag(i, key) {
			return _react2.default.createElement(
				"span",
				{ className: "m-r-5 label label-primary label-lg", key: key },
				this.props.valueRenderer(this.props, i),
				_react2.default.createElement(
					"span",
					{ className: "tag-remove clickable", onClick: this.onClickTag.bind(this, i[this.props.valueKey]) },
					" ",
					_react2.default.createElement("i", { className: this.props.icons.removeTag })
				)
			);
		}
	}, {
		key: "renderTags",
		value: function renderTags() {
			if (this.props.multi) {
				var sanitizeValue = this._getSanitizeValue();
				if (sanitizeValue.length === 0) {
					return null;
				}
				return _react2.default.createElement(
					"span",
					{ className: "tags" },
					sanitizeValue.map(this.renderTag)
				);
			} else {
				return null;
			}
		}

		/***SAVING / LOADING DATA***/

	}, {
		key: "_loadData",
		value: function _loadData(input) {
			var _this3 = this;

			this.props.loadOptions(input, function (err, data) {
				if (!err) {
					_this3._setupSimpleValueLabelCache(data.options);
					var options = data.options.filter(_this3.selectValuesFilter.bind(_this3, _this3._getSanitizeValue()));
					if (_this3.props.creatable && options.length === 0) {
						var _options$push;

						options.push((_options$push = {
							creatable: true
						}, _defineProperty(_options$push, _this3.props.valueKey, "create"), _defineProperty(_options$push, _this3.props.labelKey, _this3.props.promptTextCreator(input)), _options$push));
					}
					_this3.setState({ options: options });
				}
			});
		}
	}, {
		key: "_setupSimpleValueLabelCache",
		value: function _setupSimpleValueLabelCache(options) {
			var _this4 = this;

			if (this.props.simpleValue) {
				var simpleValueCache = {};
				options.forEach(function (o) {
					simpleValueCache[o[_this4.props.valueKey]] = o[_this4.props.labelKey];
				});
				this.setState({ simpleValueCache: simpleValueCache });
			}
		}
	}, {
		key: "_fireValueChange",
		value: function _fireValueChange(index) {
			var value = this.state.options[index];
			if (!value) {
				return;
			}
			if (value.creatable) {
				var _value;

				value = (_value = {}, _defineProperty(_value, this.props.valueKey, this.state.input), _defineProperty(_value, this.props.labelKey, this.state.input), _value);
			}
			if (this.props.multi) {
				var values = (0, _deepClone2.default)(this._getSanitizeValue());
				values.push(value);
				this._saveValue(values);
			} else {
				this._saveValue(value);
			}
		}
	}, {
		key: "_saveValue",
		value: function _saveValue(value) {
			var _this5 = this;

			if (this.props.simpleValue) {
				if (this.props.multi) {
					this.props.onChange(value.map(function (v) {
						return v[_this5.props.valueKey];
					}));
				} else {
					if (value !== null) {
						this.props.onChange(value[this.props.valueKey]);
					} else {
						this.props.onChange(null);
					}
				}
			} else {
				this.props.onChange(value);
			}
		}
	}, {
		key: "_setInputToSelected",
		value: function _setInputToSelected(index) {
			if (this.state.options.length > index && this.state.options[index] && !this.state.options[index].creatable) {
				this.setState({ selectedMenuItemIndex: index, input: this.state.options[index][this.props.labelKey] });
			}
		}
	}, {
		key: "_getSimpleValueLabelFromCache",
		value: function _getSimpleValueLabelFromCache(simpleValue) {
			if (this.state.simpleValueCache.hasOwnProperty(simpleValue)) {
				return this.state.simpleValueCache[simpleValue];
			} else {
				return simpleValue;
			}
		}
	}, {
		key: "_getSanitizedSimpleValue",
		value: function _getSanitizedSimpleValue(simpleValue) {
			if (typeof simpleValue === "string") {
				var _ref;

				return _ref = {}, _defineProperty(_ref, this.props.valueKey, simpleValue), _defineProperty(_ref, this.props.labelKey, this._getSimpleValueLabelFromCache(simpleValue)), _ref;
			} else if (typeof simpleValue === "number") {
				var _ref2;

				return _ref2 = {}, _defineProperty(_ref2, this.props.valueKey, simpleValue), _defineProperty(_ref2, this.props.labelKey, this._getSimpleValueLabelFromCache(simpleValue)), _ref2;
			} else if (simpleValue === null) {
				var _ref3;

				return _ref3 = {}, _defineProperty(_ref3, this.props.valueKey, null), _defineProperty(_ref3, this.props.labelKey, ""), _ref3;
			} else {
				var _ref4;

				return _ref4 = {}, _defineProperty(_ref4, this.props.valueKey, JSON.stringify(simpleValue)), _defineProperty(_ref4, this.props.labelKey, JSON.stringify(simpleValue)), _ref4;
			}
		}
	}, {
		key: "_getSanitizeValue",
		value: function _getSanitizeValue() {
			var retval = null;
			if (this.props.multi) {
				if (Array.isArray(this.props.value)) {
					if (this.props.simpleValue) {
						retval = this.props.value.map(this._getSanitizedSimpleValue);
					} else {
						retval = this.props.value;
					}
				} else {
					retval = [];
				}
			} else {
				if (this.props.simpleValue) {
					retval = this._getSanitizedSimpleValue(this.props.value);
				} else {
					if (this.props.value === null) {
						var _retval;

						retval = (_retval = {}, _defineProperty(_retval, this.props.valueKey, null), _defineProperty(_retval, this.props.labelKey, ""), _retval);
					} else if (_typeof(this.props.value) === "object") {
						retval = this.props.value;
					} else {
						var _retval2;

						retval = (_retval2 = {}, _defineProperty(_retval2, this.props.valueKey, JSON.stringify(this.props.value)), _defineProperty(_retval2, this.props.labelKey, JSON.stringify(this.props.value)), _retval2);
					}
				}
			}

			return retval;
		}

		/***MENU AUTOCOMPLETE***/

	}, {
		key: "onClickMenuOption",
		value: function onClickMenuOption(index) {
			this._fireValueChange(index);
			this._hideMenu();
		}
	}, {
		key: "onMouseOverMenuOption",
		value: function onMouseOverMenuOption(index) {
			this._setInputToSelected(index);
		}
	}, {
		key: "renderMenuOption",
		value: function renderMenuOption(i, key) {
			var className = "menu-option";
			if (key === this.state.selectedMenuItemIndex) {
				className += " selected";
			}

			return _react2.default.createElement(
				"div",
				{ className: className, key: key, onMouseOver: this.onMouseOverMenuOption.bind(this, key),
					onClick: this.onClickMenuOption.bind(this, key) },
				this.props.optionRenderer(this.props, i)
			);
		}
	}, {
		key: "onClickHider",
		value: function onClickHider() {
			this._hideMenu();
		}
	}, {
		key: "selectValuesFilter",
		value: function selectValuesFilter(itemSelected, v) {
			var _this6 = this;

			if (this.props.multi) {
				if (v.hasOwnProperty(this.props.valueKey)) {
					return !itemSelected.map(function (x) {
						return x[_this6.props.valueKey] || !x.hasOwnProperty(_this6.props.valueKey);
					}).includes(v[this.props.valueKey]);
				}
			}
			return true;
		}
	}, {
		key: "renderMenu",
		value: function renderMenu() {
			var _this7 = this;

			if (this.state.showMenu) {
				var style = {};
				if (this.props.menuStyleFixed) {
					style = { position: "fixed", zIndex: 999999 };
				} else {
					style = { position: "relative" };
				}
				return _react2.default.createElement(
					"div",
					{ style: style },
					_react2.default.createElement("div", { style: { top: 0, left: 0, right: 0, bottom: 0, position: "fixed" }, onClick: this.onClickHider }),
					_react2.default.createElement(
						"div",
						{ className: "menu", ref: function ref(menu) {
								return _this7.menu = menu;
							} },
						this.state.options.map(this.renderMenuOption)
					)
				);
			} else {
				return null;
			}
		}
	}, {
		key: "_showMenu",
		value: function _showMenu(input) {
			if (this.props.disabled) {
				return;
			}
			this._loadData(input ? input : "");
			this.setState({ showMenu: true });
			window.addEventListener("keydown", this.onKeyListener);
		}
	}, {
		key: "_hideMenu",
		value: function _hideMenu() {
			if (this.props.multi) {
				this.setState({ showMenu: false, input: "", selectedMenuItemIndex: -1 });
			} else {
				this.setState({
					showMenu: false,
					input: "",
					selectedMenuItemIndex: -1
				});
			}
			window.removeEventListener("keydown", this.onKeyListener);
		}

		/***KEYBOARD EVENTS FOR MENU***/

	}, {
		key: "onKeyListener",
		value: function onKeyListener(e) {
			if (e.keyCode === 27) {
				//escape
				this._hideMenu();
			}

			if (e.keyCode === 13) {
				//enter hide menu but before save the value
				this._fireValueChange(this.state.selectedMenuItemIndex);
				this._hideMenu();
			}

			if (e.keyCode === 38) {
				//down key must go up the index since the menu is render topdown
				if (this.state.selectedMenuItemIndex > 0) {
					this.setState({ selectedMenuItemIndex: this.state.selectedMenuItemIndex - 1 });
				} else {
					this.setState({ selectedMenuItemIndex: this.state.options.length - 1 });
				}
				this._setInputToSelected(this.state.selectedMenuItemIndex);
			}

			if (e.keyCode === 40) {
				//up key must go down the index since the menu is render topdown
				if (this.state.selectedMenuItemIndex < this.state.options.length - 1) {
					this.setState({ selectedMenuItemIndex: this.state.selectedMenuItemIndex + 1 });
				} else {
					this.setState({ selectedMenuItemIndex: 0 });
				}
				this._setInputToSelected(this.state.selectedMenuItemIndex);
			}
		}

		/***BUTTONS***/

	}, {
		key: "onCaretDown",
		value: function onCaretDown() {
			if (this.state.showMenu) {
				this._hideMenu();
			} else {
				this._showMenu(null);
			}
		}
	}, {
		key: "onClear",
		value: function onClear() {
			this._saveValue(this.props.multi ? [] : null);
			this._hideMenu();
		}
	}, {
		key: "renderClearable",
		value: function renderClearable() {
			if (!this.props.clearable) {
				return null;
			}
			if (this.props.multi) {
				if (this._getSanitizeValue().length === 0) {
					return null;
				}
			} else {
				if (!this.props.value) {
					return null;
				}
			}
			return _react2.default.createElement(
				"div",
				{ className: "input-group-addon", onClick: this.onClear },
				_react2.default.createElement("i", { className: this.props.icons.clear })
			);
		}
	}, {
		key: "_getClassName",
		value: function _getClassName() {
			var className = "simple-select";
			if (this.props.className) {
				className += " " + this.props.className;
			}
			if (this.props.disabled) {
				className += " disabled";
			}
			if (this.state.focus) {
				className += " focus";
			}
			return className;
		}
	}, {
		key: "onClickSelectLine",
		value: function onClickSelectLine() {
			// if (this.state.showMenu) {
			// this._hideMenu();
			// } else {
			// this._showMenu();
			// }
		}
	}, {
		key: "render",
		value: function render() {
			var _this8 = this;

			return _react2.default.createElement(
				"div",
				{ className: this._getClassName(), style: { position: "relative" },
					ref: function ref(component) {
						return _this8.component = component;
					} },
				this.renderTags(),
				_react2.default.createElement(
					"div",
					{ className: "input-group", style: { flex: "" }, onClick: this.onClickSelectLine },
					this.renderInput(),
					this.renderClearable(),
					_react2.default.createElement(
						"div",
						{ className: "input-group-addon", onClick: this.onCaretDown },
						_react2.default.createElement("i", { className: this.props.icons.caret })
					)
				),
				this.renderMenu()
			);
		}
	}]);

	return Select;
}(_react2.default.Component);

Select.defaultProps = {
	valueRenderer: function valueRenderer(props, item) {
		return item[props.labelKey];
	},
	optionRenderer: function optionRenderer(props, item) {
		return item[props.labelKey];
	},
	promptTextCreator: function promptTextCreator(label) {
		return "Create \"" + label + "\"";
	},
	icons: {
		caret: "icon-lg icon-m icon-m-caret-down",
		removeTag: "icon-m icon-m-close",
		clear: "icon-m icon-m-close"
	},
	className: "",
	labelKey: "label",
	valueKey: "value"
};

Select.propTypes = {
	multi: _propTypes2.default.bool,
	clearable: _propTypes2.default.bool,
	creatable: _propTypes2.default.bool,
	className: _propTypes2.default.string,
	valueKey: _propTypes2.default.string,
	labelKey: _propTypes2.default.string,
	value: _propTypes2.default.any,
	icons: _propTypes2.default.shape({
		caret: _propTypes2.default.string.isRequired,
		removeTag: _propTypes2.default.string.isRequired,
		clear: _propTypes2.default.string.isRequired
	}),
	disabled: _propTypes2.default.any,
	loadOptions: _propTypes2.default.func.isRequired,
	onChange: _propTypes2.default.func.isRequired,
	valueRenderer: _propTypes2.default.func,
	optionRenderer: _propTypes2.default.func,
	promptTextCreator: _propTypes2.default.func,
	menuStyleFixed: _propTypes2.default.bool,
	placeholder: _propTypes2.default.string,
	simpleValue: _propTypes2.default.bool
};

exports.default = Select;