"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemConfig = function (_Component) {
  (0, _inherits3.default)(ItemConfig, _Component);

  function ItemConfig() {
    (0, _classCallCheck3.default)(this, ItemConfig);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ItemConfig.prototype.render = function render() {
    return null;
  };

  return ItemConfig;
}(_react.Component);

ItemConfig.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  children: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  id: _propTypes2.default.string.isRequired
  /* eslint-enable react/no-unused-prop-types */
};
exports.default = ItemConfig;