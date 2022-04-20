import { FormattedMessage, defineMessage } from 'react-intl';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { PropTypes as PropTypes$1 } from '@micromag/core';
import { ScreenElement, PlaceholderTitle, Empty, PlaceholderVideo, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewerNavigation } from '@micromag/core/contexts';
import { useTrackScreenMedia, useLongPress, useResizeObserver } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Image from '@micromag/element-image';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1083.95 1920'%3e %3cg id='a'/%3e %3cg id='b'%3e %3cg id='c'%3e %3cpath d='M1083.95%2c0h-103.4l-438.55%2c959.95L1083.95%2c109.31V0Zm0%2c295L542.02%2c959.96l541.93-498.87v-166.08Zm0%2c274.99l-541.92%2c389.98%2c541.92-279.64v-110.34Zm0%2c190.53l-541.92%2c199.46%2c541.92-110.89v-88.57Zm0%2c158.17l-541.92%2c41.31%2c541.92%2c41.31v-82.61Zm0%2c152.21l-541.92-110.89%2c541.92%2c199.46v-88.58Zm0%2c168.77l-541.92-279.64%2c541.92%2c389.98v-110.34Zm0%2c219.25l-541.93-498.87%2c541.93%2c664.95v-166.08Zm0%2c351.77L542%2c960.05l438.55%2c959.95h103.4v-109.31ZM854.8%2c0h-138.91l-173.9%2c959.94L854.8%2c0Zm0%2c1920l-312.81-959.94%2c173.9%2c959.94h138.91ZM606.75%2c0h-129.56l64.78%2c959.94L606.75%2c0Zm0%2c1920l-64.78-959.94-64.78%2c959.94h129.56Zm-64.79-960.06L368.06%2c0H229.15l312.81%2c959.94Zm0%2c.12L229.15%2c1920h138.91l173.9-959.94Zm-.01-.11L103.4%2c0H0V109.31L541.94%2c959.95Zm0%2c.11L0%2c1810.69v109.31H103.4l438.55-959.95Zm-.01-.1L0%2c295.01v166.08l541.93%2c498.87Zm0%2c.09L0%2c1458.91v166.08L541.93%2c960.04Zm-.01-.07L0%2c570v110.34l541.92%2c279.63Zm0%2c.02L0%2c760.52v88.57l541.92%2c110.89Zm0%2c.02L0%2c918.69v82.61l541.92-41.31Zm0%2c.02L0%2c1070.9v88.57l541.92-199.46Zm0%2c.02L0%2c1239.66v110.34l541.92-389.97Z' fill='hsla(0%2c0%25%2c100%25%2c.6)'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1083.95 1920'%3e %3cg id='a'/%3e %3cg id='b'%3e %3cg id='c'%3e %3cpath d='M1083.95%2c0h-103.4l-438.55%2c959.95L1083.95%2c109.31V0Zm0%2c295L542.02%2c959.96l541.93-498.87v-166.08Zm0%2c274.99l-541.92%2c389.98%2c541.92-279.64v-110.34Zm0%2c190.53l-541.92%2c199.46%2c541.92-110.89v-88.57Zm0%2c158.17l-541.92%2c41.31%2c541.92%2c41.31v-82.61Zm0%2c152.21l-541.92-110.89%2c541.92%2c199.46v-88.58Zm0%2c168.77l-541.92-279.64%2c541.92%2c389.98v-110.34Zm0%2c219.25l-541.93-498.87%2c541.93%2c664.95v-166.08Zm0%2c351.77L542%2c960.05l438.55%2c959.95h103.4v-109.31ZM854.8%2c0h-138.91l-173.9%2c959.94L854.8%2c0Zm0%2c1920l-312.81-959.94%2c173.9%2c959.94h138.91ZM606.75%2c0h-129.56l64.78%2c959.94L606.75%2c0Zm0%2c1920l-64.78-959.94-64.78%2c959.94h129.56Zm-64.79-960.06L368.06%2c0H229.15l312.81%2c959.94Zm0%2c.12L229.15%2c1920h138.91l173.9-959.94Zm-.01-.11L103.4%2c0H0V109.31L541.94%2c959.95Zm0%2c.11L0%2c1810.69v109.31H103.4l438.55-959.95Zm-.01-.1L0%2c295.01v166.08l541.93%2c498.87Zm0%2c.09L0%2c1458.91v166.08L541.93%2c960.04Zm-.01-.07L0%2c570v110.34l541.92%2c279.63Zm0%2c.02L0%2c760.52v88.57l541.92%2c110.89Zm0%2c.02L0%2c918.69v82.61l541.92-41.31Zm0%2c.02L0%2c1070.9v88.57l541.92-199.46Zm0%2c.02L0%2c1239.66v110.34l541.92-389.97Z' fill='%2312bbd7'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var styles = {"container":"micromag-screen-urbania-trivia-container","content":"micromag-screen-urbania-trivia-content","empty":"micromag-screen-urbania-trivia-empty","emptyContainer":"micromag-screen-urbania-trivia-emptyContainer","fullscreen":"micromag-screen-urbania-trivia-fullscreen","image":"micromag-screen-urbania-trivia-image","placeholder":"micromag-screen-urbania-trivia-placeholder","disabled":"micromag-screen-urbania-trivia-disabled","hidden":"micromag-screen-urbania-trivia-hidden","itemsContainer":"micromag-screen-urbania-trivia-itemsContainer","videoContainer":"micromag-screen-urbania-trivia-videoContainer","video":"micromag-screen-urbania-trivia-video","isCustomBackground":"micromag-screen-urbania-trivia-isCustomBackground","isAnimated":"micromag-screen-urbania-trivia-isAnimated","spin":"micromag-screen-urbania-trivia-spin","heading":"micromag-screen-urbania-trivia-heading","hideHeading":"micromag-screen-urbania-trivia-hideHeading","callToAction":"micromag-screen-urbania-trivia-callToAction","bottom":"micromag-screen-urbania-trivia-bottom","visible":"micromag-screen-urbania-trivia-visible","withGradient":"micromag-screen-urbania-trivia-withGradient","mediaControls":"micromag-screen-urbania-trivia-mediaControls","bottomContent":"micromag-screen-urbania-trivia-bottomContent"};

