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
    playsInline: PropTypes.bool,
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
    playsInline: true,
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
    playsInline,
    refPlayer: refPlayerExternal,
    className,
    onReady,
    onStateChange,
    onCurrentTimeChange,
}) => {
    const refVideo = useRef(null);
    const refPlayerInternal = useRef(null);
    const videoSize = { width, height };

    const [hasPlayed, setHasPlayed] = useState(false);
    const [playing, setPlaying] = useState(autoPlay || false);
    const [paused, setPaused] = useState(false);
    const [ended, setEnded] = useState(false);
    const [muted, setMuted] = useState(initialMuted || false);
    const [loaded, setLoaded] = useState(false);

    const playerState = { hasPlayed, playing, paused, ended, muted, loaded };

    const [ready, setReady] = useState(false);

    const updatePlayerState = useCallback(
        newPlayerState => {
            if (typeof newPlayerState.hasPlayed === 'boolean') {
                setHasPlayed(newPlayerState.hasPlayed);
            }
            if (typeof newPlayerState.playing === 'boolean') {
                setPlaying(newPlayerState.playing);
            }
            if (typeof newPlayerState.paused === 'boolean') {
                setPaused(newPlayerState.paused);
            }
            if (typeof newPlayerState.ended === 'boolean') {
                setEnded(newPlayerState.ended);
            }
            if (typeof newPlayerState.muted === 'boolean') {
                setMuted(newPlayerState.muted);
            }
            if (typeof newPlayerState.loaded === 'boolean') {
                setLoaded(newPlayerState.loaded);
            }
        },
        [onStateChange],
    );

    useEffect(() => {
        if (onStateChange !== null) {
            onStateChange(playerState);
        }
    }, [JSON.stringify(playerState)]);

    // Onload
    const onLoad = useCallback(() => {
        setReady(true);
    }, [setReady]);

    useEffect(() => {
        refVideo.current.addEventListener('loadedmetadata', onLoad);
        return () => {
            refVideo.current.removeEventListener('loadedmetadata', onLoad);
        };
    }, [setReady]);

    // Trigger onReady
    useEffect(() => {
        if (ready && videoSize !== null && onReady !== null) {
            onReady();
        }
    }, [ready]);

    // Update time
    const onTimeUpdate = useCallback(() => {
        onCurrentTimeChange(refVideo.current ? refVideo.current.currentTime : 0);
    }, [onCurrentTimeChange]);

    useEffect(() => {
        if (refVideo.current) {
            refVideo.current.addEventListener('timeupdate', onTimeUpdate);
        }
        return () => {
            if (refVideo.current) {
                refVideo.current.removeEventListener('timeupdate', onTimeUpdate);
            }
        };
    }, [ready, refVideo, onTimeUpdate]);

    // Player API
    const playerApi = useMemo(
        () => ({
            play: () => {
                if (refVideo.current !== null) {
                    refVideo.current.play();
                }
                updatePlayerState({
                    ...playerState,
                    hasPlayed: true,
                    playing: true,
                });
            },
            pause: () => {
                if (refVideo.current !== null) {
                    refVideo.current.pause();
                }
                updatePlayerState({
                    ...playerState,
                    playing: false,
                });
            },
            stop: () => {
                if (refVideo.current !== null) {
                    refVideo.current.pause();
                    refVideo.current.currentTime = 0;
                }
                updatePlayerState({
                    ...playerState,
                    playing: false,
                });
            },
            seek: time => {
                if (refVideo.current !== null) {
                    refVideo.current.currentTime = time;
                }
            },
            getDuration: () => (refVideo.current !== null ? refVideo.current.duration : 0),
            getCurrentTime: () => (refVideo.current !== null ? refVideo.current.currentTime : 0),
            getSize: () => videoSize,
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
    } else {
        refPlayerInternal.current = playerApi;
    }

    const onClickPlayPause = useCallback(() => {
        if (playerState.playing) {
            playerApi.pause();
        } else {
            playerApi.play();
        }
    }, [playerApi, playerState]);

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
                playsInline={playsInline}
                muted={loop || playerState.muted}
                autoPlay={autoPlay}
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
