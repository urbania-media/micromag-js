/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, react/no-array-index-key */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes, useScreenSizeFromWindow } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    // track: PropTypes.string,
    sampleWidth: PropTypes.number,
    initialMuted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    apiRef: null,
    // track: null,
    sampleWidth: 5,
    initialMuted: false,
    autoPlay: false,
    loop: false,
    className: null,
};

const Audio = ({
    media: audioField,
    apiRef,
    // track,
    sampleWidth,
    initialMuted,
    autoPlay,
    loop,
    className,
}) => {
    const { url = null } = audioField || {};

    const finalStyle = {};
    const audioRef = useRef(null);

    const [muted, setMuted] = useState(initialMuted);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(null);
    const progress = duration !== null ? currentTime / duration : 0;

    // create and expose api

    const playerApi = useMemo(
        () => ({
            play: () => {
                if (audioRef.current !== null) {
                    audioRef.current.play();
                }
            },
            pause: () => {
                if (audioRef.current !== null) {
                    audioRef.current.pause();
                }
            },
            stop: () => {
                if (audioRef.current !== null) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            },
            seek: (time) => {
                if (audioRef.current !== null) {
                    audioRef.current.currentTime = time;
                }
            },
            mute: () => {
                if (audioRef.current !== null) {
                    audioRef.current.muted = true;
                }
            },
            unMute: () => {
                if (audioRef.current !== null) {
                    audioRef.current.muted = false;
                }
            },
            duration,
            currentTime,
            muted,
        }),
        [muted, currentTime, duration],
    );

    if (apiRef !== null) {
        apiRef.current = playerApi;
    }

    // set states on event updates

    useEffect(() => {
        const audio = audioRef.current;

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const onDurationChange = () => {
            setDuration(audio.duration);
        };

        const onVolumeChange = () => {
            setMuted(audio.volume === 0);
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('durationchange', onDurationChange);
        audio.addEventListener('volumechange', onVolumeChange);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('durationchange', onDurationChange);
            audio.removeEventListener('volumechange', onVolumeChange);
        };
    }, [setCurrentTime, setDuration, setMuted]);

    // get audio buffer

    const [audioBuffer, setAudioBuffer] = useState(null);

    useEffect(() => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            const audioData = request.response;
            audioCtx.decodeAudioData(audioData, (buffer) => {
                setAudioBuffer(buffer);
            });
        };
        request.send();
    }, [url]);

    // get amplitude levels

    const seekbarRef = useRef(null);
    const [levels, setLevels] = useState(null);

    const { width: windowWidth } = useScreenSizeFromWindow();

    useEffect(() => {
        if (audioBuffer === null) {
            return;
        }

        const seekbarWidth = seekbarRef.current.offsetWidth;
        const samplesCount = Math.floor(seekbarWidth / sampleWidth);

        const amplitudes = [];
        const channelsCount = audioBuffer.numberOfChannels;
        if (channelsCount === 0) {
            return;
        }
        const firstChannelData = audioBuffer.getChannelData(0);
        const sampleSize = Math.floor(firstChannelData.length / samplesCount);

        for (let sampleI = 0; sampleI < samplesCount; sampleI += 1) {
            const sampleStart = sampleSize * sampleI;
            let sum = 0;
            for (let sampleSizeI = 0; sampleSizeI < sampleSize; sampleSizeI += 1) {
                sum += Math.abs(firstChannelData[sampleStart + sampleSizeI]);
            }
            amplitudes.push(Math.max(0.004, sum / sampleSize));
        }

        const normalizedAmplitudes = amplitudes.map((n) => n * Math.max(...amplitudes) ** -1);
        setLevels(normalizedAmplitudes);
    }, [audioBuffer, sampleWidth, setLevels, windowWidth]);

    // Create levels in the DOM

    const createLevels = () =>
        levels !== null
            ? levels.map((level, levelI) => (
                <div
                    key={`level-${levelI}`}
                    className={styles.level}
                    style={{
                        height: `${level * 100}%`,
                        width: sampleWidth,
                    }}
                >
                    <div className={styles.levelInner} />
                </div>
              ))
            : null;

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
            <audio ref={audioRef} src={url} autoPlay={autoPlay} loop={loop} />
            <div className={styles.seekbar} ref={seekbarRef}>
                <div className={styles.background}>{createLevels()}</div>
                <div className={styles.foreground} style={{ width: `${progress * 100}%` }}>
                    {createLevels()}
                </div>
            </div>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio apiRef={ref} {...props} />);
