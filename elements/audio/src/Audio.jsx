/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback, useMemo } from 'react';

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
    autoWaveHeight: PropTypes.bool,
    // reduceBufferFactor: PropTypes.number,
    updateInterval: PropTypes.number,
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
    onPlayError: PropTypes.func,
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
    autoWaveHeight: false,
    // reduceBufferFactor: 100,
    updateInterval: 1000,
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
    onPlayError: null,
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
    autoWaveHeight,
    // reduceBufferFactor,
    updateInterval,
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
    onPlayError,
}) => {
    const { url = null, files = null } = media || {};
    const srcUrl = useMemo(() => {
        if (files) {
            const filesAsEntries = Object.entries(files)
            const [, mp3File] = filesAsEntries.find(([key]) => key === 'mp3');
            if (mp3File) {
                return mp3File.url
            }
        }
        return url;
    }, [files, url]);

    const ref = useRef(null);

    const currentTime = useMediaCurrentTime(ref.current, {
        id: srcUrl,
        disabled: paused || (!withWave && onProgressStep === null),
        updateInterval,
    });

    const ready = useMediaReady(ref.current, {
        id: srcUrl,
    });

    const duration = useMediaDuration(ref.current, {
        id: srcUrl,
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
            element.play().catch((e) => {
                if (onPlayError !== null) {
                    onPlayError(e);
                }
            });
        }
    }, [paused, media, onPlayError]);

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
                key={srcUrl}
                ref={(newRef) => {
                    ref.current = newRef;
                    if (mediaRef !== null && isFunction(mediaRef)) {
                        mediaRef(newRef);
                    } else if (mediaRef !== null) {
                        mediaRef.current = newRef;
                    }
                }}
                src={srcUrl}
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
                    className={classNames([
                        styles.wave,
                        {
                            [styles.withAutoHeight]: autoWaveHeight,
                        },
                    ])}
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
