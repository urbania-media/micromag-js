/* eslint-disable no-multi-assign */
/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, react/no-array-index-key */
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import 'whatwg-fetch';
import styles from './styles/audio-wave.module.scss';

const propTypes = {
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    playing: PropTypes.bool,
    sampleWidth: PropTypes.number,
    sampleMargin: PropTypes.number,
    minSampleHeight: PropTypes.number,
    backgroundColor: PropTypes.string,
    progressColor: PropTypes.string,
    audioLevels: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    onSeek: PropTypes.func,
    onResume: PropTypes.func,
    onReady: PropTypes.func,
};

const defaultProps = {
    currentTime: null,
    duration: null,
    playing: false,
    sampleWidth: 3,
    sampleMargin: 1,
    minSampleHeight: 2,
    backgroundColor: 'white',
    progressColor: 'lightblue',
    audioLevels: null,
    className: null,
    onSeek: null,
    onResume: null,
    onReady: null,
};

function AudioWave({
    currentTime,
    duration,
    playing,
    sampleWidth,
    sampleMargin,
    minSampleHeight,
    backgroundColor,
    progressColor,
    audioLevels,
    className,
    onSeek,
    onResume,
    onReady,
}) {
    const canvasBackgroundRef = useRef(null);
    const canvasProgressRef = useRef(null);

    const {
        ref: elRef,
        entry: { contentRect: elContentRect },
    } = useResizeObserver();
    const { width: elWidth = null, height: elHeight } = elContentRect || {};

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

    // draw canvas

    useEffect(() => {
        if (audioLevels === null || audioLevels.length === 0 || elRef.current === null) {
            return;
        }

        const sampleOuterWidth = sampleWidth + sampleMargin * 2;
        const samplesCount = Math.floor(elWidth / sampleOuterWidth);

        // const amplitudes = [];

        // get samples

        const levelsBySamples = audioLevels.length / samplesCount;

        const amplitudes = [...Array(samplesCount).keys()].reduce((newAmplitudes, index) => {
            const levelStartIndex = index * levelsBySamples;
            const levelEndIndex = levelStartIndex + levelsBySamples;
            const newValues = [];
            for (let i = Math.floor(levelStartIndex); i < Math.round(levelEndIndex); i += 1) {
                newValues.push(audioLevels[i]);
            }
            return levelsBySamples >= 1
                ? [
                      ...newAmplitudes,
                      newValues.reduce((total, value) => total + value, 0) / newValues.length,
                  ]
                : [...newAmplitudes, ...newValues];
        }, []);

        // for (let sampleI = 0; sampleI < samplesCount; sampleI += levelsBySamples) {
        //     // if (levelsBySamples >= 1) {
        //     //     const sampleSize = Math.floor(levelsBySamples);
        //     //     const sampleStart = sampleSize * sampleI;
        //     //     let sum = 0;
        //     //     for (let sampleSizeI = 0; sampleSizeI < sampleSize; sampleSizeI += 1) {
        //     //         sum += Math.abs(audioLevels[sampleStart + sampleSizeI]);
        //     //     }
        //     //     amplitudes.push(sum / sampleSize);
        //     // } else {
        //         console.log(sampleI);
        //         amplitudes.push(Math.abs(audioLevels[Math.floor(sampleI)]));
        //         // for (let sampleSizeI = 0; sampleSizeI < sampleSize; sampleSizeI += 1) {
        //         //     console.log(sampleI, sampleSize);
        //         //     amplitudes.push(Math.abs(audioLevels[sampleI % sampleSize]));
        //         // }
        //     // }
        // }
        const minAmplitude = Math.min(...amplitudes);
        const maxAmplitude = Math.max(...amplitudes);
        const delta = maxAmplitude - minAmplitude;
        const normalizedAmplitudes = amplitudes.map((n) => (n - minAmplitude) / delta);

        // draw samples
        const canvasBg = canvasBackgroundRef.current;
        const canvasProgress = canvasProgressRef.current;

        const scale = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

        canvasBg.width = canvasProgress.width = Math.floor(elWidth * scale);
        canvasBg.height = canvasProgress.height = Math.floor(elHeight * scale);

        const ctxBG = canvasBg.getContext('2d');
        const ctxProgress = canvasProgress.getContext('2d');

        ctxBG.scale(scale, scale);
        ctxProgress.scale(scale, scale);

        ctxBG.clearRect(0, 0, elWidth, elHeight);
        ctxProgress.clearRect(0, 0, elWidth, elHeight);

        ctxBG.fillStyle = backgroundColor;
        ctxProgress.fillStyle = progressColor;

        const offsetLeft = (elWidth - samplesCount * sampleOuterWidth) / 2;

        normalizedAmplitudes.forEach((amplitude, amplitudeI) => {
            const sampleHeight = Math.max(minSampleHeight, amplitude * elHeight);
            const sampleX = sampleOuterWidth * amplitudeI + offsetLeft + sampleMargin;
            const sampleY = elHeight / 2 - sampleHeight / 2;

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
        audioLevels,
        sampleWidth,
        sampleMargin,
        minSampleHeight,
        elWidth,
        elHeight,
        backgroundColor,
        progressColor,
        onReady,
    ]);

    // User events
    const seekFromX = useCallback(
        (x) => {
            const elX = elRef.current.getBoundingClientRect().left;
            const progress = Math.max(0, Math.min(1, (x - elX) / elWidth));
            if (onSeek !== null && duration !== null) {
                onSeek(progress * duration);
            }

            if (!playing) {
                onResume();
            }
        },
        [duration, playing, onSeek, onResume],
    );
    const bind = useGesture(
        {
            onDrag: ({ xy: [x], elapsedTime, active }) => {
                if (!active && elapsedTime > 300) {
                    return;
                }
                seekFromX(x);
            },
        },
        { drag: { axis: 'x', filterTaps: true } },
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
            {...bind()}
        >
            <canvas ref={canvasBackgroundRef} className={styles.canvasBackground} />
            <animated.canvas
                ref={canvasProgressRef}
                className={styles.canvasProgress}
                style={{
                    clipPath: springProps.x.to(
                        (x) => `polygon(0 0, ${x * 100}% 0, ${x * 100}% 100%, 0 100%)`,
                    ),
                }}
            />
        </div>
    );
}

AudioWave.propTypes = propTypes;
AudioWave.defaultProps = defaultProps;

export default AudioWave;
