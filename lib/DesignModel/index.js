
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _DesignContext = _interopRequireDefault(require("../DesignContext"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _find = _interopRequireDefault(require("lodash/find"));

var _findIndex = _interopRequireDefault(require("lodash/findIndex"));

var _differenceBy = _interopRequireDefault(require("lodash/differenceBy"));

var _jsplumb = require("jsplumb");

var DesignModel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(DesignModel, _React$Component);
  (0, _createClass2["default"])(DesignModel, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var widgetsMap = {};
      var widgets = props.widgets.map(function (widget) {
        var w = new _Widget["default"](widget);
        widgetsMap[w.key] = w;
        return w;
      });
      return {
        widgets: widgets,
        widgetsMap: widgetsMap,
        items: props.items || []
      };
    }
  }]);

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
    _this.flowInstance = _this.getFlowInstance();
    return _this;
  }

  (0, _createClass2["default"])(DesignModel, [{
    key: "getFlowInstance",
    value: function getFlowInstance() {
      var _this2 = this;

      if (this.flowInstance) return this.flowInstance;

      var instance = _jsplumb.jsPlumb.getInstance({
        // drag options
        DragOptions: {
          cursor: "pointer",
          zIndex: 2000
        },
        // default to a gradient stroke from blue to green.
        PaintStyle: {
          stroke: "#000",
          strokeWidth: 2
        },
        Container: "canvas",
        ConnectionOverlays: [["Arrow", {
          location: 1,
          visible: true,
          width: 11,
          length: 11,
          id: "ARROW",
          events: {
            click: function click() {
              alert("you clicked on the arrow overlay");
            }
          }
        }], ["Label", {
          label: "<span class='connection-close'>x</span>",
          id: "label",
          cssClass: "connection-line",
          events: {
            click: function click(conn) {
              instance.deleteConnection(conn.component);

              _this2.onChange();
            }
          }
        }]],
        //鼠标经过样式
        HoverPaintStyle: {
          stroke: "#ec9f2e"
        }
      });

      instance.bind("connection", function (conn) {
        //查看被连接的两个点间是否已经连接过
        var conns = instance.getConnections({
          source: conn.sourceId,
          target: conn.targetId
        }); //如果大于1条或链接本身，则不连接

        if (conns.length > 1 || conn.sourceId === conn.targetId) {
          instance.deleteConnection(conn.connection);
        } else {
          if (instance._ignoreEvent) {
            return;
          }

          _this2.onChange();
        }
      });
      return instance;
    }
  }, {
    key: "onChange",
    value: function onChange(items, relations) {
      var props = this.props;
      var onChange = props.onChange;

      if (!items) {
        items = this.getAllItems();
      }

      if (!relations) {
        relations = this.flowInstance.getAllConnections();
        relations = relations.map(function (conn) {
          return {
            sourceId: conn.sourceId,
            targetId: conn.targetId
          };
        }); // console.log(relations, 'abcc')
      }

      if (onChange) {
        onChange(items, relations);
      }
    }
  }, {
    key: "getWidget",
    value: function getWidget(key) {
      var widgetsMap = this.state.widgetsMap;
      return widgetsMap[key] || null;
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
      this.setActiveId(item.fieldId);
      this.onChange(items);
    }
  }, {
    key: "removeItem",
    value: function removeItem(fieldId) {
      var _this3 = this;

      var items = this.getAllItems(); //移除指定项目及子项目

      var ret = items.filter(function (item) {
        var shouldRemove = item.fieldId === fieldId;

        if (!shouldRemove) {
          var pids = _this3.getPids(item.fieldId);

          shouldRemove = pids.indexOf(fieldId) > -1;
        }

        return !shouldRemove;
      });
      var allConns = this.flowInstance.getAllConnections(); //注jsPlumb返回的元对象引用，在删除过程中使用splice删除导致forEach漏删问题
      //copy出来

      (0, _toConsumableArray2["default"])(allConns).forEach(function (conn) {
        if (conn.sourceId === fieldId || conn.targetId === fieldId) {
          _this3.flowInstance.deleteConnection(conn);
        }
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
        flowInstance: this.flowInstance,
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
    key: "diffNodeRelactions",
    value: function diffNodeRelactions() {
      var relations = this.props.relations;
      var conns = this.flowInstance.getAllConnections();
      var newConns = (0, _differenceBy["default"])(relations, conns, function (conn) {
        return [conn.sourceId, conn.targetId].join("->");
      });
      var delConns = (0, _differenceBy["default"])(conns, relations, function (conn) {
        return [conn.sourceId, conn.targetId].join("->");
      });

      if (delConns.length) {
        this.deleteConns(delConns);
      }

      if (newConns.length) {
        this.connectNodes(newConns);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.diffNodeRelactions();
    }
  }, {
    key: "connectNodes",
    value: function connectNodes() {
      var _this4 = this;

      var conns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // console.log("connectNodes", conns);
      conns.forEach(function (conn) {
        _this4.flowInstance.connect({
          source: conn.sourceId,
          target: conn.targetId
        });
      });
    }
  }, {
    key: "deleteConns",
    value: function deleteConns() {
      var _this5 = this;

      var conns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      conns.forEach(function (conn) {
        _this5.flowInstance.deleteConnection(conn.connection);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //初始时不触发onChange
      this.flowInstance._ignoreEvent = true;
      this.diffNodeRelactions();
      this.flowInstance._ignoreEvent = false; // this.flowInstance.bind("click", (c) => {
      //     this.flowInstance.deleteConnection(c);
      //     this.onChange()
      // });
    } // componentWillUnmount() {
    //     this.flowInstance.deleteEveryConnection();
    // }

  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react["default"].createElement(_DesignContext["default"].Provider, {
        value: this.getModel()
      }, children);
    }
  }]);
  return DesignModel;
}(_react["default"].Component);

exports["default"] = DesignModel;
(0, _defineProperty2["default"])(DesignModel, "defaultProps", {
  onChange: null,
  widgets: [],
  items: [],
  relations: []
});