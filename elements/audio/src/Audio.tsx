/* eslint-disable react/require-default-props */

/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import type { AudioMedia } from '@micromag/core';
import {
    useMediaCurrentTime,
    useMediaDuration,
    useMediaLoad,
    useMediaReady, // useMediaWaveform,
    useProgressSteps,
} from '@micromag/core/hooks';

import AudioBars from './AudioBars';

import styles from './styles/audio.module.css';

interface AudioProps {
    media?: AudioMedia;
    mediaRef?: (...args: unknown[]) => void | { current?: unknown };
    muted?: boolean;
    autoPlay?: boolean;
    paused?: boolean;
    loop?: boolean;
    preload?: 'auto' | 'none' | 'metadata';
    shouldLoad?: boolean;
    waveFake?: boolean;
    withWave?: boolean;
    autoWaveHeight?: boolean;
    updateInterval?: number;
    withoutSeek?: boolean;
    className?: string;
    onReady?: (...args: unknown[]) => void;
    onPlay?: (...args: unknown[]) => void;
    onPause?: (...args: unknown[]) => void;
    onEnded?: (...args: unknown[]) => void;
    onSeeked?: (...args: unknown[]) => void;
    onTimeUpdate?: (...args: unknown[]) => void;
    onProgressStep?: (...args: unknown[]) => void;
    onDurationChange?: (...args: unknown[]) => void;
    onVolumeChange?: (...args: unknown[]) => void;
    onPlayError?: (...args: unknown[]) => void;
}

const Audio = ({
    media = null,
    mediaRef = null,
    muted = false,
    autoPlay = false,
    paused = false,
    loop = false,
    preload = 'auto',
    shouldLoad = true,
    waveFake = false,
    withWave = false,
    autoWaveHeight = false,
    updateInterval = 1000,
    className = null,
    withoutSeek = false,
    onReady = null,
    onPlay = null,
    onPause = null,
    onEnded = null,
    onSeeked = null,
    onTimeUpdate = null,
    onProgressStep = null,
    onDurationChange: customOnDurationChange = null,
    onVolumeChange: customOnVolumeChange = null,
    onPlayError = null,
}) => {
    const { url = null, files = null } = media || {};
    const srcUrl = useMemo(() => {
        if (files) {
            const filesAsEntries = Object.entries(files);
            const [, mp3File = null] = filesAsEntries.find(([key]) => key === 'mp3') || [];
            if (mp3File) {
                return mp3File.url;
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
                autoPlay={autoPlay && !paused}
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
                    seek={!withoutSeek ? onWaveSeek : null}
                    play={onWavePlay}
                />
            ) : null}
        </div>
    );
};

export default React.forwardRef((props, ref) => <Audio mediaRef={ref} {...props} />);
