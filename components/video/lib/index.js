'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var React = require('react');
var React__default = _interopDefault(React);
var classNames = _interopDefault(require('classnames'));
var size = require('@folklore/size');
require('@micromag/core');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var utils = require('@micromag/core/utils');
var services = require('@folklore/services');
var contexts = require('@micromag/core/contexts');

var styles = {"container":"micromag-component-video-controls-container","button":"micromag-component-video-controls-button","bar":"micromag-component-video-controls-bar","spacer":"micromag-component-video-controls-spacer","progress":"micromag-component-video-controls-progress","icon":"micromag-component-video-controls-icon"};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultProps = {
  playing: false,
  paused: false,
  ended: false,
  muted: false,
  currentTime: 0,
  duration: 0,
  play: function play() {},
  pause: function pause() {},
  stop: function stop() {},
  mute: function mute() {},
  unMute: function unMute() {},
  progress: null,
  playback: null,
  volume: null,
  className: null
};

var VideoControls = function VideoControls(_ref) {
  var playing = _ref.playing,
      muted = _ref.muted,
      currentTime = _ref.currentTime,
      duration = _ref.duration,
      play = _ref.play,
      pause = _ref.pause,
      mute = _ref.mute,
      unMute = _ref.unMute,
      progress = _ref.progress,
      playback = _ref.playback,
      volume = _ref.volume,
      className = _ref.className;
  var onClickPlayPause = React.useCallback(function () {
    if (playing && pause !== null) {
      pause();
    } else if (!playing && play !== null) {
      play();
    }
  }, [playing, play, pause]);
  var onClickMute = React.useCallback(function () {
    if (muted && unMute !== null) {
      unMute();
    } else if (!muted && mute !== null) {
      mute();
    }
  }, [muted, mute, unMute]);

  var _ref2 = progress || {},
      _ref2$visible = _ref2.visible,
      progressVisible = _ref2$visible === void 0 ? true : _ref2$visible,
      _ref2$color = _ref2.color,
      progressColor = _ref2$color === void 0 ? null : _ref2$color;

  var _ref3 = playback || {},
      _ref3$visible = _ref3.visible,
      playbackVisible = _ref3$visible === void 0 ? true : _ref3$visible,
      _ref3$color = _ref3.color,
      playbackColor = _ref3$color === void 0 ? null : _ref3$color;

  var _ref4 = volume || {},
      _ref4$visible = _ref4.visible,
      volumeVisible = _ref4$visible === void 0 ? true : _ref4$visible,
      _ref4$color = _ref4.color,
      volumeColor = _ref4$color === void 0 ? null : _ref4$color;

  return React__default.createElement("div", {
    className: classNames([styles.container, _defineProperty({}, className, className)])
  }, React__default.createElement("div", {
    className: styles.bar
  }, playbackVisible ? React__default.createElement("button", {
    type: "button",
    className: styles.button,
    onClick: onClickPlayPause,
    style: _objectSpread({}, utils.getStyleFromColor(playbackColor, 'color'))
  }, React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: playing ? freeSolidSvgIcons.faPause : freeSolidSvgIcons.faPlay,
    className: styles.icon
  })) : null, React__default.createElement("div", {
    className: styles.spacer
  }, progressVisible ? React__default.createElement("div", {
    className: classNames(['progress', styles.progress]),
    style: _objectSpread({}, utils.getStyleFromColor(progressColor, 'borderColor', 0.3))
  }, React__default.createElement("div", {
    className: classNames(['progress-bar', styles.progressBar]),
    style: _objectSpread({
      width: "".concat(currentTime / duration * 100, "%")
    }, utils.getStyleFromColor(progressColor, 'backgroundColor'))
  })) : null), volumeVisible ? React__default.createElement("button", {
    type: "button",
    className: styles.button,
    onClick: onClickMute,
    style: _objectSpread({}, utils.getStyleFromColor(volumeColor, 'color'))
  }, React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: muted ? freeSolidSvgIcons.faVolumeMute : freeSolidSvgIcons.faVolumeUp,
    className: styles.icon
  })) : null));
};