var defaultBackground = {
  image: {
    type: 'image',
    url: img,
    width: 1083,
    height: 1919
  },
  color: '#00cbff'
};
var placeholderBackground = {
  image: {
    type: 'image',
    url: img$1,
    width: 1083,
    height: 1919
  },
  color: null
};
var propTypes = {
  layout: PropTypes.oneOf(['middle', 'full']),
  title: PropTypes$1.headingElement,
  video: PropTypes$1.videoElement,
  gotoNextScreenOnEnd: PropTypes.bool,
  background: PropTypes$1.backgroundElement,
  callToAction: PropTypes$1.callToAction,
  current: PropTypes.bool,
  active: PropTypes.bool,
  transitions: PropTypes$1.transitions,
  spacing: PropTypes.number,
  padding: PropTypes.number,
  getMediaRef: PropTypes.func,
  className: PropTypes.string
};
var defaultProps = {
  layout: 'full',
  title: null,
  video: null,
  gotoNextScreenOnEnd: false,
  background: null,
  callToAction: null,
  current: true,
  active: true,
  transitions: null,
  spacing: 20,
  padding: 20,
  getMediaRef: null,
  className: null
};

var UrbaniaTrivia = function UrbaniaTrivia(_ref) {
  var _ref11, _ref12, _ref14, _ref15;

  var layout = _ref.layout,
      title = _ref.title,
      video = _ref.video,
      gotoNextScreenOnEnd = _ref.gotoNextScreenOnEnd,
      background = _ref.background,
      callToAction = _ref.callToAction,
      current = _ref.current,
      active = _ref.active,
      transitions = _ref.transitions,
      spacing = _ref.spacing,
      padding = _ref.padding,
      getMediaRef = _ref.getMediaRef,
      className = _ref.className;
  var trackScreenMedia = useTrackScreenMedia('video');

  var _useScreenSize = useScreenSize(),
      width = _useScreenSize.width,
      height = _useScreenSize.height;

  var _useScreenRenderConte = useScreenRenderContext(),
      isView = _useScreenRenderConte.isView,
      isPreview = _useScreenRenderConte.isPreview,
      isPlaceholder = _useScreenRenderConte.isPlaceholder,
      isEdit = _useScreenRenderConte.isEdit,
      isStatic = _useScreenRenderConte.isStatic,
      isCapture = _useScreenRenderConte.isCapture;

  var _useViewerNavigation = useViewerNavigation(),
      gotoNextScreen = _useViewerNavigation.gotoNextScreen;

  var backgroundPlaying = current && (isView || isEdit);
  var backgroundShouldLoad = current || active || !isView;
  var videoShouldLoad = current || active || !isView;
  var shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

  var _ref2 = title || {},
      _ref2$body = _ref2.body,
      body = _ref2$body === void 0 ? '' : _ref2$body; // get resized video style props


  var _ref3 = video || {},
      _ref3$autoPlay = _ref3.autoPlay,
      autoPlay = _ref3$autoPlay === void 0 ? true : _ref3$autoPlay,
      _ref3$media = _ref3.media,
      videoMedia = _ref3$media === void 0 ? null : _ref3$media,
      _ref3$closedCaptions = _ref3.closedCaptions,
      closedCaptions = _ref3$closedCaptions === void 0 ? null : _ref3$closedCaptions,
      _ref3$withSeekBar = _ref3.withSeekBar,
      withSeekBar = _ref3$withSeekBar === void 0 ? false : _ref3$withSeekBar,
      _ref3$withPlayPause = _ref3.withPlayPause,
      withPlayPause = _ref3$withPlayPause === void 0 ? false : _ref3$withPlayPause,
      _ref3$withTime = _ref3.withTime,
      withTime = _ref3$withTime === void 0 ? false : _ref3$withTime;

  var apiRef = useRef();

  var _ref4 = apiRef.current || {},
      togglePlay = _ref4.togglePlay,
      toggleMute = _ref4.toggleMute,
      seek = _ref4.seek,
      play = _ref4.play,
      pause = _ref4.pause,
      _ref4$mediaRef = _ref4.mediaRef,
      apiMediaRef = _ref4$mediaRef === void 0 ? null : _ref4$mediaRef;

  useEffect(function () {
    if (apiMediaRef !== null && getMediaRef !== null) {
      getMediaRef(apiMediaRef.current);
    }
  }, [apiMediaRef, getMediaRef]);
  var mouseMoveRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMediaControls = _useState2[0],
      setShowMediaControls = _useState2[1]; // Get api state updates from callback


  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      currentTime = _useState4[0],
      setCurrentTime = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      duration = _useState6[0],
      setDuration = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      playing = _useState8[0],
      setPlaying = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      muted = _useState10[0],
      setMuted = _useState10[1];

  var onTimeUpdate = useCallback(function (time) {
    setCurrentTime(time);
  }, [setDuration, duration]);
  var onProgressStep = useCallback(function (step) {
    trackScreenMedia(video, "progress_".concat(Math.round(step * 100, 10), "%"));
  }, [trackScreenMedia, video]);
  var onDurationChanged = useCallback(function (dur) {
    setDuration(dur);
  }, [setDuration]);
  var onPlay = useCallback(function (_ref5) {
    var initial = _ref5.initial;
    setPlaying(true);
    trackScreenMedia(video, initial ? 'play' : 'resume');
  }, [trackScreenMedia, video]);
  var onPause = useCallback(function (_ref6) {
    var midway = _ref6.midway;
    setPlaying(false);
    trackScreenMedia(video, midway ? 'pause' : 'ended');
  }, [trackScreenMedia, video]);
  var onVolumeChanged = useCallback(function (isMuted) {
    setMuted(isMuted);
    trackScreenMedia(video, isMuted ? 'mute' : 'unmute');
  }, [trackScreenMedia, video]);
  var onSeek = useCallback(function (e) {
    seek(e);
    play();
  }, [seek, play]);
  var onSeeked = useCallback(function (time) {
    if (time > 0) {
      trackScreenMedia(video, 'seek');
    }
  }, [trackScreenMedia, video]);
  var onToggleMute = useCallback(function () {
    if (muted && !playing) {
      play();
    }

    toggleMute();
  }, [muted, toggleMute]);
  var onEnded = useCallback(function () {
    if (shouldGotoNextScreenOnEnd) {
      gotoNextScreen();
    }
  }, [shouldGotoNextScreenOnEnd, seek, gotoNextScreen]);
  useEffect(function () {
    if (!current && playing) {
      pause();
    }
  }, [playing, current]);
  var onMouseMove = useCallback(function (e) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1800;
    setShowMediaControls(true);

    if (mouseMoveRef.current !== null) {
      clearTimeout(mouseMoveRef.current);
    }

    mouseMoveRef.current = setTimeout(function () {
      setShowMediaControls(false);
      mouseMoveRef.current = null;
    }, time);
  }, [setShowMediaControls]);
  var onLongPress = useCallback(function () {
    if (!playing) {
      play();
    } else if (withPlayPause) {
      onMouseMove(null, 3000);
    } else {
      pause();
    }
  }, [play, playing, pause, onMouseMove, withPlayPause, setShowMediaControls]);
  var longPressBind = useLongPress({
    onLongPress: onLongPress,
    onClick: onMouseMove
  });
  var fullscreen = layout === 'full';
  var hasCallToAction = callToAction !== null && callToAction.active === true;

  var _ref7 = background || {},
      _ref7$image = _ref7.image,
      backgroundImage = _ref7$image === void 0 ? null : _ref7$image,
      _ref7$video = _ref7.video,
      backgroundVideo = _ref7$video === void 0 ? null : _ref7$video;

  var isCustomBackground = background === null || backgroundImage === null && backgroundVideo === null;
  var hasVideo = video !== null;

  var _useState11 = useState(hasVideo),
      _useState12 = _slicedToArray(_useState11, 2),
      ready = _useState12[0],
      setReady = _useState12[1];

  var transitionPlaying = current && ready;
  var transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
  var finalVideo = useMemo(function () {
    return hasVideo ? _objectSpread(_objectSpread({}, video), {}, {
      autoPlay: !isPreview && !isStatic && !isCapture && autoPlay && current
    }) : null;
  }, [hasVideo, video, isPreview, isStatic, isCapture, autoPlay, current]);

  var _ref8 = videoMedia || {},
      _ref8$metadata = _ref8.metadata,
      videoMetadata = _ref8$metadata === void 0 ? null : _ref8$metadata,
      _ref8$url = _ref8.url,
      videoUrl = _ref8$url === void 0 ? null : _ref8$url,
      _ref8$thumbnail_url = _ref8.thumbnail_url,
      thumbnailUrl = _ref8$thumbnail_url === void 0 ? null : _ref8$thumbnail_url;

  var hasVideoUrl = videoUrl !== null; // const hasThumbnail = thumbnailUrl !== null;
  // const [posterReady, setPosterReady] = useState(!hasThumbnail);

  var _ref9 = videoMetadata || {},
      _ref9$width = _ref9.width,
      videoWidth = _ref9$width === void 0 ? 0 : _ref9$width,
      _ref9$height = _ref9.height,
      videoHeight = _ref9$height === void 0 ? 0 : _ref9$height;

  var _useResizeObserver = useResizeObserver(),
      titleRef = _useResizeObserver.ref,
      _useResizeObserver$en = _useResizeObserver.entry.contentRect,
      contentRect = _useResizeObserver$en === void 0 ? null : _useResizeObserver$en;

  var _ref10 = contentRect || {},
      _ref10$height = _ref10.height,
      titleHeight = _ref10$height === void 0 ? 0 : _ref10$height;

  var videoMaxHeight = height - titleHeight - (padding ? padding * 2 : 40);

  var _getSizeWithinBounds = getSizeWithinBounds(videoWidth, videoHeight, width, videoMaxHeight, {
    cover: fullscreen
  }),
      resizedVideoWidth = _getSizeWithinBounds.width,
      resizedVideoHeight = _getSizeWithinBounds.height;

  var resizedVideoLeft = -(resizedVideoWidth - width) / 2; // const resizedVideoTop = -(resizedVideoHeight - videoMaxHeight) / 2;

  var finalBackground = useMemo(function () {
    if (isArray(background) && background.length > 0) {
      return background;
    }

    if (background !== null) {
      return _objectSpread(_objectSpread({}, defaultBackground), background);
    }

    return defaultBackground;
  }, [background]);
  var placeholderProps = fullscreen ? {
    width: '100%',
    height: '100%'
  } : {
    width: '100%'
  };
  useEffect(function () {
    setReady(!hasVideoUrl);
  }, [videoUrl, hasVideoUrl, setReady]);
  var onVideoReady = useCallback(function () {
    setReady(true);
  }, [setReady]);
  var visibleControls = !autoPlay && !playing || muted || showMediaControls;
  var items = [/*#__PURE__*/React.createElement(Container, {
    className: styles.itemsContainer
  }, /*#__PURE__*/React.createElement(ScreenElement, {
    key: "heading",
    className: styles.headingScreenElement,
    placeholder: /*#__PURE__*/React.createElement(PlaceholderTitle, Object.assign({
      className: styles.placeholder
    }, placeholderProps)),
    empty: /*#__PURE__*/React.createElement("div", {
      className: styles.emptyContainer
    }, /*#__PURE__*/React.createElement(Empty, {
      className: styles.empty
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "oAtOlP",
      defaultMessage: [{
        "type": 0,
        "value": "Heading"
      }]
    }))),
    isEmpty: body.length === 0
  }, /*#__PURE__*/React.createElement("div", {
    ref: titleRef
  }, /*#__PURE__*/React.createElement(Heading, Object.assign({
    className: classNames([styles.heading, (_ref11 = {}, _defineProperty(_ref11, className, className !== null), _defineProperty(_ref11, styles.hideHeading, body.length === 0), _ref11)]),
    body: body
  }, title)))), /*#__PURE__*/React.createElement(ScreenElement, {
    key: "video",
    className: styles.videoScreenElement,
    placeholder: /*#__PURE__*/React.createElement(PlaceholderVideo, Object.assign({
      className: styles.placeholder,
      height: "300px"
    }, placeholderProps)),
    empty: /*#__PURE__*/React.createElement("div", {
      className: styles.emptyContainer
    }, /*#__PURE__*/React.createElement(Empty, {
      className: styles.empty
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "3ext9Q",
      defaultMessage: [{
        "type": 0,
        "value": "Video"
      }]
    }))),
    isEmpty: !hasVideoUrl
  }, hasVideoUrl ? /*#__PURE__*/React.createElement("div", {
    className: styles.videoContainer,
    style: {
      width: Math.min(width, resizedVideoWidth),
      height: resizedVideoHeight,
      left: resizedVideoLeft > 0 ? resizedVideoLeft : null,
      maxHeight: videoMaxHeight
    }
  }, isPreview || isCapture ? /*#__PURE__*/React.createElement(Image, {
    className: styles.image,
    media: {
      url: thumbnailUrl,
      metadata: {
        width: videoWidth,
        height: videoHeight
      }
    },
    width: "100%",
    height: "100%"
  }) : /*#__PURE__*/React.createElement(Video, Object.assign({}, finalVideo, {
    ref: apiRef,
    width: resizedVideoWidth,
    height: resizedVideoHeight,
    className: styles.video,
    onReady: onVideoReady,
    onPlay: onPlay,
    onPause: onPause,
    onTimeUpdate: onTimeUpdate,
    onProgressStep: onProgressStep,
    onDurationChanged: onDurationChanged,
    onSeeked: onSeeked,
    onEnded: onEnded,
    onVolumeChanged: onVolumeChanged,
    focusable: current && isView,
    preload: videoShouldLoad ? 'auto' : 'metadata'
  })), !isPlaceholder ? /*#__PURE__*/React.createElement("div", {
    key: "bottom-content",
    className: styles.bottomContent
  }, /*#__PURE__*/React.createElement(Transitions, {
    playing: transitionPlaying,
    transitions: transitions,
    disabled: transitionDisabled
  }, closedCaptions !== null && !isPreview && !isCapture && !isStatic ? /*#__PURE__*/React.createElement(ClosedCaptions, {
    className: styles.closedCaptions,
    media: closedCaptions,
    currentTime: currentTime
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: classNames([styles.bottom, (_ref12 = {}, _defineProperty(_ref12, styles.visible, visibleControls), _defineProperty(_ref12, styles.withGradient, withSeekBar || withPlayPause || muted), _ref12)])
  }, hasVideoUrl ? /*#__PURE__*/React.createElement(MediaControls, {
    className: classNames([styles.mediaControls, _defineProperty({}, styles.visible, visibleControls)]),
    withSeekBar: withSeekBar,
    withPlayPause: withPlayPause,
    withTime: withTime,
    playing: playing,
    muted: muted,
    currentTime: currentTime,
    duration: duration,
    onTogglePlay: togglePlay,
    onToggleMute: onToggleMute,
    onSeek: onSeek,
    focusable: current && isView
  }) : null, hasCallToAction ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: -spacing / 2
    }
  }, /*#__PURE__*/React.createElement(CallToAction, {
    className: styles.callToAction,
    callToAction: callToAction,
    animationDisabled: isPreview,
    focusable: current && isView,
    screenSize: {
      width: width,
      height: height
    }
  })) : null))) : null) : null))];
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classNames([styles.container, (_ref14 = {}, _defineProperty(_ref14, className, className !== null), _defineProperty(_ref14, styles.fullscreen, fullscreen), _ref14)]),
    "data-screen-ready": isStatic || isCapture || ready
  }, longPressBind, {
    onMouseMove: onMouseMove
  }), !isPlaceholder ? /*#__PURE__*/React.createElement(Background, {
    background: finalBackground,
    className: classNames([styles.background, (_ref15 = {}, _defineProperty(_ref15, className, className !== null), _defineProperty(_ref15, styles.isCustomBackground, isCustomBackground), _defineProperty(_ref15, styles.isAnimated, !isStatic && !isPreview && isCustomBackground), _ref15)]),
    width: width,
    height: height,
    playing: backgroundPlaying,
    shouldLoad: backgroundShouldLoad
  }) : /*#__PURE__*/React.createElement(Background, {
    background: placeholderBackground,
    className: styles.background,
    width: width,
    height: height,
    styles: {
      backgroundColor: 'red'
    }
  }), /*#__PURE__*/React.createElement(Container, {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, items)));
};

