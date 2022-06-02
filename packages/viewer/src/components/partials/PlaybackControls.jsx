/* eslint-disable react/jsx-props-no-spreading */
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { usePlaybackContext } from '@micromag/core/contexts';
import { useMediaDuration, useMediaCurrentTime } from '@micromag/core/hooks';

import SeekBar from './SeekBar';

import styles from '../../styles/partials/playback-controls.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

function PlaybackControls({ className }) {
    const intl = useIntl();
    const {
        media: mediaElement = null,
        playing = false,
        muted = true,
        setPlaying,
        setMuted,
        controls,
        controlsVisible,
        controlsTheme,
    } = usePlaybackContext();
    const duration = useMediaDuration(mediaElement);
    const currentTime = useMediaCurrentTime(mediaElement, {
        disabled: !playing,
        updateInterval: 100
    });

    const onPlay = useCallback(() => {
        setPlaying(true);
    });

    const onPause = useCallback(() => {
        setPlaying(false);
    });

    const onMute = useCallback(() => {
        setMuted(true);
    });

    const onUnmute = useCallback(() => {
        setMuted(false);
    });

    const onSeek = useCallback((time) => {
        mediaElement.currentTime = time;
    });

    const { color, progressColor, seekBarOnly } = controlsTheme || {};

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.controlsVisible]: controlsVisible,
                [styles.hasControls]: mediaElement !== null && controls,
                [styles.seekBarOnly]: seekBarOnly
            }
        ])}>
            <button
                type="button"
                className={styles.playPauseButton}
                onClick={playing ? onPause : onPlay}
                title={intl.formatMessage({
                    defaultMessage: 'Play',
                    description: 'Button label',
                })}
                aria-label={intl.formatMessage({
                    defaultMessage: 'Play',
                    description: 'Button label',
                })}
                tabIndex={controlsVisible ? '0' : '-1'}
            >
                <FontAwesomeIcon className={styles.icon} icon={playing ? faPause : faPlay} />
            </button>

            <SeekBar
                className={styles.seekBar}
                duration={duration}
                currentTime={currentTime}
                playing={playing}
                onSeek={onSeek}
                focusable={playing}
                withSeekHead={controlsVisible && !seekBarOnly}
                backgroundColor={color}
                progressColor={progressColor}
            />

            <button
                type="button"
                className={classNames([
                    styles.muteButton,
                    {
                        [styles.isMuted]: muted
                    }
                ])}
                onClick={muted ? onUnmute : onMute}
                title={intl.formatMessage({
                    defaultMessage: 'Mute',
                    description: 'Button label',
                })}
                aria-label={intl.formatMessage({
                    defaultMessage: 'Mute',
                    description: 'Button label',
                })}
                tabIndex={controlsVisible ? '0' : '-1'}
            >
                <FontAwesomeIcon className={styles.icon} icon={faVolumeUp} />
            </button>
        </div>
    );
}

PlaybackControls.propTypes = propTypes;
PlaybackControls.defaultProps = defaultProps;

export default PlaybackControls;