VideoControls.defaultProps = defaultProps;

var styles$1 = {"container":"micromag-component-video-video-container","blockButton":"micromag-component-video-video-blockButton","playerContainer":"micromag-component-video-video-playerContainer","poster":"micromag-component-video-video-poster","player":"micromag-component-video-video-player","iframe":"micromag-component-video-video-iframe","controls":"micromag-component-video-video-controls","hasPlayed":"micromag-component-video-video-hasPlayed"};

var defaultProps$1 = {
  url: null,
  players: null,
  width: null,
  height: null,
  autoPlay: false,
  muted: true,
  controls: null,
  fit: null,
  className: null
};

var Video = function Video(_ref) {
  var _ref3;

  var players = _ref.players,
      url = _ref.url,
      width = _ref.width,
      height = _ref.height,
      autoPlay = _ref.autoPlay,
      initialMuted = _ref.muted,
      controls = _ref.controls,
      fit = _ref.fit,
      className = _ref.className;
  var finalPlayers = players || Video.defaultPlayers;
  var PlayerComponent = url !== null ? finalPlayers.find(function (it) {
    return it.testUrl(url);
  }) || null : null;
  var refPlayer = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      playerReady = _useState2[0],
      setPlayerReady = _useState2[1];

  var _useState3 = React.useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      duration = _useState4[0],
      setDuration = _useState4[1];

  var _useState5 = React.useState({
    width: width,
    height: height
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      videoSize = _useState6[0],
      setVideoSize = _useState6[1];

  var _useState7 = React.useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      currentTime = _useState8[0],
      setCurrentTime = _useState8[1];

  var _useState9 = React.useState({
    playing: false,
    paused: false,
    ended: false,
    muted: initialMuted
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      playerState = _useState10[0],
      setPlayerState = _useState10[1];

  var onPlayerReady = React.useCallback(function () {
    setPlayerReady(true);
    setDuration(refPlayer.current.duration());
    setVideoSize(refPlayer.current.size());
  }, [setPlayerReady, setDuration, setVideoSize]);
  var onPlayerStateChange = React.useCallback(function (newPlayerState) {
    setPlayerState(newPlayerState);
  }, [setPlayerState]);
  var onPlayerCurrentTimeChange = React.useCallback(function (newCurrentTime) {
    setCurrentTime(newCurrentTime);
  }, [setCurrentTime]);

  var _ref2 = fit || {},
      _ref2$size = _ref2.size,
      size$1 = _ref2$size === void 0 ? 'fit' : _ref2$size;

  var playerSize = size$1 === 'fit' ? {
    width: width,
    height: height
  } : size.getSizeWithinBounds(videoSize.width, videoSize.height, width, height, {
    cover: size$1 === 'cover'
  });
  return React__default.createElement("div", {
    className: classNames([styles$1.container, (_ref3 = {}, _defineProperty(_ref3, styles$1.isReady, playerReady), _defineProperty(_ref3, className, className), _ref3)]),
    style: {
      width: width,
      height: height
    }
  }, PlayerComponent !== null ? React__default.createElement("div", {
    className: styles$1.playerContainer,
    style: {
      width: playerSize.width,
      height: playerSize.height,
      top: (height - playerSize.height) / 2,
      left: (width - playerSize.width) / 2
    }
  }, React__default.createElement(PlayerComponent, {
    url: url,
    width: playerSize.width,
    height: playerSize.height,
    autoPlay: autoPlay,
    muted: initialMuted,
    refPlayer: refPlayer,
    className: styles$1.player,
    onReady: onPlayerReady,
    onStateChange: onPlayerStateChange,
    onCurrentTimeChange: onPlayerCurrentTimeChange
  })) : null, playerReady ? React__default.createElement(VideoControls, Object.assign({}, refPlayer.current, playerState, controls, {
    duration: duration,
    currentTime: currentTime,
    className: styles$1.controls
  })) : null);
};

Video.defaultProps = defaultProps$1;
Video.defaultPlayers = [];

Video.registerPlayer = function (Player) {
  var playerIndex = Video.defaultPlayers.findIndex(function (it) {
    return it === Player;
  });

  if (playerIndex === -1) {
    Video.defaultPlayers = [].concat(_toConsumableArray(Video.defaultPlayers), [Player]);
  }
};

var isYouTube = function isYouTube(url) {
  return url !== null && url.match(/(youtube\.com|youtu\.be)/i) !== null;
};
var getYouTubeVideoId = function getYouTubeVideoId(url) {
  var videoId = url !== null ? url.match(/(youtu.be\/|v=)([^&?]+)/) : null;
  return videoId !== null ? videoId[2] : url;
};
var sizeMaps = {};
var getYouTubeVideoSize = function getYouTubeVideoSize(client, videoId) {
  var maxWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1920;
  return new Promise(function (resolve, reject) {
    if (typeof sizeMaps[videoId] !== 'undefined') {
      resolve(sizeMaps[videoId]);
      return;
    }

    client.request({
      path: "https://www.googleapis.com/youtube/v3/videos?part=player&maxWidth=".concat(maxWidth, "&id=").concat(videoId)
    }).then(function (_ref) {
      var _ref$result = _ref.result;
      _ref$result = _ref$result === void 0 ? {} : _ref$result;
      var _ref$result$items = _ref$result.items,
          items = _ref$result$items === void 0 ? [] : _ref$result$items;
      var video = items[0] || null;

      if (video === null) {
        throw new Error('Video not found');
      }

      var size = {
        width: parseInt(video.player.embedWidth, 10),
        height: parseInt(video.player.embedHeight, 10)
      };
      sizeMaps[videoId] = size;
      resolve(size);
    }).catch(reject);
  });
};

var useYouTubeVideoSize = function useYouTubeVideoSize(videoId) {
  var initialSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    width: 0,
    height: 0
  };
  var googleApiClient = contexts.useGoogleApiClient();

  var _useState = React.useState(initialSize),
      _useState2 = _slicedToArray(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  React.useEffect(function () {
    if (googleApiClient === null || videoId === null) {
      return;
    }

    getYouTubeVideoSize(googleApiClient.client, videoId).then(function (newSize) {
      return setSize(newSize);
    });
  }, [googleApiClient, videoId]);
  return size;
};

var styles$2 = {"container":"micromag-component-video-poster-container"};

var defaultProps$2 = {
  url: null,
  posters: null,
  width: null,
  height: null,
  className: null
};

var Poster = function Poster(_ref) {
  var posters = _ref.posters,
      url = _ref.url,
      width = _ref.width,
      height = _ref.height,
      className = _ref.className;
  var finalPosters = posters || Poster.defaultPosters;
  var PosterComponent = url !== null ? finalPosters.find(function (it) {
    return it.testUrl(url);
  }) || null : null;
  return PosterComponent !== null ? React__default.createElement(PosterComponent, {
    url: url,
    width: width,
    height: height,
    className: classNames([styles$2.container, _defineProperty({}, className, className !== null)])
  }) : null;
};

Poster.defaultProps = defaultProps$2;
Poster.defaultPosters = [];

Poster.registerPoster = function (PosterComponent) {
  var playerIndex = Poster.defaultPosters.findIndex(function (it) {
    return it === PosterComponent;
  });

  if (playerIndex === -1) {
    Poster.defaultPosters = [].concat(_toConsumableArray(Poster.defaultPosters), [PosterComponent]);
  }
};

var defaultProps$3 = {
  url: null,
  width: null,
  height: null,
  className: null
};

var PosterYouTube = function PosterYouTube(_ref) {
  var url = _ref.url,
      width = _ref.width,
      height = _ref.height,
      className = _ref.className;
  var videoId = getYouTubeVideoId(url);
  return React__default.createElement("div", {
    className: classNames([styles$2.container, _defineProperty({}, className, className)]),
    style: {
      width: width,
      height: height,
      backgroundImage: "url(\"https://img.youtube.com/vi/".concat(videoId, "/hqdefault.jpg\")")
    }
  });
};

PosterYouTube.defaultProps = defaultProps$3;
PosterYouTube.testUrl = isYouTube;
Poster.registerPoster(PosterYouTube);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultProps$4 = {
  url: null,
  width: null,
  height: null,
  autoPlay: false,
  muted: false,
  controls: false,
  refPlayer: null,
  className: null,
  onReady: null,
  onStateChange: null,
  onCurrentTimeChange: null
};

var VideoYouTube = function VideoYouTube(_ref) {
  var _ref2;

  var url = _ref.url,
      width = _ref.width,
      height = _ref.height,
      autoPlay = _ref.autoPlay,
      initialMuted = _ref.muted,
      controls = _ref.controls,
      refPlayerExternal = _ref.refPlayer,
      className = _ref.className,
      onReady = _ref.onReady,
      onStateChange = _ref.onStateChange,
      onCurrentTimeChange = _ref.onCurrentTimeChange;
  var videoId = getYouTubeVideoId(url);
  var refIframe = React.useRef(null);
  var refPlayer = React.useRef(null);
  var refVideoId = React.useRef(videoId); // Get video size

  var videoSize = useYouTubeVideoSize(videoId, null); // Player state

  var _useState = React.useState({
    hasPlayed: false,
    playing: false,
    paused: false,
    ended: false,
    muted: initialMuted
  }),
      _useState2 = _slicedToArray(_useState, 2),
      playerState = _useState2[0],
      setPlayerState = _useState2[1];

  var updatePlayerState = React.useCallback(function (newPlayerState) {
    setPlayerState(newPlayerState);

    if (onStateChange !== null) {
      onStateChange(newPlayerState);
    }
  }, [setPlayerState, onStateChange]); // Load SDK and player

  var _useState3 = React.useState(typeof YT !== 'undefined'),
      _useState4 = _slicedToArray(_useState3, 2),
      loaded = _useState4[0],
      setLoaded = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      ready = _useState6[0],
      setReady = _useState6[1]; // Load SDK


  React.useEffect(function () {
    var canceled = false;

    if (!loaded) {
      services.loadYouTube().then(function () {
        if (!canceled) {
          setLoaded(true);
        }
      });
    }

    return function () {
      canceled = true;
    };
  }, []); // Create player

  React.useEffect(function () {
    if (!loaded) {
      return function () {};
    }

    var canceled = false;

    var onPlayerReady = function onPlayerReady() {
      if (!canceled) {
        setReady(true);
      }
    };

    var onPlayerStateChange = function onPlayerStateChange(event) {
      if (!canceled) {
        var newPlayerState = {
          hasPlayed: true,
          playing: event.data === YT.PlayerState.PLAYING,
          paused: event.data === YT.PlayerState.PAUSED,
          ended: event.data === YT.PlayerState.ENDED,
          muted: event.target.isMuted()
        };
        updatePlayerState(newPlayerState);
      }
    };

    var player = new YT.Player(refIframe.current, {
      width: width,
      height: height,
      videoId: videoId,
      playerVars: {
        autoplay: autoPlay ? 1 : 0,
        controls: controls ? 2 : 0,
        autohide: controls ? 1 : 0,
        modestbranding: !controls ? 1 : 0,
        rel: !controls ? 0 : 1,
        showinfo: !controls ? 0 : 1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    refPlayer.current = player;
    refVideoId.current = videoId;
    return function () {
      canceled = true;
      player.removeEventListener('onReady', onPlayerReady);
      player.removeEventListener('onStateChange', onPlayerStateChange);
      player.destroy();
      refPlayer.current = null;
      refVideoId.current = null;
    };
  }, [loaded, setReady, updatePlayerState, onReady]); // Trigger onReady

  React.useEffect(function () {
    if (ready && videoSize !== null && onReady !== null) {
      onReady();
    }
  }, [ready]); // Switch video when videoId change

  React.useEffect(function () {
    if (!ready) {
      return;
    }

    if (refVideoId.current !== videoId) {
      refPlayer.current.loadVideoById(videoId);
      refVideoId.current = videoId;
    }
  }, [ready, videoId]); // Update player state

  React.useEffect(function () {
    if (!ready) {
      return function () {};
    }

    var player = refPlayer.current;
    var _playerState$playing = playerState.playing,
        playing = _playerState$playing === void 0 ? true : _playerState$playing,
        _playerState$muted = playerState.muted,
        muted = _playerState$muted === void 0 ? false : _playerState$muted; // Update mute/unmute

    if (muted !== player.isMuted()) {
      if (muted) {
        player.mute();
      } else {
        player.unMute();
      }
    } // Update current time


    var currentTimeInterval = null;

    var updateCurrentTime = function updateCurrentTime(newCurrentTime) {
      if (onCurrentTimeChange !== null) {
        onCurrentTimeChange(newCurrentTime);
      }
    };

    if (playing) {
      currentTimeInterval = setInterval(function () {
        return updateCurrentTime(player.getCurrentTime());
      }, 100);
    } else {
      updateCurrentTime(player.getCurrentTime());
    }

    return function () {
      if (currentTimeInterval !== null) {
        clearInterval(currentTimeInterval);
      }
    };
  }, [ready, playerState]); // Player API

  var playerApi = React.useMemo(function () {
    return _objectSpread$1({}, playerState, {
      play: function play() {
        return refPlayer.current !== null ? refPlayer.current.playVideo() : null;
      },
      pause: function pause() {
        return refPlayer.current !== null ? refPlayer.current.pauseVideo() : null;
      },
      stop: function stop() {
        return refPlayer.current !== null ? refPlayer.current.stopVideo() : null;
      },
      seek: function seek(time) {
        return refPlayer.current !== null ? refPlayer.current.seekTo(time) : null;
      },
      duration: function duration() {
        return refPlayer.current !== null ? refPlayer.current.getDuration() : 0;
      },
      currentTime: function currentTime() {
        return refPlayer.current !== null ? refPlayer.current.getCurrentTime() : 0;
      },
      size: function size() {
        return videoSize;
      },
      mute: function mute() {
        return updatePlayerState(_objectSpread$1({}, playerState, {
          muted: true
        }));
      },
      unMute: function unMute() {
        return updatePlayerState(_objectSpread$1({}, playerState, {
          muted: false
        }));
      }
    });
  }, [playerState, updatePlayerState, videoSize]);

  if (refPlayerExternal !== null) {
    // eslint-disable-next-line no-param-reassign
    refPlayerExternal.current = playerApi;
  }

  var onClickPlayPause = React.useCallback(function () {
    if (playerApi.playing) {
      playerApi.pause();
    } else {
      playerApi.play();
    }
  }, [playerApi]);
  return React__default.createElement("div", {
    className: classNames([styles$1.container, (_ref2 = {}, _defineProperty(_ref2, styles$1.isReady, ready), _defineProperty(_ref2, styles$1.hasPlayed, playerState.hasPlayed), _defineProperty(_ref2, className, className), _ref2)]),
    style: {
      width: width,
      height: height
    }
  }, React__default.createElement("button", {
    type: "button",
    className: styles$1.blockButton,
    onClick: onClickPlayPause
  }), React__default.createElement(PosterYouTube, {
    url: url,
    className: styles$1.poster
  }), React__default.createElement("div", {
    ref: refIframe,
    className: styles$1.iframe
  }));
};

VideoYouTube.defaultProps = defaultProps$4;
VideoYouTube.testUrl = isYouTube;
Video.registerPlayer(VideoYouTube);

exports.Controls = VideoControls;
exports.Poster = Poster;
exports.PosterYouTube = PosterYouTube;
exports.Video = Video;
exports.VideoYouTube = VideoYouTube;
exports.default = Video;
