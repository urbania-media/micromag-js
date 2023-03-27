/* eslint-disable react/jsx-props-no-spreading */
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@micromag/core/components';
import { usePlaybackContext } from '@micromag/core/contexts';
import { useMediaReady } from '@micromag/core/hooks';
import { getColorAsString } from '@micromag/core/utils';

import SeekBar from './SeekBar';

import styles from '../../styles/partials/playback-controls.module.scss';

const propTypes = {
    defaultColor: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    defaultProgressColor: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    withLoading: PropTypes.bool,
    className: PropTypes.string,
    collapsedClassName: PropTypes.string,
};

const defaultProps = {
    defaultColor: {
        color: '#FFFFFF',
        alpha: 1,
    },
    defaultProgressColor: {
        color: '#666',
        alpha: 1,
    },
    withLoading: true,
    className: null,
    collapsedClassName: null,
};

function PlaybackControls({
    defaultColor,
    defaultProgressColor,
    withLoading,
    className,
    collapsedClassName,
}) {
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

    const [showLoading, setShowLoading] = useState(false);
    const mediaUrl = mediaElement !== null ? mediaElement.src : null;
    const mediaReady = useMediaReady(mediaElement, {
        id: mediaUrl,
    });
    const ready = mediaElement === null || mediaReady;
    const finalShowLoading = showLoading && !ready;

    useEffect(() => {
        let id = null;
        setShowLoading(false);
        if (!ready && withLoading) {
            id = setTimeout(() => {
                setShowLoading(true);
            }, 2000);
        }
        return () => {
            setShowLoading(false);
            clearTimeout(id);
        };
    }, [ready, withLoading, setShowLoading]);

    const [customControlsTheme, setCustomControlsTheme] = useState({
        color: getColorAsString(defaultColor),
        progressColor: getColorAsString(defaultColor),
        seekBarOnly: false,
    });

    const [wasPlaying, setWasPlaying] = useState(false);

    useEffect(() => {
        const { color, progressColor, seekBarOnly } = controlsTheme || {};
        setCustomControlsTheme({
            color: getColorAsString(color || defaultColor),
            progressColor: getColorAsString(progressColor || defaultProgressColor),
            seekBarOnly,
        });
    }, [controlsTheme, setCustomControlsTheme, defaultColor, defaultProgressColor]);

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

    const hasMedia = mediaElement !== null;
    const mediaHasAudio = hasMedia && (hasAudio === null || hasAudio === true);
    const { color, progressColor, seekBarOnly } = customControlsTheme || {};
    const isCollapsed = (controls && !controlsVisible && playing) || (!controls && mediaHasAudio);
    const icon = playing ? (
        <svg
            className={styles.icon}
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="6" height="18" rx="2" fill={color} />
            <rect x="8" width="6" height="18" rx="2" fill={color} />
        </svg>
    ) : (
        <svg
            width="20"
            height="23"
            viewBox="0 0 20 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
        >
            <path
                d="M16.25 12.5574L2.74999 20.3516C1.74999 20.9289 0.499993 20.2073 0.499993 19.0526L0.499994 3.4641C0.499994 2.3094 1.74999 1.58771 2.74999 2.16506L16.25 9.95929C17.25 10.5366 17.25 11.98 16.25 12.5574Z"
                fill={color}
                stroke={color}
            />
        </svg>
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.withPlayPause]: controls && !seekBarOnly,
                    [styles.withMute]: hasMedia || controls,
                    [styles.withSeekBar]: controls,
                    [styles.withSeekBarOnly]: seekBarOnly,
                    [styles.isCollapsed]: isCollapsed,
                    [styles.isMuted]: muted,
                    [collapsedClassName]: collapsedClassName !== null && isCollapsed,
                },
            ])}
        >
            <Button
                className={styles.playPauseButton}
                style={{
                    color,
                }}
                onClick={playing ? onPause : onPlay}
                focusable={controlsVisible}
                disabled={finalShowLoading}
                icon={
                    finalShowLoading ? (
                        <FontAwesomeIcon
                            className={styles.spinner}
                            icon={faCircleNotch}
                            spin
                            size="lg"
                        />
                    ) : (
                        icon
                    )
                }
                aria-label={
                    playing
                        ? intl.formatMessage({
                              defaultMessage: 'Pause',
                              description: 'Button label',
                          })
                        : intl.formatMessage({
                              defaultMessage: 'Play',
                              description: 'Button label',
                          })
                }
                withoutBootstrapStyles
            />

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

            <Button
                className={styles.muteButton}
                style={{
                    color,
                }}
                onClick={muted ? onUnmute : onMute}
                focusable={controlsVisible || mediaHasAudio}
                icon={
                    muted ? (
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.icon}
                        >
                            <path
                                d="M7.09929 8.77987H1C0.447715 8.77987 0 9.22758 0 9.77987V15.7799C0 16.3322 0.447715 16.7799 1 16.7799H7.1076C7.35984 16.7799 7.60276 16.8752 7.78768 17.0467L14.3199 23.1062C14.9599 23.6999 16 23.246 16 22.3731V3.00199C16 2.12221 14.9458 1.67117 14.3095 2.2787L7.78983 8.50316C7.6038 8.68077 7.35649 8.77987 7.09929 8.77987Z"
                                fill={color}
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20.8536 13.3946L23 15.5411L23.7071 14.834L21.5607 12.6875L23.7071 10.5411L23 9.83398L20.8536 11.9804L18.7071 9.83398L18 10.5411L20.1464 12.6875L18 14.834L18.7071 15.5411L20.8536 13.3946Z"
                                fill={color}
                            />
                        </svg>
                    ) : (
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.icon}
                        >
                            <path
                                d="M7.09929 8.77987H1C0.447715 8.77987 0 9.22758 0 9.77987V15.7799C0 16.3322 0.447715 16.7799 1 16.7799H7.1076C7.35984 16.7799 7.60276 16.8752 7.78768 17.0467L14.3199 23.1062C14.9599 23.6999 16 23.246 16 22.3731V3.00199C16 2.12221 14.9458 1.67117 14.3095 2.2787L7.78983 8.50316C7.6038 8.68077 7.35649 8.77987 7.09929 8.77987Z"
                                fill={color}
                            />
                            <path
                                d="M18 18.6875C21.3137 18.6875 24 16.0012 24 12.6875C24 9.37379 21.3137 6.6875 18 6.6875"
                                stroke={color}
                            />
                            <path
                                d="M18 15.6875C19.6569 15.6875 21 14.3444 21 12.6875C21 11.0306 19.6569 9.6875 18 9.6875"
                                stroke={color}
                            />
                        </svg>
                    )
                }
                aria-label={
                    muted
                        ? intl.formatMessage({
                              defaultMessage: 'Unmute',
                              description: 'Button label',
                          })
                        : intl.formatMessage({
                              defaultMessage: 'Mute',
                              description: 'Button label',
                          })
                }
                withoutBootstrapStyles
            />
        </div>
    );
}

PlaybackControls.propTypes = propTypes;
PlaybackControls.defaultProps = defaultProps;

export default PlaybackControls;
