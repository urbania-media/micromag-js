/* eslint-disable no-multi-assign */
/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, react/no-array-index-key */
import 'whatwg-fetch';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';

import styles from './styles/audio-wave.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    playing: PropTypes.bool,
    sampleWidth: PropTypes.number,
    sampleMargin: PropTypes.number,
    minSampleHeight: PropTypes.number,
    backgroundColor: PropTypes.string,
    progressColor: PropTypes.string,
    className: PropTypes.string,
    onSeek: PropTypes.func,
    onReady: PropTypes.func,
};

const defaultProps = {
    media: null,
    currentTime: null,
    duration: null,
    playing: false,
    sampleWidth: 3,
    sampleMargin: 1,
    minSampleHeight: 2,
    backgroundColor: 'white',
    progressColor: 'lightblue',
    className: null,
    onSeek: null,
    onReady: null,
};

const AudioWave = ({
    media,
    currentTime,
    duration,
    playing,
    sampleWidth,
    sampleMargin,
    minSampleHeight,
    backgroundColor,
    progressColor,
    className,
    onSeek,
    onReady,
}) => {
    const { url = null } = media || {};

    const canvasBackgroundRef = useRef(null);
    const canvasProgressRef = useRef(null);

    const {
        ref: elRef,
        entry: { contentRect: elContentRect },
    } = useResizeObserver();
    const { width: elWidth = null } = elContentRect || {};

    // Linear animation for progress bar

    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        config: {
            duration: 0,
        },
    }));

    useEffect(() => {
        if (currentTime === null || duration === null) {
            return;
        }
        const progress = currentTime / duration;
        setSpringProps.start({
            reset: true,
            immediate: !playing,
            from: {
                x: progress,
            },
            to: {
                x: playing ? 1 : progress,
            },
            config: {
                duration: (duration - currentTime) * 1000,
            },
        });
    }, [playing, duration, currentTime, setSpringProps]);

    // AudioWave buffer

    const [audioBuffer, setAudioBuffer] = useState(null);

    useEffect(() => {
        setAudioBuffer(null);
        let audioCtx = null;
        let canceled = false;

        if (url !== null && typeof window !== 'undefined') {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            fetch(url, {
                mode: 'cors',
            })
                .then((response) => {
                    if (canceled) {
                        throw new Error('Audio loading canceled');
                    }
                    return response.arrayBuffer();
                })
                .then((audioData) => {
                    if (canceled) {
                        throw new Error('Audio loading canceled');
                    }
                    audioCtx.decodeAudioData(audioData, (buffer) => {
                        setAudioBuffer(buffer);
                    });
                })
                .catch((e) => {
                    throw e;
                });
        }

        return () => {
            if (url === null) {
                audioCtx = null;
                canceled = true;
            }
        };
    }, [url, setAudioBuffer]);

    // draw canvas

    useEffect(() => {
        if (audioBuffer === null || elRef.current === null) {
            return;
        }

        const { offsetWidth: width = null, offsetHeight: height = null } = elRef.current;
        const sampleOuterWidth = sampleWidth + sampleMargin * 2;
        const samplesCount = Math.floor(width / sampleOuterWidth);

        const amplitudes = [];
        const channelsCount = audioBuffer.numberOfChannels;

        if (channelsCount === 0) {
            return;
        }

        // get samples

        const firstChannelData = audioBuffer.getChannelData(0);
        const sampleSize = Math.floor(firstChannelData.length / samplesCount);

        for (let sampleI = 0; sampleI < samplesCount; sampleI += 1) {
            const sampleStart = sampleSize * sampleI;
            let sum = 0;
            for (let sampleSizeI = 0; sampleSizeI < sampleSize; sampleSizeI += 1) {
                sum += Math.abs(firstChannelData[sampleStart + sampleSizeI]);
            }
            amplitudes.push(sum / sampleSize);
        }

        const normalizedAmplitudes = amplitudes.map((n) => n * Math.max(...amplitudes) ** -1);

        // draw samples
        const canvasBg = canvasBackgroundRef.current;
        const canvasProgress = canvasProgressRef.current;

        const scale = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

        canvasBg.width = canvasProgress.width = Math.floor(width * scale);
        canvasBg.height = canvasProgress.height = Math.floor(height * scale);

        const ctxBG = canvasBg.getContext('2d');
        const ctxProgress = canvasProgress.getContext('2d');

        ctxBG.scale(scale, scale);
        ctxProgress.scale(scale, scale);

        ctxBG.clearRect(0, 0, width, height);
        ctxProgress.clearRect(0, 0, width, height);

        ctxBG.fillStyle = backgroundColor;
        ctxProgress.fillStyle = progressColor;

        const offsetLeft = (width - samplesCount * sampleOuterWidth) / 2;

        normalizedAmplitudes.forEach((amplitude, amplitudeI) => {
            const sampleHeight = Math.max(minSampleHeight, amplitude * height);
            const sampleX = sampleOuterWidth * amplitudeI + offsetLeft + sampleMargin;
            const sampleY = height / 2 - sampleHeight / 2;

            ctxBG.fillRect(
                Math.round(sampleX),
                Math.round(sampleY),
                sampleWidth,
                Math.round(sampleHeight),
            );
            ctxProgress.fillRect(
                Math.round(sampleX),
                Math.round(sampleY),
                sampleWidth,
                Math.round(sampleHeight),
            );
        });

        if (onReady !== null) {
            onReady();
        }
    }, [
        audioBuffer,
        sampleWidth,
        sampleMargin,
        minSampleHeight,
        elWidth,
        backgroundColor,
        progressColor,
        onReady,
    ]);

    // User events

    const onSeekClick = useCallback(
        (e) => {
            if (onSeek !== null && duration !== null) {
                const currentTargetRect = e.currentTarget.getBoundingClientRect();
                const seekProgress = (e.pageX - currentTargetRect.left) / currentTargetRect.width;
                onSeek(seekProgress * duration);
            }
        },
        [duration],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            ref={elRef}
        >
            <canvas ref={canvasBackgroundRef} className={styles.canvasBackground} />
            <animated.canvas
                ref={canvasProgressRef}
                className={styles.canvasProgress}
                style={{
                    clipPath: springProps.x.to((x) => `polygon(0 0, ${x * 100}% 0, ${x * 100}% 100%, 0 100%)`),
                }}
            />
            <button
                type="button"
                className={styles.button}
                onClick={onSeekClick}
                aria-label="Seek"
            />
        </div>
    );
};

AudioWave.propTypes = propTypes;
AudioWave.defaultProps = defaultProps;

export default AudioWave;
