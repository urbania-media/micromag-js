/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption */
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    playing: PropTypes.bool,
    paused: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    ended: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    muted: PropTypes.bool,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    play: PropTypes.func,
    pause: PropTypes.func,
    seek: PropTypes.func,
    stop: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    mute: PropTypes.func,
    unMute: PropTypes.func,
    progress: MicromagPropTypes.videoControl,
    playback: MicromagPropTypes.videoControl,
    volume: MicromagPropTypes.videoControl,
    className: PropTypes.string,
};

const defaultProps = {
    playing: false,
    paused: false,
    ended: false,
    muted: false,
    currentTime: 0,
    duration: 0,
    play: () => {},
    pause: () => {},
    seek: () => {},
    stop: () => {},
    mute: () => {},
    unMute: () => {},
    progress: null,
    playback: null,
    volume: null,
    className: null,
};

const MediaControls = ({
    playing,
    muted,
    currentTime,
    duration,
    play,
    pause,
    seek,
    mute,
    unMute,
    progress,
    playback,
    volume,
    className,
}) => {
    const seekRef = useRef(null);
    const onClickPlayPause = useCallback(() => {
        if (playing && pause !== null) {
            pause();
        } else if (!playing && play !== null) {
            play();
        }
    }, [playing, play, pause]);

    const onClickMute = useCallback(() => {
        if (muted && unMute !== null) {
            unMute();
        } else if (!muted && mute !== null) {
            mute();
        }
    }, [muted, mute, unMute]);

    const onSeek = useCallback(
        e => {
            let posx = 0;
            if (e.pageX) {
                posx = e.pageX;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            }

            if (seekRef.current) {
                const rect = seekRef.current.getBoundingClientRect();

                const offset = posx - (rect.left > 0 ? rect.left : 88 / 2); // default gap
                const max = rect.right - rect.left;
                const pct = (offset / max) * 100;
                const time = (pct / 100) * duration;

                if ((time || time === 0) && seek !== null) {
                    seek(time);
                }
            }
        },
        [seek, seekRef, duration],
    );

    const { visible: progressVisible = true, color: progressColor = null } = progress || {};
    const { visible: playbackVisible = true, color: playbackColor = null } = playback || {};
    const { visible: volumeVisible = true, color: volumeColor = null } = volume || {};

    const width = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.bar}>
                {playbackVisible ? (
                    <button
                        type="button"
                        className={styles.button}
                        onClick={onClickPlayPause}
                        style={{
                            ...getStyleFromColor(playbackColor, 'color'),
                        }}
                    >
                        <FontAwesomeIcon
                            icon={playing ? faPause : faPlay}
                            className={styles.icon}
                        />
                    </button>
                ) : null}
                <div className={styles.spacer}>
                    {progressVisible ? (
                        <button
                            type="button"
                            ref={seekRef}
                            onClick={onSeek}
                            className={classNames(['progress', styles.progress])}
                            style={{
                                ...getStyleFromColor(progressColor, 'borderColor', 0.3),
                            }}
                        >
                            <div
                                className={classNames(['progress-bar', styles.progressBar])}
                                style={{
                                    width: `${width}%`,
                                    ...getStyleFromColor(progressColor, 'backgroundColor'),
                                }}
                            />
                        </button>
                    ) : null}
                </div>
                {volumeVisible ? (
                    <button
                        type="button"
                        className={styles.button}
                        onClick={onClickMute}
                        style={{
                            ...getStyleFromColor(volumeColor, 'color'),
                        }}
                    >
                        <FontAwesomeIcon
                            icon={muted ? faVolumeMute : faVolumeUp}
                            className={styles.icon}
                        />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

MediaControls.propTypes = propTypes;
MediaControls.defaultProps = defaultProps;

export default MediaControls;
