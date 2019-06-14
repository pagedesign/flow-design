
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _DesignContext = _interopRequireDefault(require("../DesignContext"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _find = _interopRequireDefault(require("lodash/find"));

var _findIndex = _interopRequireDefault(require("lodash/findIndex"));

var DesignModel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(DesignModel, _React$Component);

  function DesignModel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, DesignModel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(DesignModel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      widgets: [],
      widgetsMap: {},
      items: [],
      activeId: null
    });
    return _this;
  }

  (0, _createClass2["default"])(DesignModel, [{
    key: "onChange",
    value: function onChange(items) {
      var props = this.props;
      var onChange = props.onChange;

      if (onChange) {
        onChange(items);
      }
    }
  }, {
    key: "getWidget",
    value: function getWidget(xtype) {
      var widgetsMap = this.state.widgetsMap;
      return widgetsMap[xtype] || null;
    } // isWidget(widget) {
    //     return !!widget.$$widget;
    // }

  }, {
    key: "getWidgets",
    value: function getWidgets() {
      var widgets = this.state.widgets;
      return [].concat(widgets);
    }
  }, {
    key: "setActiveId",
    value: function setActiveId(activeId) {
      this.setState({
        activeId: activeId
      });
    }
  }, {
    key: "getActiveId",
    value: function getActiveId() {
      return this.state.activeId;
    }
  }, {
    key: "getActiveItem",
    value: function getActiveItem() {
      var activeId = this.state.activeId;
      return this.getItem(activeId) || null;
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var pid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var items = this.getAllItems(); // console.log(items, 'axxx')

      return items.filter(function (item) {
        return item.$pid == pid;
      });
    }
  }, {
    key: "getAllItems",
    value: function getAllItems() {
      return (0, _toConsumableArray2["default"])(this.state.items);
    } //获取组件的所有父级ID

  }, {
    key: "getPids",
    value: function getPids(fieldId) {
      var pids = [];
      var node = this.getItem(fieldId);
      if (!node.$pid) return pids;
      var currentFieldId = node.$pid;
      var pNode;

      while (pNode = this.getItem(currentFieldId)) {
        pids.push(pNode.fieldId);
        currentFieldId = pNode.$pid;
        if (!currentFieldId) break;
      } // console.log(pids, 'pids');


      return pids;
    }
  }, {
    key: "updateItem",
    value: function updateItem(item) {
      var items = this.getAllItems();
      var fieldId = item.fieldId;
      var idx = this.getItemIndex(fieldId);

      if (idx !== -1) {
        items[idx] = item;
      }

      this.onChange(items);
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      var pid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var items = this.getAllItems();
      item.$pid = pid;
      items.push(item);
      this.onChange(items);
    }
  }, {
    key: "removeItem",
    value: function removeItem(fieldId) {
      var _this2 = this;

      var items = this.getAllItems(); //移除指定项目及子项目

      var ret = items.filter(function (item) {
        var shouldRemove = item.fieldId === fieldId;

        if (!shouldRemove) {
          var pids = _this2.getPids(item.fieldId);

          shouldRemove = pids.indexOf(fieldId) > -1;
        }

        return !shouldRemove;
      });
      this.onChange(ret);
    }
  }, {
    key: "getItemIndex",
    value: function getItemIndex(fieldId) {
      var items = this.getAllItems();
      return (0, _findIndex["default"])(items, function (item) {
        return item.fieldId === fieldId;
      });
    }
  }, {
    key: "getItem",
    value: function getItem(fieldId) {
      var items = this.getAllItems();
      return (0, _find["default"])(items, function (item) {
        return item.fieldId === fieldId;
      });
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(item, fieldId) {
      var items = this.getAllItems(); //判断当前item是否已经存在, 如果存在则先删除

      var oIdx = this.getItemIndex(item.fieldId);

      if (oIdx > -1) {
        items.splice(oIdx, 1);
      }

      var bItem = this.getItem(fieldId);
      item.$pid = bItem.$pid; //插入操作

      var idx = this.getItemIndex(fieldId);
      items.splice(idx, 0, item);
      this.onChange(items);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(item, fieldId) {
      var items = this.getAllItems(); //判断当前item是否已经存在, 如果存在则先删除

      var oIdx = this.getItemIndex(item.fieldId);

      if (oIdx > -1) {
        items.splice(oIdx, 1);
      }

      var prevItem = this.getItem(fieldId);
      item.$pid = prevItem.$pid; //插入操作 之前有删除操作, 要重新查找index

      var idx = (0, _findIndex["default"])(items, function (item) {
        return item.fieldId === fieldId;
      });
      items.splice(idx, 1, items[idx], item);
      this.onChange(items);
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return {
        //   isWidget: this.isWidget.bind(this),
        getWidget: this.getWidget.bind(this),
        getWidgets: this.getWidgets.bind(this),
        setActiveId: this.setActiveId.bind(this),
        getActiveId: this.getActiveId.bind(this),
        getActiveItem: this.getActiveItem.bind(this),
        addItem: this.addItem.bind(this),
        getPids: this.getPids.bind(this),
        updateItem: this.updateItem.bind(this),
        getItems: this.getItems.bind(this),
        getAllItems: this.getAllItems.bind(this),
        removeItem: this.removeItem.bind(this),
        getItemIndex: this.getItemIndex.bind(this),
        getItem: this.getItem.bind(this),
        insertBefore: this.insertBefore.bind(this),
        insertAfter: this.insertAfter.bind(this)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react["default"].createElement(_DesignContext["default"].Provider, {
        value: this.getModel()
      }, children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var widgetsMap = {};
      var widgets = props.widgets.map(function (widget) {
        var w = new _Widget["default"](widget);
        widgetsMap[widget.xtype] = w;
        return w;
      });
      return {
        widgets: widgets,
        widgetsMap: widgetsMap,
        items: props.items || []
      };
    }
  }]);
  return DesignModel;
}(_react["default"].Component);

exports["default"] = DesignModel;
(0, _defineProperty2["default"])(DesignModel, "defaultProps", {
  onChange: null,
  widgets: [],
  items: []
});