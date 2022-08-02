/* eslint-disable react/jsx-props-no-spreading */
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { usePlaybackContext } from '@micromag/core/contexts';
import { getColorAsString } from '@micromag/core/utils';

import SeekBar from './SeekBar';

import styles from '../../styles/partials/playback-controls.module.scss';

const propTypes = {
    className: PropTypes.string,
    collapsedClassName: PropTypes.string,
};

const defaultProps = {
    className: null,
    collapsedClassName: null,
};

function PlaybackControls({ className, collapsedClassName }) {
    const intl = useIntl();
    const {
        media: mediaElement = null,
        hasAudio = null,
        playing = false,
        muted = true,
        setPlaying,
        setMuted,
        controls,
        controlsVisible,
        controlsTheme,
        showControls,
    } = usePlaybackContext();
    const [customControlsTheme, setCustomControlsTheme] = useState(null);
    const [wasPlaying, setWasPlaying] = useState(false);

    useEffect(() => {
        const { color, progressColor, seekBarOnly } = controlsTheme || {};
        setCustomControlsTheme({
            color: getColorAsString(color),
            progressColor: getColorAsString(progressColor),
            seekBarOnly,
        });
    }, [controlsTheme, setCustomControlsTheme]);

    const onPlay = useCallback(() => {
        setPlaying(true);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setPlaying, controlsVisible, showControls]);

    const onPause = useCallback(() => {
        setPlaying(false);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setPlaying, controlsVisible, controls, showControls]);

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

    const onSeekStart = useCallback(() => {
        setWasPlaying(playing);
        if (playing) {
            setPlaying(false);
        }
    }, [playing, setWasPlaying, setPlaying]);

    const onSeek = useCallback(
        (progress) => {
            if (mediaElement !== null) {
                mediaElement.currentTime = progress * mediaElement.duration;
            }
            if (!controlsVisible && controls) {
                showControls();
            }
        },
        [mediaElement, controlsVisible, controls, showControls],
    );

    const onSeekEnd = useCallback(() => {
        if (wasPlaying) {
            setPlaying(true);
        }
    }, [setPlaying, wasPlaying]);

    const mediaHasAudio = mediaElement !== null && (hasAudio === null || hasAudio === true);
    const { color, progressColor, seekBarOnly } = customControlsTheme || {};
    const isCollapsed = (controls && !controlsVisible && playing) || (!controls && mediaHasAudio);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.withPlayPause]: controls && !seekBarOnly,
                    [styles.withMute]: mediaHasAudio || controls,
                    [styles.withSeekBar]: controls,
                    [styles.withSeekBarOnly]: seekBarOnly,
                    [styles.isCollapsed]: isCollapsed,
                    [collapsedClassName]: collapsedClassName !== null && isCollapsed,
                },
            ])}
        >
            <button
                type="button"
                className={styles.playPauseButton}
                style={{
                    color,
                }}
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
                {playing ? (
                    <svg
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        viewBox="0 0 10 16"
                        fill="currentColor"
                    >
                        <rect x="2.24" y="4.33" width="2" height="7.34" />
                        <rect x="5.71" y="4.33" width="2" height="7.34" />
                    </svg>
                ) : (
                    <svg
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        viewBox="0 0 10 16"
                        fill="currentColor"
                    >
                        <polyline points="2.67 3.92 7.33 8 2.67 12.08" />
                    </svg>
                )}
            </button>

            <SeekBar
                className={styles.seekBar}
                media={mediaElement}
                playing={playing}
                onSeek={onSeek}
                onSeekStart={onSeekStart}
                onSeekEnd={onSeekEnd}
                focusable={playing}
                withSeekHead={!isCollapsed && !seekBarOnly}
                backgroundColor={color}
                progressColor={progressColor}
            />

            <button
                type="button"
                className={styles.muteButton}
                style={{
                    color,
                }}
                onClick={muted ? onUnmute : onMute}
                title={intl.formatMessage({
                    defaultMessage: 'Mute',
                    description: 'Button label',
                })}
                aria-label={intl.formatMessage({
                    defaultMessage: 'Mute',
                    description: 'Button label',
                })}
                tabIndex={controlsVisible || mediaHasAudio ? '0' : '-1'}
            >
                {muted ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        viewBox="0 0 10 16"
                        className={styles.icon}
                        fill="currentColor"
                    >
                        <rect y="6" width="2" height="4" />
                        <polygon points="5 13 2 10 2 6 3.37 4.63 5 3 5 13" />
                        <path d="M5.63,9.5l1,1.22a4.69,4.69,0,0,0,0-5.44l-1,1.22a3.15,3.15,0,0,1,0,3Z" />
                        <path d="M7.46,11l1,1.19a6.58,6.58,0,0,0,0-8.34L7.46,5a5,5,0,0,1,0,6Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        viewBox="0 0 10 16"
                        className={styles.icon}
                        fill="currentColor"
                    >
                        <polygon points="3.37 4.63 2 6 0 6 0 10 2 10 5 13 5 3 3.37 4.63" />
                        <polygon points="9.97 6.64 8.91 5.58 7.55 6.94 6.18 5.58 5.12 6.64 6.49 8 5.12 9.36 6.18 10.43 7.55 9.06 8.91 10.43 9.97 9.36 8.61 8 9.97 6.64" />
                    </svg>
                )}
            </button>
        </div>
    );
}

PlaybackControls.propTypes = propTypes;
PlaybackControls.defaultProps = defaultProps;

export default PlaybackControls;
