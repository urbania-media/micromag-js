import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import '@micromag/core';

var styles = {"container":"micromag-component-grid-container","items":"micromag-component-grid-items","row":"micromag-component-grid-row","column":"micromag-component-grid-column"};

var defaultProps = {
  layout: [{
    rows: 2,
    columns: [1]
  }, {
    rows: 1,
    columns: [1, 1, 1]
  }],
  items: [],
  width: null,
  height: null,
  spacing: 0,
  className: null,
  rowClassName: null,
  columnClassName: null
};

var Grid = function Grid(_ref) {
  var items = _ref.items,
      layout = _ref.layout,
      width = _ref.width,
      height = _ref.height,
      spacing = _ref.spacing,
      className = _ref.className,
      rowClassName = _ref.rowClassName,
      columnClassName = _ref.columnClassName;
  var itemIndex = 0;
  var finalLayout = layout || [{
    rows: 1,
    columns: items.map(function () {
      return 1;
    })
  }];
  var rowTotal = finalLayout.reduce(function (total, _ref2) {
    var _ref2$rows = _ref2.rows,
        rows = _ref2$rows === void 0 ? 1 : _ref2$rows;
    return total + rows;
  }, 0);
  return React.createElement("div", {
    className: classNames([styles.container, _defineProperty({}, className, className !== null)]),
    style: {
      width: width,
      height: height,
      padding: spacing !== null && spacing > 0 ? spacing / 2 : null
    }
  }, React.createElement("div", {
    className: styles.items
  }, finalLayout.map(function (_ref4, rowIndex) {
    var rows = _ref4.rows,
        _ref4$columns = _ref4.columns,
        columns = _ref4$columns === void 0 ? [] : _ref4$columns;
    var finalColumns = isArray(columns) ? columns : [columns];
    var columnTotal = finalColumns.reduce(function (total, it) {
      return total + it;
    }, 0);
    return React.createElement("div", {
      key: "row-".concat(rowIndex),
      className: classNames([styles.row, _defineProperty({}, rowClassName, rowClassName !== null)]),
      style: {
        height: "".concat(100 * (rows / rowTotal), "%")
      }
    }, finalColumns.map(function (column, columnIndex) {
      var item = items[itemIndex];
      itemIndex += 1;
      return React.createElement("div", {
        key: "row-".concat(rowIndex, "-").concat(columnIndex),
        className: classNames([styles.column, _defineProperty({}, columnClassName, columnClassName !== null)]),
        style: {
          width: "".concat(100 * (column / columnTotal), "%"),
          padding: spacing !== null && spacing > 0 ? spacing / 2 : null
        }
      }, item);
    }));
  })));
};

Grid.defaultProps = defaultProps;

export default Grid;
