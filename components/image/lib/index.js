'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var React = require('react');
var React__default = _interopDefault(React);
var classNames = _interopDefault(require('classnames'));
require('@micromag/core');
var size = require('@folklore/size');

var styles = {"img":"micromag-component-image-img","container":"micromag-component-image-container"};

var defaultProps = {
  url: null,
  imageWidth: null,
  imageHeight: null,
  caption: null,
  width: null,
  height: null,
  maxWidth: null,
  maxHeight: null,
  fit: null,
  className: null
};

var Image = function Image(_ref) {
  var url = _ref.url,
      caption = _ref.caption,
      imageWidth = _ref.imageWidth,
      imageHeight = _ref.imageHeight,
      width = _ref.width,
      height = _ref.height,
      maxWidth = _ref.maxWidth,
      maxHeight = _ref.maxHeight,
      fit = _ref.fit,
      className = _ref.className;
  var imgRef = React.useRef(null);

  var _useState = React.useState({
    width: imageWidth,
    height: imageHeight
  }),
      _useState2 = _slicedToArray(_useState, 2),
      imageSize = _useState2[0],
      setImageSize = _useState2[1];

  var onLoad = React.useCallback(function () {
    setImageSize({
      width: imgRef.current.naturalWidth,
      height: imgRef.current.naturalHeight
    });
  }, []);

  var _ref2 = fit || {},
      _ref2$size = _ref2.size,
      size$1 = _ref2$size === void 0 ? 'contain' : _ref2$size;

  var imgSize = width !== null && height !== null ? size.getSizeWithinBounds(imageSize.width, imageSize.height, width, height, {
    cover: size$1 === 'cover'
  }) : null;
  var img = React__default.createElement("img", {
    src: url,
    alt: caption,
    className: classNames([styles.img, _defineProperty({}, className, className !== null)]),
    style: imgSize !== null ? {
      width: imgSize.width,
      height: imgSize.height,
      top: (height - imgSize.height) / 2,
      left: (width - imgSize.width) / 2
    } : {
      maxWidth: maxWidth,
      maxHeight: maxHeight
    },
    ref: imgRef,
    onLoad: onLoad
  });
  return imgSize !== null ? React__default.createElement("div", {
    className: classNames([styles.container, _defineProperty({}, className, className !== null)]),
    style: {
      width: width,
      height: height
    }
  }, img) : img;
};

Image.defaultProps = defaultProps;

module.exports = Image;
