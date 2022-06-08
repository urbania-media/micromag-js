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
        showControls,
    } = usePlaybackContext();
    const duration = useMediaDuration(mediaElement);
    const currentTime = useMediaCurrentTime(mediaElement, {
        disabled: !playing,
        updateInterval: 100
    });

    const onPlay = useCallback(() => {
        setPlaying(true);
        if (!controlsVisible) {
            showControls();
        }
    }, [setPlaying, controlsVisible, showControls]);

    const onPause = useCallback(() => {
        setPlaying(false);
        if (!controlsVisible) {
            showControls();
        }
    }, [setPlaying, controlsVisible, showControls]);

    const onMute = useCallback(() => {
        setMuted(true);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setMuted, controlsVisible, showControls]);

    const onUnmute = useCallback(() => {
        setMuted(false);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setMuted, controlsVisible, showControls]);

    const onSeek = useCallback((time) => {
        mediaElement.currentTime = time;
    }, [mediaElement]);

    const { color, progressColor, seekBarOnly } = controlsTheme || {};

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.withPlayPause]: controls && !seekBarOnly,
                [styles.withMute]: mediaElement !== null || controls,
                [styles.withSeekBar]: controls,
                [styles.isCollapsed]: (controls && !controlsVisible && playing) || (!controls && mediaElement !== null),
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
                media={mediaElement}
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
