
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _default(props) {
  var item = props.item;
  var classString = (0, _classnames["default"])((0, _defineProperty2["default"])({
    'widget-preview-item-inner': true
  }, props.className, props.className));
  return _react["default"].createElement("div", {
    className: classString
  }, _react["default"].createElement("label", {
    className: "widget-preview-title"
  }, item.title));
}