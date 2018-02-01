"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require("react-dom");

var _reactVirtualized = require("react-virtualized");

var _ThemedComponent2 = require("../utils/theming/ThemedComponent");

var _ThemedComponent3 = _interopRequireDefault(_ThemedComponent2);

var _View = require("../core/View");

var _View2 = _interopRequireDefault(_View);

var _keyCodes = require("../utils/keyCodes.js");

var _keyCodes2 = _interopRequireDefault(_keyCodes);

var _Column = require("./Column.js");

var _Column2 = _interopRequireDefault(_Column);

var _CheckboxColumn = require("./CheckboxColumn.js");

var _CheckboxColumn2 = _interopRequireDefault(_CheckboxColumn);

var _MenuColumn = require("./MenuColumn.js");

var _MenuColumn2 = _interopRequireDefault(_MenuColumn);

var _OverflowMenu = require("./OverflowMenu.js");

var _OverflowMenu2 = _interopRequireDefault(_OverflowMenu);

var _Rows = require("./Rows.js");

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GardenColumn = function GardenColumn() {
  (0, _classCallCheck3.default)(this, GardenColumn);
};

var GardenCheckboxColumn = function GardenCheckboxColumn() {
  (0, _classCallCheck3.default)(this, GardenCheckboxColumn);
};

var GardenMenuColumn = function GardenMenuColumn() {
  (0, _classCallCheck3.default)(this, GardenMenuColumn);
};

