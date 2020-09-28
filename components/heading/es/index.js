import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { useMemo } from 'react';
import uuid from 'uuid/v1';
import classNames from 'classnames';
import '@micromag/core';
import { LinkStyle } from '@micromag/core/components';
import { getStyleFromColor, getStyleFromFont, getStyleFromMargin } from '@micromag/core/utils';

var styles = {"container":"micromag-component-heading-container"};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultProps = {
  size: 1,
  body: null,
  style: null,
  className: null
};

var Heading = function Heading(_ref) {
  var size = _ref.size,
      body = _ref.body,
      style = _ref.style,
      className = _ref.className;
  var HeadingComponent = "h".concat(size);
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
    finalStyle = _objectSpread({}, finalStyle, {}, getStyleFromFont(font), {}, getStyleFromColor(color, 'color'));
  }

  if (margin !== null) {
    finalStyle = _objectSpread({}, finalStyle, {}, getStyleFromMargin(margin));
  }

  if (linksStyle !== null) {
    var _linksStyle$font = linksStyle.font,
        _font = _linksStyle$font === void 0 ? null : _linksStyle$font,
        _linksStyle$color = linksStyle.color,
        _color = _linksStyle$color === void 0 ? null : _linksStyle$color;

    finalLinkStyle = _objectSpread({}, finalLinkStyle, {}, getStyleFromFont(_font), {}, getStyleFromColor(_color, 'color'));
  }

  var id = useMemo(function () {
    return finalLinkStyle !== null ? "text-component-".concat(uuid()) : null;
  }, [finalLinkStyle !== null]);
  return React.createElement(React.Fragment, null, finalLinkStyle !== null ? React.createElement(LinkStyle, {
    selector: "#".concat(id),
    style: finalLinkStyle
  }) : null, React.createElement(HeadingComponent, {
    className: classNames([styles.container, _defineProperty({}, className, className !== null)]),
    style: finalStyle,
    dangerouslySetInnerHTML: {
      __html: body
    }
  }));
};

Heading.defaultProps = defaultProps;

export default Heading;