UrbaniaTrivia.propTypes = propTypes;
UrbaniaTrivia.defaultProps = defaultProps;
var UrbaniaTriviaScreen = /*#__PURE__*/React.memo(UrbaniaTrivia);

var transform = function transform() {
  return null;
};

// eslint-disable-next-line

var transforms = /*#__PURE__*/Object.freeze({
  __proto__: null,
  appleNews: transform
});

var definition = {
  id: 'urbania-trivia',
  type: 'screen',
  group: {
    label: defineMessage({
      id: "oPjl8f",
      defaultMessage: [{
        "type": 0,
        "value": "Urbania"
      }]
    }),
    order: 10
  },
  title: defineMessage({
    id: "eA6lME",
    defaultMessage: [{
      "type": 0,
      "value": "Urbania trivia screen"
    }]
  }),
  component: UrbaniaTriviaScreen,
  transforms: transforms,
  fields: [{
    name: 'title',
    type: 'heading-element',
    theme: {
      textStyle: 'heading1'
    },
    label: defineMessage({
      id: "N25iDO",
      defaultMessage: [{
        "type": 0,
        "value": "Title"
      }]
    })
  }, {
    name: 'video',
    type: 'video-element',
    theme: {
      color: 'primary'
    },
    defaultValue: {
      autoPlay: true
    },
    label: defineMessage({
      id: "tvl2Zc",
      defaultMessage: [{
        "type": 0,
        "value": "Video"
      }]
    })
  }, {
    name: 'gotoNextScreenOnEnd',
    type: 'toggle',
    defaultValue: false,
    label: defineMessage({
      id: "n8zmLY",
      defaultMessage: [{
        "type": 0,
        "value": "Go to next screen on end"
      }]
    })
  }, {
    name: 'background',
    type: 'background',
    label: defineMessage({
      id: "+MPZRu",
      defaultMessage: [{
        "type": 0,
        "value": "Background"
      }]
    })
  } // {
  //     name: 'callToAction',
  //     type: 'call-to-action',
  //     theme: {
  //         label: {
  //             textStyle: 'heading2',
  //         },
  //     },
  // },
  ]
};

export { UrbaniaTriviaScreen as UrbaniaTrivia, definition as default };