var Table = function (_ThemedComponent) {
  (0, _inherits3.default)(Table, _ThemedComponent);

  function Table(props, context) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, _ThemedComponent.call(this, props, context, {
      namespace: "Table",
      styles: _styles2.default
    }));

    _this.onRowClick = function (_ref) {
      var event = _ref.event,
          index = _ref.index;
      var onRowClick = _this.props.onRowClick;


      onRowClick && onRowClick(index, event);
      _this.onRowFocus(index, true);
    };

    _this.onRowFocus = function (focusedRow, isFocused) {
      var onRowFocus = _this.props.onRowFocus;

      onRowFocus && onRowFocus(focusedRow);

      _this.setState({
        focusedRow: focusedRow,
        isFocused: isFocused
      });

      _this.tableRef.scrollToRow(focusedRow);
    };

    _this.onSort = function (sortState) {
      var onSort = _this.props.onSort;

      onSort && onSort(sortState);

      _this.onRowFocus(0, false);
    };

    _this.retrieveSelectedMapping = function (selectedData) {
      var mapping = {};

      for (var _iterator = selectedData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var key = _ref2;

        mapping[key] = true;
      }

      return mapping;
    };

    _this.retrieveColumns = function () {
      var theme = _this.theme;
      var children = _this.props.children;

      var tableColumns = [];

      _react2.default.Children.forEach(children, function (child, index) {
        if (child.type === GardenColumn) {
          tableColumns.push((0, _Column2.default)({
            columnProps: child.props,
            tableProps: _this.props,
            key: index,
            theme: theme
          }));
        } else if (child.type === GardenCheckboxColumn) {
          _this.checkboxDataKey = child.props.dataKey;
          _this.onSelection = child.props.onSelection;

          var checkboxColumn = (0, _CheckboxColumn2.default)({
            childProps: child.props,
            tableProps: _this.props,
            key: index,
            theme: theme,
            selectedMapping: _this.selectedMapping,
            onHeaderSelection: function onHeaderSelection() {
              return _this.onRowFocus(0, false);
            }
          });
          tableColumns.push(checkboxColumn);
        } else if (child.type === GardenMenuColumn) {
          tableColumns.push((0, _MenuColumn2.default)({
            columnProps: child.props,
            tableState: _this.state,
            tableProps: _this.props,
            key: index,
            theme: theme,
            onRowFocus: _this.onRowFocus
          }));
        } else {
          tableColumns.push(child);
        }
      });

      return tableColumns;
    };

    _this.retrieveNextValidFocusIndex = function (scrollToRow) {
      var _this$props = _this.props,
          isGroupRow = _this$props.isGroupRow,
          data = _this$props.data;
      var focusedRow = _this.state.focusedRow;

      scrollToRow = scrollToRow === -1 ? 0 : scrollToRow;

      if (!isGroupRow) {
        return scrollToRow;
      }

      while (scrollToRow < data.length && scrollToRow >= 0 && isGroupRow(scrollToRow)) {
        if (scrollToRow < focusedRow && scrollToRow !== 0) {
          scrollToRow--;
        } else {
          scrollToRow++;
        }
      }

      return scrollToRow;
    };

    _this.applyKeyboardActions = function (tableReference) {
      var innerRef = _this.props.innerRef;

      innerRef && innerRef(tableReference);

      var mouseDown = function mouseDown(event) {
        _this.focusedByMouse = true;

        setTimeout(function () {
          _this.focusedByMouse = false;
        }, 0);
      };

      var focusIn = function focusIn(event) {
        var focusedRow = _this.state.focusedRow;


        if (!_this.focusedByMouse) {
          var newlyFocusedRow = _this.retrieveNextValidFocusIndex(focusedRow);
          _this.onRowFocus(newlyFocusedRow, true);
        }
      };

      var blur = function blur(event) {
        _this.setState({ isFocused: false });
      };

      var keyDown = function keyDown(event) {
        var _handlers;

        var _this$props2 = _this.props,
            data = _this$props2.data,
            onRowClick = _this$props2.onRowClick,
            isRowDisabled = _this$props2.isRowDisabled;
        var focusedRow = _this.state.focusedRow;
        var keyCode = event.keyCode;


        var handlers = (_handlers = {}, _handlers[_keyCodes2.default.SPACE] = function (event) {
          event.preventDefault();

          if (isRowDisabled && isRowDisabled(focusedRow)) {
            return;
          }

          var isRowSelected = _this.selectedMapping[data[focusedRow][_this.checkboxDataKey]];

          if (!isRowSelected) {
            _this.selectedMapping[data[focusedRow][_this.checkboxDataKey]] = true;
          } else {
            delete _this.selectedMapping[data[focusedRow][_this.checkboxDataKey]];
          }

          var selectedData = [];
          for (var key in _this.selectedMapping) {
            selectedData.push(key);
          }

          _this.onSelection && _this.onSelection(selectedData);
        }, _handlers[_keyCodes2.default.ENTER] = function (event) {
          event.preventDefault();
          onRowClick && onRowClick(focusedRow, event);
        }, _handlers[_keyCodes2.default.HOME] = function (event) {
          event.preventDefault();

          // Necessary to remove focus from nested element on key navigation
          var gridElement = (0, _reactDom.findDOMNode)(_this.tableRef.Grid);
          gridElement.focus();

          _this.onRowFocus(_this.retrieveNextValidFocusIndex(0), true);
        }, _handlers[_keyCodes2.default.END] = function (event) {
          event.preventDefault();

          // Necessary to remove focus from nested element on key navigation
          var gridElement = (0, _reactDom.findDOMNode)(_this.tableRef.Grid);
          gridElement.focus();

          _this.onRowFocus(_this.retrieveNextValidFocusIndex(data.length - 1), true);
        }, _handlers);

        var handler = handlers[keyCode];
        handler && handler(event);
      };

      if (!_this.tableRef && tableReference) {
        _this.tableRef = tableReference;
        var gridElement = (0, _reactDom.findDOMNode)(_this.tableRef.Grid);

        gridElement.addEventListener("mousedown", mouseDown);
        gridElement.addEventListener("focusin", focusIn);
        gridElement.addEventListener("blur", blur);
        gridElement.addEventListener("keydown", keyDown);
      } else if (_this.tableRef && !tableReference) {
        var _gridElement = (0, _reactDom.findDOMNode)(_this.tableRef.Grid);

        _gridElement.removeEventListener("mousedown", mouseDown);
        _gridElement.removeEventListener("focusin", focusIn);
        _gridElement.removeEventListener("blur", blur);
        _gridElement.removeEventListener("keydown", keyDown);
      }
    };

    _this.state = {
      focusedRow: 0,
      isFocused: false
    };
    return _this;
  }

  Table.prototype.componentWillMount = function componentWillMount() {
    var selectedData = this.props.selectedData;

    this.selectedMapping = this.retrieveSelectedMapping(selectedData);
  };

  Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var selectedData = nextProps.selectedData;

    this.selectedMapping = this.retrieveSelectedMapping(selectedData);

    this.tableRef.recomputeRowHeights();
  };

  Table.prototype.render = function render() {
    var _this2 = this;

    var theme = this.theme;
    var _props = this.props,
        className = _props.className,
        data = _props.data,
        density = _props.density,
        dir = _props.dir,
        _rowRenderer = _props.rowRenderer,
        _onRowsRendered = _props.onRowsRendered,
        useAutoSizer = _props.useAutoSizer,
        testId = _props.testId,
        otherTableProps = (0, _objectWithoutProperties3.default)(_props, ["className", "data", "density", "dir", "rowRenderer", "onRowsRendered", "useAutoSizer", "testId"]);
    var focusedRow = this.state.focusedRow;


    var tableElement = function tableElement(width, height) {
      return _react2.default.createElement(
        _reactVirtualized.ArrowKeyStepper,
        {
          columnCount: 1,
          isControlled: true,
          onScrollToChange: function onScrollToChange(_ref3) {
            var scrollToRow = _ref3.scrollToRow;

            var focusedRow = _this2.retrieveNextValidFocusIndex(scrollToRow);

            // Necessary to remove focus from nested element on key navigation
            var gridElement = (0, _reactDom.findDOMNode)(_this2.tableRef.Grid);
            gridElement.focus();

            _this2.onRowFocus(focusedRow, true);
          },
          mode: "cells",
          rowCount: data.length,
          scrollToRow: focusedRow
        },
        function (_ref4) {
          var _classNames;

          var onSectionRendered = _ref4.onSectionRendered;
          return _react2.default.createElement(
            _reactVirtualized.Table,
            (0, _extends3.default)({
              width: width,
              height: height,
              headerHeight: (0, _Rows.retrieveHeaderHeight)(_this2.props),
              rowHeight: function rowHeight(rowProps) {
                return (0, _Rows.retrieveRowHeight)(rowProps, _this2.props);
              },
              rowCount: data.length,
              ref: _this2.applyKeyboardActions,
              rowGetter: function rowGetter(_ref5) {
                var index = _ref5.index;
                return data[index];
              },
              className: (0, _classnames2.default)(theme.table, (_classNames = {}, _classNames[theme.table_sm] = density === "cozy", _classNames[theme.table_lg] = density === "airy", _classNames[theme.rtl] = dir === "rtl", _classNames)),
              tabIndex: 0,
              gridClassName: theme.grid,
              gridStyle: { direction: dir },
              onHeaderClick: function onHeaderClick(_ref6) {
                var event = _ref6.event;

                // Necessary to allow Select All to function
                var nodeName = event.target.nodeName;
                if (nodeName !== "INPUT" && nodeName !== "LABEL") {
                  event.preventDefault();
                }
              },
              headerRowRenderer: function headerRowRenderer(rowProps) {
                return (0, _Rows.headerRowRenderer)(rowProps, _this2.props, theme);
              }
            }, otherTableProps, {
              sort: _this2.onSort,
              onRowClick: _this2.onRowClick,
              rowRenderer: function rowRenderer(rowProps) {
                if (_rowRenderer) {
                  return _rowRenderer(rowProps, function (updateRowProps) {
                    return (0, _Rows.rowRenderer)(updateRowProps, _this2.props, _this2.state, theme, _this2.selectedMapping);
                  });
                }

                return (0, _Rows.rowRenderer)(rowProps, _this2.props, _this2.state, theme, _this2.selectedMapping);
              },
              onRowsRendered: function onRowsRendered(options) {
                onSectionRendered({
                  rowStartIndex: options.startIndex,
                  rowStopIndex: options.stopIndex
                });

                _onRowsRendered && _onRowsRendered(options);
              }
            }),
            _this2.retrieveColumns()
          );
        }
      );
    };

    return _react2.default.createElement(
      _View2.default,
      {
        className: (0, _classnames2.default)(theme.table_container, className),
        testId: testId
      },
      useAutoSizer && _react2.default.createElement(
        _reactVirtualized.AutoSizer,
        null,
        function (_ref7) {
          var width = _ref7.width,
              height = _ref7.height;
          return tableElement(width, height);
        }
      ),
      !useAutoSizer && tableElement(this.props.width, this.props.height)
    );
  };

  return Table;
}(_ThemedComponent3.default);

