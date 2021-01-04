/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useMediaApi } from '@micromag/core/hooks';

import AudioWave from './AudioWave';

import styles from './styles/audio.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    initialMuted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    waveProps: PropTypes.shape({
        sampleWidth: PropTypes.number,
        sampleMargin: PropTypes.number,
        minSampleHeight: PropTypes.number,
    }),
    className: PropTypes.string,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onProgressStep: PropTypes.func,
    onDurationChanged: PropTypes.func,
    onVolumeChanged: PropTypes.func,
};



const defaultProps = {
    media: null,
    apiRef: null,
    initialMuted: false,
    autoPlay: false,
    loop: false,
    waveProps: null,
    className: null,
    onReady: null,
    onPlay: null,
    onPause: null,
    onEnded: null,
    onSeeked: null,
    onTimeUpdate: null,
    onProgressStep: null,
    onDurationChanged: null,
    onVolumeChanged: null,
};

const Audio = ({
    media,
    apiRef,
    initialMuted,
    autoPlay,
    loop,
    waveProps,
    className,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChanged,
    onVolumeChanged,
}) => {
    const { url = null } = media || {};
    const { ref, ...api } = useMediaApi({
        url,
        initialMuted,
        onPlay,
        onPause,
        onEnded,
        onSeeked,
        onTimeUpdate,
        onProgressStep,
        onDurationChanged,
        onVolumeChanged,
    });

    if (apiRef !== null) {
        apiRef.current = api;
        apiRef.current.mediaRef = ref;
    }

    const { currentTime, duration, playing, seek, ready: audioReady } = api;

    const [waveReady, setWaveReady] = useState(false);
    const ready = audioReady && waveReady;

    const onWaveReady = useCallback(() => {
        setWaveReady(true);
    }, []);

    useEffect(() => {
        setWaveReady(false);
    }, [url]);

    useEffect(() => {
        if (ready && onReady !== null) {
            onReady();
        }
    }, [ready, onReady]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <audio ref={ref} src={url} autoPlay={autoPlay} loop={loop} />
            <AudioWave
                className={styles.wave}
                media={media}
                currentTime={currentTime}
                {...waveProps}
                duration={duration}
                playing={playing}
                onSeek={seek}
                onReady={onWaveReady}
            />
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio apiRef={ref} {...props} />);
