/* eslint-disable no-multi-assign */
/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, react/no-array-index-key */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';
import { PropTypes as MicromagPropTypes, useScreenSizeFromWindow } from '@micromag/core';

import styles from './styles/audiowave.module.scss';

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
    currentTime: 0,
    duration: 0,
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

    const elRef = useRef(null);
    const canvasBackgroundRef = useRef(null);
    const canvasProgressRef = useRef(null);

    // @TODO need a better hook for window resize
    // ATM the returned value changes every render and height is always null
    const { width: windowWidth } = useScreenSizeFromWindow();

    // Linear animation for progress bar

    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        config: {
            duration: 0,
        },
    }));

    useEffect(() => {
        const progress = currentTime / duration;
        setSpringProps({
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
    }, [playing, duration, currentTime]);

    // AudioWave buffer

    const [audioBuffer, setAudioBuffer] = useState(null);

    useEffect(() => {
        setAudioBuffer(null);

        if (url === null) {
            return;
        }

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

        canvasBg.width = canvasProgress.width = width;
        canvasBg.height = canvasProgress.height = height;

        const ctxBG = canvasBg.getContext('2d');
        const ctxProgress = canvasProgress.getContext('2d');

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
        windowWidth,
        backgroundColor,
        progressColor,
        onReady,
    ]);

    // User events

    const onSeekClick = useCallback(
        (e) => {
            if (onSeek !== null) {
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
            <animated.div
                className={styles.progressContainer}
                style={{
                    transform: springProps.x.interpolate((x) => `scaleX(${x}`),
                }}
            >
                <animated.canvas
                    ref={canvasProgressRef}
                    className={styles.canvasProgress}
                    style={{
                        transform: springProps.x.interpolate((x) => `scaleX(${1 / x}`),
                    }}
                />
            </animated.div>
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
