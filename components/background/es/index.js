import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import classNames from 'classnames';
import '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';

var styles = {"container":"micromag-component-background-container"};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultProps = {
  width: null,
  height: null,
  color: null,
  image: null,
  className: null
};

var Background = function Background(_ref) {
  var width = _ref.width,
      height = _ref.height,
      color = _ref.color,
      image = _ref.image,
      className = _ref.className;
  var finalStyle = {
    width: width,
    height: height
  };

  if (color !== null) {
    finalStyle = _objectSpread({}, finalStyle, {}, getStyleFromColor(color, 'backgroundColor'));
  }

  if (image !== null) {
    finalStyle = _objectSpread({}, finalStyle, {
      backgroundImage: "url(\"".concat(image.url, "\")")
    });
  }

  return React.createElement("div", {
    className: classNames([styles.container, _defineProperty({}, className, className !== null)]),
    style: finalStyle
  });
};

Background.defaultProps = defaultProps;

export default Background;
