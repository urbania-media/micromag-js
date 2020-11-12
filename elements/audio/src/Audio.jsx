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
    className: PropTypes.string,
    onReady: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onDurationChanged: PropTypes.func,
    onPlayChanged: PropTypes.func,
    onMuteChanged: PropTypes.func,
};

const defaultProps = {
    media: null,
    apiRef: null,
    initialMuted: false,
    autoPlay: false,
    loop: false,
    className: null,
    onReady: null,
    onTimeUpdate: null,
    onDurationChanged: null,
    onPlayChanged: null,
    onMuteChanged: null,
};

const Audio = ({
    media,
    apiRef,
    initialMuted,
    autoPlay,
    loop,
    className,
    onReady,
    onTimeUpdate,
    onDurationChanged,
    onPlayChanged,
    onMuteChanged,
}) => {
    const { url = null } = media || {};
    const { ref, ...api } = useMediaApi({
        url,
        initialMuted,
    });

    if (apiRef !== null) {
        apiRef.current = api;
    }

    const {
        currentTime,
        duration,
        playing,
        seek,
        muted,
        ready: audioReady,
    } = api;

    useEffect( () => {
        if (onTimeUpdate !== null) {
            onTimeUpdate(currentTime);
        }
    }, [currentTime]);

    useEffect( () => {
        if (onDurationChanged !== null) {
            onDurationChanged(duration);
        }
    }, [duration]);

    useEffect( () => {
        if (onPlayChanged !== null) {
            onPlayChanged(playing);
        }
    }, [playing]);

    useEffect( () => {
        if (onMuteChanged !== null) {
            onMuteChanged(muted);
        }
    }, [muted]);

    const [waveReady, setWaveReady] = useState(false);
    const ready = audioReady && waveReady;

    const onWaveReady = useCallback(() => {
        setWaveReady(true);
    }, [setWaveReady]);

    useEffect(() => {
        setWaveReady(false);
    }, [url, setWaveReady]);

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
