/* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/control-has-associated-label */
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isFile } from './utils';
import Poster from './Poster';
import Video from './Video';

import styles from './styles/video.module.scss';

const propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    loop: PropTypes.bool,
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
    muted: true,
    loop: false,
    refPlayer: null,
    className: null,
    onReady: null,
    onStateChange: null,
    onCurrentTimeChange: null,
};

const VideoFile = ({
    url,
    width,
    height,
    autoPlay,
    muted: initialMuted,
    loop,
    refPlayer: refPlayerExternal,
    className,
    onReady,
    onStateChange,
    onCurrentTimeChange,
}) => {
    const refVideo = useRef(null);
    const refPlayer = useRef(null);
    const videoSize = { width, height };

    // Player state
    const [playerState, setPlayerState] = useState({
        hasPlayed: false,
        playing: autoPlay,
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

    const [ready, setReady] = useState(true);

    useEffect(() => {
        refVideo.current.addEventListener('canplay', () => {
            setReady(true);
        });
        return () => {
            refVideo.current.removeEventListener('canplay', () => {
                setReady(false);
            });
        };
    }, [setReady]);

    // Add events
    // useEffect(() => {
    //     if (!loaded) {
    //         return () => {};
    //     }
    //     let canceled = false;
    //
    //     const onPlayerReady = () => {
    //         if (!canceled) {
    //             setReady(true);
    //         }
    //     };
    //
    //     const onPlayerStateChange = event => {
    //         if (!canceled) {
    //             const newPlayerState = {
    //                 hasPlayed: true,
    //                 playing: event.data === YT.PlayerState.PLAYING,
    //                 paused: event.data === YT.PlayerState.PAUSED,
    //                 ended: event.data === YT.PlayerState.ENDED,
    //                 muted: event.target.isMuted(),
    //             };
    //             updatePlayerState(newPlayerState);
    //         }
    //     };
    //
    //     const player = new YT.Player(refVideo.current, {
    //         width,
    //         height,
    //         videoId,
    //         playerVars: {
    //             autoplay: autoPlay ? 1 : 0,
    //             controls: controls ? 2 : 0,
    //             autohide: controls ? 1 : 0,
    //             modestbranding: !controls ? 1 : 0,
    //             rel: !controls ? 0 : 1,
    //             showinfo: !controls ? 0 : 1,
    //         },
    //         events: {
    //             onReady: onPlayerReady,
    //             onStateChange: onPlayerStateChange,
    //         },
    //     });
    //     refPlayer.current = player;
    //     refVideoId.current = videoId;
    //
    //     return () => {
    //         canceled = true;
    //         player.removeEventListener('onReady', onPlayerReady);
    //         player.removeEventListener('onStateChange', onPlayerStateChange);
    //         player.destroy();
    //         refPlayer.current = null;
    //         refVideoId.current = null;
    //     };
    // }, [loaded, setReady, updatePlayerState, onReady]);

    // Trigger onReady
    useEffect(() => {
        if (ready && videoSize !== null && onReady !== null) {
            onReady();
        }
    }, [ready]);

    // Update player state
    useEffect(() => {
        if (!ready || !refPlayer.current) {
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
            play: () => (refVideo.current !== null ? refVideo.current.play() : null),
            pause: () => (refVideo.current !== null ? refVideo.current.pause() : null),
            stop: () => {
                if (refVideo.current !== null) {
                    refVideo.current.pause();
                    refVideo.current.currentTime = 0;
                }
            },
            seek: time => {
                if (refVideo.current !== null) {
                    refVideo.current.currentTime = time;
                }
            },
            duration: () => (refVideo.current !== null ? refVideo.current.duration : 0),
            currentTime: () => (refVideo.current !== null ? refVideo.current.currentTime : 0),
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
            <button
                type="button"
                className={styles.blockButton}
                onClick={!loop ? onClickPlayPause : null}
            />
            <Poster url={url} className={styles.poster} />
            <video
                ref={refVideo}
                className={styles.videoFile}
                src={url}
                autoPlay={autoPlay}
                muted={playerState.muted}
                loop={loop}
                style={{ width, height }}
            />
        </div>
    );
};

VideoFile.propTypes = propTypes;
VideoFile.defaultProps = defaultProps;
VideoFile.testUrl = isFile;

Video.registerPlayer(VideoFile);

export default VideoFile;
