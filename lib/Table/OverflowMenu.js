"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ThemedComponent2 = require("../utils/theming/ThemedComponent");

var _ThemedComponent3 = _interopRequireDefault(_ThemedComponent2);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

var _Menu = require("../Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OverflowMenu = function (_ThemedComponent) {
  (0, _inherits3.default)(OverflowMenu, _ThemedComponent);

  function OverflowMenu(props, context) {
    (0, _classCallCheck3.default)(this, OverflowMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, _ThemedComponent.call(this, props, context, {
      namespace: "Table",
      styles: _styles2.default
    }));

    _this.state = {
      isFocused: false
    };
    return _this;
  }

  OverflowMenu.prototype.render = function render() {
    var _this2 = this;

    var theme = this.theme;
    var _props = this.props,
        isFocusable = _props.isFocusable,
        children = _props.children,
        dir = _props.dir,
        onOpen = _props.onOpen,
        onClose = _props.onClose,
        marginBottom = _props.marginBottom,
        marginTop = _props.marginTop,
        maxHeight = _props.maxHeight,
        shouldClose = _props.shouldClose;
    var isFocused = this.state.isFocused;


    var trigger = function trigger(_ref // eslint-disable-line react/prop-types
    ) {
      var _classNames;

      var open = _ref.open;
      return _react2.default.createElement(
        _Button2.default.Core,
        {
          className: (0, _classnames2.default)(theme.overflow_menu, (_classNames = {}, _classNames[theme.is_focused] = isFocused && !open, _classNames[theme.is_active] = open, _classNames)),
          onFocus: function onFocus() {
            return _this2.setState({ isFocused: true });
          },
          onBlur: function onBlur() {
            return _this2.setState({ isFocused: false });
          },
          tabIndex: isFocusable ? 0 : -1
        },
        "\xA0"
      );
    };

    return _react2.default.createElement(
      _Menu2.default,
      {
        positioning: ["bottom_left", "top_left"],
        stretched: true,
        trigger: trigger,
        dir: dir,
        onOpen: onOpen,
        onClose: onClose,
        marginBottom: marginBottom,
        marginTop: marginTop,
        maxHeight: maxHeight,
        shouldClose: shouldClose
      },
      children
    );
  };

  return OverflowMenu;
}(_ThemedComponent3.default);

OverflowMenu.propTypes = {
  isFocusable: _propTypes2.default.bool,
  children: _propTypes2.default.node.isRequired,
  dir: _propTypes2.default.oneOf(["ltr", "rtl"]),
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  marginBottom: _propTypes2.default.number,
  marginTop: _propTypes2.default.number,
  maxHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  shouldClose: _propTypes2.default.func
};
OverflowMenu.defaultProps = {
  isFocusable: false,
  dir: "ltr"
};
exports.default = OverflowMenu;