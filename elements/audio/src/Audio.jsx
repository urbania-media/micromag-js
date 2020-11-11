/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useMediaApi } from '@micromag/core/hooks';
import ClosedCaptions from '@micromag/element-closed-captions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

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
    closedCaptions: MicromagPropTypes.closedCaptionsMedia,
    initialMuted: PropTypes.bool,
    initialVolume: PropTypes.number,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
};

const defaultProps = {
    media: null,
    apiRef: null,
    closedCaptions: null,
    initialMuted: false,
    initialVolume: 1,
    autoPlay: false,
    loop: false,
    className: null,
    onReady: null,
};

const Audio = ({
    media,
    apiRef,
    closedCaptions,
    initialMuted,
    initialVolume,
    autoPlay,
    loop,
    className,
    onReady,
}) => {
    const { url = null } = media || {};

    // use api

    const {
        ref,
        api,
        muted,
        currentTime,
        duration,
        playing,
        paused,
        ready: audioReady,
    } = useMediaApi({
        url,
        initialMuted,
        initialVolume,
    });    

    // expose api    

    if (apiRef !== null) {
        apiRef.current = api;
    }

    // Ready event
    
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

    // User events

    const onPlayPauseClick = useCallback(() => {
        api.playPause();
    }, [api]);

    const onMuteUnmuteClick = useCallback(() => {
        api.muteUnmute();
    }, [api]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.paused]: paused,
                    [styles.muted]: muted,
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
                onSeek={api.seek}
                onReady={onWaveReady}
            />
            { closedCaptions !== null ? <ClosedCaptions className={styles.closedCaptions} {...closedCaptions} currentTime={currentTime} /> : null }
            <div className={styles.controls}>
                <button type="button" className={styles.playPauseButton} onClick={onPlayPauseClick}>
                    <FontAwesomeIcon className={styles.icon} icon={playing ? faPause : faPlay} />
                </button>
                <button type="button" className={styles.muteButton} onClick={onMuteUnmuteClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faVolumeUp} />
                </button>
            </div>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio apiRef={ref} {...props} />);
