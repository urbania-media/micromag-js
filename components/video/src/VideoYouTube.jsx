/* globals YT: true */
/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, jsx-a11y/control-has-associated-label */
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { loadYouTube } from '@folklore/services';

import { isYouTube, getYouTubeVideoId } from './utils';
import useYouTubeVideoSize from './useYouTubeVideoSize';
import PosterYouTube from './PosterYouTube';
import Video from './Video';

import styles from './styles/video.module.scss';

const propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    controls: PropTypes.bool,
    refPlayer: PropTypes.shape({
        current: PropTypes.object,
    }),
    className: PropTypes.string,
    onReady: PropTypes.func,
    onStateChange: PropTypes.func,
    onCurrentTimeChange: PropTypes.func,
};

const defaultProps = {
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
    onCurrentTimeChange: null,
};

const VideoYouTube = ({
    url,
    width,
    height,
    autoPlay,
    muted: initialMuted,
    controls,
    refPlayer: refPlayerExternal,
    className,
    onReady,
    onStateChange,
    onCurrentTimeChange,
}) => {
    const videoId = getYouTubeVideoId(url);
    const refIframe = useRef(null);
    const refPlayer = useRef(null);
    const refVideoId = useRef(videoId);

    // Get video size
    const videoSize = useYouTubeVideoSize(videoId, null);

    // Player state
    const [playerState, setPlayerState] = useState({
        hasPlayed: false,
        playing: false,
        paused: false,
        ended: false,
        muted: initialMuted,
    });
    const updatePlayerState = useCallback(
        newPlayerState => {
            setPlayerState(newPlayerState);
            if (onStateChange !== null) {
                onStateChange(newPlayerState);
            }
        },
        [setPlayerState, onStateChange],
    );

    // Load SDK and player
    const [loaded, setLoaded] = useState(typeof YT !== 'undefined');
    const [ready, setReady] = useState(false);

    // Load SDK
    useEffect(() => {
        let canceled = false;
        if (!loaded) {
            loadYouTube().then(() => {
                if (!canceled) {
                    setLoaded(true);
                }
            });
        }
        return () => {
            canceled = true;
        };
    }, []);

    // Create player
    useEffect(() => {
        if (!loaded) {
            return () => {};
        }
        let canceled = false;

        const onPlayerReady = () => {
            if (!canceled) {
                setReady(true);
            }
        };

        const onPlayerStateChange = event => {
            if (!canceled) {
                const newPlayerState = {
                    hasPlayed: true,
                    playing: event.data === YT.PlayerState.PLAYING,
                    paused: event.data === YT.PlayerState.PAUSED,
                    ended: event.data === YT.PlayerState.ENDED,
                    muted: event.target.isMuted(),
                };
                updatePlayerState(newPlayerState);
            }
        };

        const player = new YT.Player(refIframe.current, {
            width,
            height,
            videoId,
            playerVars: {
                autoplay: autoPlay ? 1 : 0,
                controls: controls ? 2 : 0,
                autohide: controls ? 1 : 0,
                modestbranding: !controls ? 1 : 0,
                rel: !controls ? 0 : 1,
                showinfo: !controls ? 0 : 1,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
        refPlayer.current = player;
        refVideoId.current = videoId;

        return () => {
            canceled = true;
            player.removeEventListener('onReady', onPlayerReady);
            player.removeEventListener('onStateChange', onPlayerStateChange);
            player.destroy();
            refPlayer.current = null;
            refVideoId.current = null;
        };
    }, [loaded, setReady, updatePlayerState, onReady]);

    // Trigger onReady
    useEffect(() => {
        if (ready && videoSize !== null && onReady !== null) {
            onReady();
        }
    }, [ready]);

    // Switch video when videoId change
    useEffect(() => {
        if (!ready) {
            return;
        }
        if (refVideoId.current !== videoId) {
            refPlayer.current.loadVideoById(videoId);
            refVideoId.current = videoId;
        }
    }, [ready, videoId]);

    // Update player state
    useEffect(() => {
        if (!ready) {
            return () => {};
        }

        const { current: player } = refPlayer;
        const { playing = true, muted = false } = playerState;

        // Update mute/unmute
        if (muted !== player.isMuted()) {
            if (muted) {
                player.mute();
            } else {
                player.unMute();
            }
        }

        // Update current time
        let currentTimeInterval = null;
        const updateCurrentTime = newCurrentTime => {
            if (onCurrentTimeChange !== null) {
                onCurrentTimeChange(newCurrentTime);
            }
        };
        if (playing) {
            currentTimeInterval = setInterval(
                () => updateCurrentTime(player.getCurrentTime()),
                100,
            );
        } else {
            updateCurrentTime(player.getCurrentTime());
        }

        return () => {
            if (currentTimeInterval !== null) {
                clearInterval(currentTimeInterval);
            }
        };
    }, [ready, playerState]);

    // Player API
    const playerApi = useMemo(
        () => ({
            ...playerState,
            play: () => (refPlayer.current !== null ? refPlayer.current.playVideo() : null),
            pause: () => (refPlayer.current !== null ? refPlayer.current.pauseVideo() : null),
            stop: () => (refPlayer.current !== null ? refPlayer.current.stopVideo() : null),
            seek: time => (refPlayer.current !== null ? refPlayer.current.seekTo(time) : null),
            duration: () => (refPlayer.current !== null ? refPlayer.current.getDuration() : 0),
            currentTime: () =>
                refPlayer.current !== null ? refPlayer.current.getCurrentTime() : 0,
            size: () => videoSize,
            mute: () =>
                updatePlayerState({
                    ...playerState,
                    muted: true,
                }),
            unMute: () =>
                updatePlayerState({
                    ...playerState,
                    muted: false,
                }),
        }),
        [playerState, updatePlayerState, videoSize],
    );

    if (refPlayerExternal !== null) {
        // eslint-disable-next-line no-param-reassign
        refPlayerExternal.current = playerApi;
    }

    const onClickPlayPause = useCallback(() => {
        if (playerApi.playing) {
            playerApi.pause();
        } else {
            playerApi.play();
        }
    }, [playerApi]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isReady]: ready,
                    [styles.hasPlayed]: playerState.hasPlayed,
                    [className]: className,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            <button type="button" className={styles.blockButton} onClick={onClickPlayPause} />
            <PosterYouTube url={url} className={styles.poster} />
            <div ref={refIframe} className={styles.iframe} />
        </div>
    );
};

VideoYouTube.propTypes = propTypes;
VideoYouTube.defaultProps = defaultProps;
VideoYouTube.testUrl = isYouTube;

Video.registerPlayer(VideoYouTube);

export default VideoYouTube;
