'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var React = _interopDefault(require('react'));
var classNames = _interopDefault(require('classnames'));
var core = require('@micromag/core');

var styles = {"container":"micromag-screen-timeline-images-container"};

var defaultProps = {
  // props from fields
  isPreview: true,
  isPlaceholder: false,
  className: null
};

var TimelineImages = function TimelineImages(_ref) {
  var _ref2;

  var isPreview = _ref.isPreview,
      isPlaceholder = _ref.isPlaceholder,
      className = _ref.className;
  // Gives you the story width / height if necessary
  // const { width, height } = useScreenSize();
  // const innerStyle = {
  //     width,
  //     height,
  // };
  return React.createElement("div", {
    className: classNames([styles.container, (_ref2 = {}, _defineProperty(_ref2, styles.isPreview, isPreview), _defineProperty(_ref2, styles.isPlaceholder, isPlaceholder), _defineProperty(_ref2, className, className !== null), _ref2)])
  }, React.createElement("div", {
    className: styles.inner
  }, isPlaceholder ? React.createElement(core.Placeholders.Image, {
    className: styles.placeholder
  }) : null));
};

TimelineImages.defaultProps = defaultProps;

module.exports = TimelineImages;
