
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _DesignContext = _interopRequireDefault(require("../../DesignContext"));

var _WidgetDropAccepter = _interopRequireDefault(require("./WidgetDropAccepter"));

var DesignPanel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(DesignPanel, _React$Component);

  function DesignPanel() {
    (0, _classCallCheck2["default"])(this, DesignPanel);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DesignPanel).apply(this, arguments));
  }

  (0, _createClass2["default"])(DesignPanel, [{
    key: "render",
    value: function render() {
      var pid = null;
      var designer = this.context;
      var items = designer.getItems(pid);
      return _react["default"].createElement("div", {
        className: "design-panel"
      }, _react["default"].createElement(_WidgetDropAccepter["default"], {
        items: items,
        pid: pid
      }));
    }
  }]);
  return DesignPanel;
}(_react["default"].Component);

exports["default"] = DesignPanel;
(0, _defineProperty2["default"])(DesignPanel, "contextType", _DesignContext["default"]);