Table.Column = GardenColumn;
Table.CheckboxColumn = GardenCheckboxColumn;
Table.MenuColumn = GardenMenuColumn;
Table.OverflowMenu = _OverflowMenu2.default;
Table.propTypes = {
  striped: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  /**
   * Array of data objects to apply to each table row
   */
  data: _propTypes2.default.array.isRequired,
  /**
   * Array of selected data ID's
   */
  selectedData: _propTypes2.default.array,
  density: _propTypes2.default.oneOf(["default", "cozy", "airy"]),
  dir: _propTypes2.default.oneOf(["ltr", "rtl"]),
  onSort: _propTypes2.default.func,
  sortBy: _propTypes2.default.string,
  sortDirection: _propTypes2.default.oneOf(["ASC", "DESC"]),
  isRowDisabled: _propTypes2.default.func,
  isGroupRow: function isGroupRow(_ref8) {
    var _isGroupRow = _ref8.isGroupRow,
        groupRowRenderer = _ref8.groupRowRenderer,
        striped = _ref8.striped;

    if (_isGroupRow && !groupRowRenderer) {
      throw new Error("groupRowRenderer is required if isGroupRow is provided.");
    } else if (_isGroupRow && striped) {
      console.warn("Striped table styling should not be used with grouped rows.");
    }
  },
  groupRowRenderer: function groupRowRenderer(_ref9) {
    var _groupRowRenderer = _ref9.groupRowRenderer,
        isGroupRow = _ref9.isGroupRow;

    if (_groupRowRenderer && !isGroupRow) {
      throw new Error("isGroupRow is required if groupRowRenderer is provided.");
    }
  },
  onRowClick: _propTypes2.default.func,
  onRowFocus: _propTypes2.default.func,
  children: _propTypes2.default.node.isRequired,
  /**
   * The reference of the react-virtualized Table component
   */
  innerRef: _propTypes2.default.func,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  useAutoSizer: _propTypes2.default.bool,
  testId: _propTypes2.default.string
};
Table.defaultProps = {
  selectedData: [],
  striped: false,
  density: "default",
  dir: "ltr",
  useAutoSizer: true
};
exports.default = Table;