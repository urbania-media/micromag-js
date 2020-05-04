/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MediaControls from '@micromag/element-media-controls';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    audio: PropTypes.shape({
        src: PropTypes.string,
    }),
    track: PropTypes.string,
    language: PropTypes.number,
    controls: PropTypes.bool,
    params: MicromagPropTypes.audioParams,
    // TODO: style: MicromagPropTypes.textStyle,
    className: PropTypes.string,
};

const defaultProps = {
    audio: null,
    track: null,
    language: null,
    controls: null,
    params: null,
    // style: null,
    className: null,
};

const AudioComponent = ({ audio: audioField, track, language, controls, params, className }) => {
    const { url: src = null } = audioField || {};
    const { muted: initialMuted = false, autoPlay = false, loop = false, native = false } =
        params || {};

    const finalStyle = {};
    const refAudioElement = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [hasPlayed, setHasPlayed] = useState(false);
    const [playing, setPlaying] = useState(autoPlay || false);
    const [ended, setEnded] = useState(false);
    const [muted, setMuted] = useState(initialMuted || false);
    const [loaded, setLoaded] = useState(false);

    const playerState = { hasPlayed, playing, ended, muted, loaded };

    const onLoad = useCallback(() => {
        setDuration(refAudioElement.current ? refAudioElement.current.duration : 0);
        setCurrentTime(0);
    }, [setDuration, setCurrentTime]);

    const onReady = useCallback(() => {
        setLoaded(true);
    }, [setLoaded]);

    const onPlay = useCallback(() => {
        setPlaying(true);
        setHasPlayed(true);
    }, [setPlaying, setHasPlayed]);

    const onPause = useCallback(() => {
        setPlaying(false);
    }, [setPlaying]);

    const onEnd = useCallback(() => {
        setPlaying(false);
        setEnded(true);
    }, [setPlaying, setEnded]);

    const onMute = useCallback(() => {
        setMuted(true);
    }, [setMuted]);

    const onUnMute = useCallback(() => {
        setMuted(false);
    }, [setMuted]);

    const onTimeUpdate = useCallback(() => {
        setCurrentTime(refAudioElement.current ? refAudioElement.current.currentTime : 0);
    }, [setCurrentTime]);

    useEffect(() => {
        if (!native && refAudioElement.current === null && src) {
            const audioEl = new Audio(src);
            audioEl.addEventListener('loadedmetadata', onLoad);
            audioEl.addEventListener('durationchanged', onLoad);
            audioEl.addEventListener('canplay', onReady);
            audioEl.addEventListener('play', onPlay);
            audioEl.addEventListener('pause', onPause);
            audioEl.addEventListener('ended', onEnd);
            audioEl.addEventListener('timeupdate', onTimeUpdate);
            refAudioElement.current = audioEl;
        }
        return () => {
            if (refAudioElement.current !== null) {
                refAudioElement.current.pause();
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
