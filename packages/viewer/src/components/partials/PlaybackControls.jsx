/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@micromag/core/components';
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

    const hasMedia = mediaElement !== null;
    const mediaHasAudio = hasMedia && (hasAudio === null || hasAudio === true);
    const { color, progressColor, seekBarOnly } = customControlsTheme || {};
    const isCollapsed = (controls && !controlsVisible && playing) || (!controls && mediaHasAudio);

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
                icon={
                    playing ? (
                        <svg
                            className={styles.icon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="16"
                            viewBox="0 0 10 16"
                            fill="currentColor"
                        >
                            <rect x="1" y="3.27" width="3" height="9.69" />
                            <rect x="6" y="3.27" width="3" height="9.69" />
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
                            <path d="M1,3.16V12.84l8-4.84L1,3.16" />
                        </svg>
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
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="16"
                            viewBox="0 0 10 16"
                            className={styles.icon}
                            fill="currentColor"
                        >
                            <polygon points="2.75 4.63 1.24 6 0 6 0 10 1.24 10 4.54 13 4.54 3 2.75 4.63" />
                            <polygon points="10 6.63 8.94 5.57 7.58 6.93 6.21 5.57 5.15 6.63 6.52 7.99 5.15 9.35 6.21 10.43 7.58 9.06 8.94 10.43 10 9.35 8.64 7.99 10 6.63" />
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
                            <polygon points="2.75 4.63 1.24 6 0 6 0 10 1.24 10 4.54 13 4.54 3 2.75 4.63" />
                            <circle cx="6.14" cy="8" r=".99" />
                            <path d="M6.14,11.88v-1.5c1.31,0,2.38-1.07,2.38-2.38s-1.07-2.38-2.38-2.38v-1.5c2.14,0,3.88,1.74,3.88,3.88s-1.74,3.88-3.88,3.88Z" />
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
            />
        </div>
    );
}

PlaybackControls.propTypes = propTypes;
PlaybackControls.defaultProps = defaultProps;

export default PlaybackControls;
