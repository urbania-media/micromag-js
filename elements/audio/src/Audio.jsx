/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    useMediaCurrentTime,
    useMediaReady,
    useMediaDuration,
    useMediaLoad, // useMediaWaveform,
    useProgressSteps,
} from '@micromag/core/hooks';

import AudioBars from './AudioBars';

import styles from './styles/audio.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    muted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    paused: PropTypes.bool,
    loop: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
    shouldLoad: PropTypes.bool,
    waveFake: PropTypes.bool,
    // waveProps: PropTypes.shape({
    //     sampleWidth: PropTypes.number,
    //     sampleMargin: PropTypes.number,
    //     minSampleHeight: PropTypes.number,
    // }),
    withWave: PropTypes.bool,
    // reduceBufferFactor: PropTypes.number,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onProgressStep: PropTypes.func,
    onDurationChange: PropTypes.func,
    onVolumeChange: PropTypes.func,
};

const defaultProps = {
    media: null,
    mediaRef: null,
    muted: false,
    autoPlay: false,
    paused: false,
    loop: false,
    preload: 'auto',
    shouldLoad: true,
    waveFake: false,
    // waveProps: null,
    withWave: false,
    // reduceBufferFactor: 100,
    className: null,
    onReady: null,
    onPlay: null,
    onPause: null,
    onEnded: null,
    onSeeked: null,
    onTimeUpdate: null,
    onProgressStep: null,
    onDurationChange: null,
    onVolumeChange: null,
};

const Audio = ({
    media,
    mediaRef,
    muted,
    autoPlay,
    paused,
    loop,
    preload,
    shouldLoad,
    waveFake,
    // waveProps,
    withWave,
    // reduceBufferFactor,
    className,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChange: customOnDurationChange,
    onVolumeChange: customOnVolumeChange,
}) => {
    const { url = null } = media || {};

    const ref = useRef(null);

    const currentTime = useMediaCurrentTime(ref.current, {
        id: url,
        disabled: paused || (!withWave && onProgressStep === null),
    });

    const ready = useMediaReady(ref.current, {
        id: url,
    });

    const duration = useMediaDuration(ref.current, {
        id: url,
    });

    // const audioLevels = useMediaWaveform(media, {
    //     fake: waveFake,
    //     reduceBufferFactor,
    // });

    useMediaLoad(ref.current, {
        preload,
        shouldLoad,
    });

    const waveReady = waveFake || ready;

    useEffect(() => {
        if (duration > 0 && customOnDurationChange !== null) {
            customOnDurationChange(duration);
        }
    }, [duration, customOnDurationChange]);

    const onVolumeChange = useCallback(() => {
        const { current: element = null } = ref;
        if (element === null) {
            return;
        }
        if (customOnVolumeChange !== null) {
            customOnVolumeChange(element.volume);
        }
    }, [ref.current, customOnVolumeChange]);

    const onWavePlay = useCallback(() => {
        const { current: element = null } = ref;
        if (element === null) {
            return;
        }
        element.play();
    }, [ref.current]);

    const onWaveSeek = useCallback(
        (newTime) => {
            const { current: element = null } = ref;
            if (element === null) {
                return;
            }
            if (isNumber(newTime)) {
                element.currentTime = newTime;
            }
        },
        [ref.current],
    );

    useEffect(() => {
        if (waveReady && onReady !== null) {
            onReady();
        }
    }, [waveReady, onReady]);

    useEffect(() => {
        const { current: element = null } = ref;
        if (element === null) {
            return;
        }
        const { paused: isPaused } = element;
        if (paused && !isPaused) {
            element.pause();
        } else if (!paused && isPaused) {
            element.play();
        }
    }, [paused, media]);

    useProgressSteps({
        currentTime,
        duration,
        disabled: paused,
        onStep: onProgressStep,
    });

    const progress = currentTime !== null && duration > 0 ? currentTime / duration : 0;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <audio
                key={url}
                ref={(newRef) => {
                    ref.current = newRef;
                    if (mediaRef !== null && isFunction(mediaRef)) {
                        mediaRef(newRef);
                    } else if (mediaRef !== null) {
                        mediaRef.current = newRef;
                    }
                }}
                src={url}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                crossOrigin="anonymous"
                preload={preload}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={onEnded}
                onSeeked={onSeeked}
                onTimeUpdate={onTimeUpdate}
                onVolumeChange={onVolumeChange}
            />
            {withWave ? (
                <AudioBars
                    className={styles.wave}
                    progress={progress}
                    // {...waveProps}
                    duration={duration}
                    playing={!paused}
                    seek={onWaveSeek}
                    play={onWavePlay}
                />
            ) : null}
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio mediaRef={ref} {...props} />);
