import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import '@micromag/core';
import { getSizeWithinBounds } from '@folklore/size';

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
  var imgRef = useRef(null);

  var _useState = useState({
    width: imageWidth,
    height: imageHeight
  }),
      _useState2 = _slicedToArray(_useState, 2),
      imageSize = _useState2[0],
      setImageSize = _useState2[1];

  var onLoad = useCallback(function () {
    setImageSize({
      width: imgRef.current.naturalWidth,
      height: imgRef.current.naturalHeight
    });
  }, []);

  var _ref2 = fit || {},
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 'contain' : _ref2$size;

  var imgSize = width !== null && height !== null ? getSizeWithinBounds(imageSize.width, imageSize.height, width, height, {
    cover: size === 'cover'
  }) : null;
  var img = React.createElement("img", {
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
  return imgSize !== null ? React.createElement("div", {
    className: classNames([styles.container, _defineProperty({}, className, className !== null)]),
    style: {
      width: width,
      height: height
    }
  }, img) : img;
};

Image.defaultProps = defaultProps;

export default Image;
