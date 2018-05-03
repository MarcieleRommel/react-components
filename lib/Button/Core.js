"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _View = require("../core/View");

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Core = function (_Component) {
  (0, _inherits3.default)(Core, _Component);

  function Core(props, context) {
    (0, _classCallCheck3.default)(this, Core);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

    _this.onSubmitKeyPressed = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onSubmitKeyPressed = _this$props.onSubmitKeyPressed;

      onClick && onClick(e);
      onSubmitKeyPressed && onSubmitKeyPressed(e);
      e.preventDefault();
    };

    _this.onMouseDown = function (e) {
      var disabled = _this.props.disabled;


      if (disabled) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        _this.keyboard = false;
      }
    };

    _this.onClick = function (e) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onClick = _this$props2.onClick;


      if (disabled) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        onClick && onClick(e);
      }
    };

    _this.onFocus = function (e) {
      var _this$props3 = _this.props,
          onFocus = _this$props3.onFocus,
          onKeyboardFocus = _this$props3.onKeyboardFocus;


      onFocus && onFocus(e);
      _this.keyboard && onKeyboardFocus && onKeyboardFocus(e);

      _this.keyboard = true;
    };

    _this.keyboard = true;
    return _this;
  }

  Core.prototype.render = function render() {
    var _props = this.props,
        autoFocus = _props.autoFocus,
        className = _props.className,
        children = _props.children,
        disabled = _props.disabled,
        onBlur = _props.onBlur,
        onKeyDown = _props.onKeyDown,
        onKeyUp = _props.onKeyUp,
        tabIndex = _props.tabIndex,
        testId = _props.testId,
        title = _props.title,
        tooltipPositioning = _props.tooltipPositioning,
        onKeyboardFocus = _props.onKeyboardFocus,
        onSubmitKeyPressed = _props.onSubmitKeyPressed,
        other = (0, _objectWithoutProperties3.default)(_props, ["autoFocus", "className", "children", "disabled", "onBlur", "onKeyDown", "onKeyUp", "tabIndex", "testId", "title", "tooltipPositioning", "onKeyboardFocus", "onSubmitKeyPressed"]);


    return _react2.default.createElement(
      _View2.default,
      (0, _extends3.default)({}, other, {
        autoFocus: autoFocus,
        className: className,
        testId: testId,
        disabled: disabled,
        onBlur: onBlur,
        onClick: this.onClick,
        onEnter: this.onSubmitKeyPressed,
        onFocus: this.onFocus,
        onMouseDown: this.onMouseDown,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
        onSpace: this.onSubmitKeyPressed,
        tabIndex: disabled ? null : tabIndex,
        role: "button",
        title: title,
        tooltipPositioning: tooltipPositioning
      }),
      children
    );
  };

  return Core;
}(_react.Component);

Core.propTypes = {
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onKeyboardFocus: _propTypes2.default.func,
  onSubmitKeyPressed: _propTypes2.default.func,
  tabIndex: _propTypes2.default.number,
  testId: _propTypes2.default.string,
  title: _propTypes2.default.string,
  /** <a href="#view">See View</a> */
  tooltipPositioning: function tooltipPositioning() {},
  children: _propTypes2.default.node
};
Core.defaultProps = {
  tabIndex: 0
};
exports.default = Core;