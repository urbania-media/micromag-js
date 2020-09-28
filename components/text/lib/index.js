'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var React = require('react');
var React__default = _interopDefault(React);
var uuid = _interopDefault(require('uuid/v1'));
var classNames = _interopDefault(require('classnames'));
require('@micromag/core');
var utils = require('@micromag/core/utils');
var components = require('@micromag/core/components');

var styles = {"container":"micromag-component-text-container"};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultProps = {
  body: null,
  style: null,
  className: null
};

var Text = function Text(_ref) {
  var body = _ref.body,
      style = _ref.style,
      className = _ref.className;
  var finalStyle = null;
  var finalLinkStyle = null;

  var _ref2 = style || {},
      _ref2$text = _ref2.text,
      textStyle = _ref2$text === void 0 ? null : _ref2$text,
      _ref2$links = _ref2.links,
      linksStyle = _ref2$links === void 0 ? null : _ref2$links,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === void 0 ? null : _ref2$margin;

  if (textStyle !== null) {
    var _textStyle$font = textStyle.font,
        font = _textStyle$font === void 0 ? null : _textStyle$font,
        _textStyle$color = textStyle.color,
        color = _textStyle$color === void 0 ? null : _textStyle$color;
    finalStyle = _objectSpread({}, finalStyle, {}, utils.getStyleFromFont(font), {}, utils.getStyleFromColor(color, 'color'));
  }

  if (margin !== null) {
    finalStyle = _objectSpread({}, finalStyle, {}, utils.getStyleFromMargin(margin));
  }

  if (linksStyle !== null) {
    var _linksStyle$font = linksStyle.font,
        _font = _linksStyle$font === void 0 ? null : _linksStyle$font,
        _linksStyle$color = linksStyle.color,
        _color = _linksStyle$color === void 0 ? null : _linksStyle$color;

    finalLinkStyle = _objectSpread({}, finalLinkStyle, {}, utils.getStyleFromFont(_font), {}, utils.getStyleFromColor(_color, 'color'));
  }

  var id = React.useMemo(function () {
    return finalLinkStyle !== null ? "text-component-".concat(uuid()) : null;
  }, [finalLinkStyle !== null]);
  return React__default.createElement(React__default.Fragment, null, finalLinkStyle !== null ? React__default.createElement(components.LinkStyle, {
    selector: "#".concat(id),
    style: finalLinkStyle
  }) : null, React__default.createElement("div", {
    id: id,
    className: classNames([styles.container, _defineProperty({}, className, className !== null)]),
    style: finalStyle,
    dangerouslySetInnerHTML: {
      __html: body
    }
  }));
};

Text.defaultProps = defaultProps;

module.exports = Text;
