/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MediaControls from '@micromag/component-media-controls';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    src: PropTypes.string,
    track: PropTypes.string,
    language: PropTypes.number,
    controls: PropTypes.bool,
    muted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    native: PropTypes.bool,
    // TODO: style: MicromagPropTypes.textStyle,
    className: PropTypes.string,
};

const defaultProps = {
    src: null,
    track: null,
    language: null,
    controls: null,
    muted: false,
    autoPlay: false,
    loop: false,
    native: false,
    // style: null,
    className: null,
};

const AudioComponent = ({
    src,
    track,
    language,
    controls,
    muted: initialMuted,
    autoPlay,
    loop,
    native,
    className,
}) => {
    const finalStyle = {};
    const refAudioElement = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [playerState, setPlayerState] = useState({
        hasPlayed: false,
        playing: autoPlay,
        paused: false,
        ended: false,
        muted: initialMuted,
        loaded: false,
    });

    const onLoad = useCallback(() => {
        setDuration(refAudioElement.current ? refAudioElement.current.duration : 0);
    }, [setDuration]);

    const onReady = useCallback(() => {
        setPlayerState({
            ...playerState,
            loaded: true,
        });
    }, [playerState, setPlayerState]);

    const onPlay = useCallback(() => {
        setPlayerState({
            ...playerState,
            playing: true,
            hasPlayed: true,
        });
    }, [playerState, setPlayerState]);

    const onPause = useCallback(() => {
        setPlayerState({
            ...playerState,
            playing: false,
        });
    }, [playerState, setPlayerState]);

    const onEnd = useCallback(() => {
        setPlayerState({
            ...playerState,
            playing: false,
            ended: true,
        });
    }, [playerState, setPlayerState]);

    const onMute = useCallback(() => {
        setPlayerState({
            ...playerState,
            muted: true,
        });
    }, [playerState, setPlayerState]);

    const onUnMute = useCallback(() => {
        setPlayerState({
            ...playerState,
            muted: false,
        });
    }, [playerState, setPlayerState]);

    const onTimeUpdate = useCallback(() => {
        setCurrentTime(refAudioElement.current ? refAudioElement.current.currentTime : 0);
    }, [setCurrentTime]);

    useEffect(() => {
        if (!native && refAudioElement.current === null) {
            const audio = new Audio(src);
            audio.addEventListener('loadedmetadata', onLoad);
            audio.addEventListener('durationchanged', onLoad);
            audio.addEventListener('canplay', onReady);
            audio.addEventListener('play', onPlay);
            audio.addEventListener('pause', onPause);
            audio.addEventListener('ended', onEnd);
            audio.addEventListener('timeupdate', onTimeUpdate);
            refAudioElement.current = audio;
        }
        return () => {
            if (refAudioElement.current !== null) {
                refAudioElement.current.removeEventListener('loadedmetadata', onLoad);
                refAudioElement.current.removeEventListener('durationchanged', onLoad);
                refAudioElement.current.removeEventListener('canplay', onReady);
                refAudioElement.current.removeEventListener('play', onPlay);
                refAudioElement.current.removeEventListener('pause', onPause);
                refAudioElement.current.removeEventListener('ended', onEnd);
                refAudioElement.current.removeEventListener('timeupdate', onTimeUpdate);
                refAudioElement.current = null;
            }
        };
    }, [src, native]);

    const playerApi = useMemo(
        () => ({
            play: () => {
                if (refAudioElement.current !== null) {
                    refAudioElement.current.play();
                }
            },
            pause: () =>
                refAudioElement.current !== null ? refAudioElement.current.pause() : null,
            stop: () => {
                if (refAudioElement.current !== null) {
                    refAudioElement.current.pause();
                    refAudioElement.current.currentTime = 0;
                }
            },
            seek: time => {
                if (refAudioElement.current !== null) {
                    refAudioElement.current.currentTime = time;
                    setCurrentTime(time);
                }
            },
            getDuration: () =>
                refAudioElement.current !== null ? refAudioElement.current.duration : 0,
            getCurrentTime: () =>
                refAudioElement.current !== null ? refAudioElement.current.currentTime : 0,
            mute: () => {
                if (refAudioElement.current !== null) {
                    refAudioElement.current.muted = true;
                    onMute();
                }
            },
            unMute: () => {
                if (refAudioElement.current !== null) {
                    refAudioElement.current.muted = false;
                    onUnMute();
                }
            },
        }),
        [onMute, onUnMute, setCurrentTime],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {native ? (
                <audio
                    className={styles.audio}
                    src={src}
                    controls
                    autoPlay={autoPlay}
                    muted={playerState.muted}
                    loop={loop}
                >
                    {track !== null ? (
                        <track default kind="captions" srcLang={language} src={track} />
                    ) : null}
                </audio>
            ) : (
                <MediaControls
                    {...controls}
                    {...playerApi}
                    {...playerState}
                    currentTime={currentTime}
                    duration={duration}
                />
            )}
        </div>
    );
};

AudioComponent.propTypes = propTypes;
AudioComponent.defaultProps = defaultProps;

export default AudioComponent;
