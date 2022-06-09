import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import SeekBar from './SeekBar';
import styles from './styles/media-controls.module.scss';

const propTypes = {
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onToggleMute: PropTypes.func,
    onSeek: PropTypes.func,
    withSeekBar: PropTypes.bool,
    withControls: PropTypes.bool,
    color: MicromagPropTypes.color,
    progressColor: MicromagPropTypes.color,
    className: PropTypes.string,
    focusable: PropTypes.bool,
};

const defaultProps = {
    playing: false,
    muted: false,
    currentTime: 0,
    duration: 0,
    onPlay: null,
    onPause: null,
    onToggleMute: null,
    onSeek: null,
    withSeekBar: false,
    withControls: false,
    color: null,
    progressColor: null,
    className: null,
    focusable: true,
};

const MediaControls = ({
    playing,
    muted,
    currentTime,
    duration,
    onPlay,
    onPause,
    onToggleMute,
    onSeek,
    withSeekBar,
    withControls,
    color,
    progressColor,
    className,
    focusable,
}) => {
    const intl = useIntl();
    const fullColor = isString(color) ? { color, alpha: 1 } : color;
    const { color: finalColor = 'white' } = fullColor || {};

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.playing]: playing,
                    [styles.muted]: muted,
                    [styles.withControls]: withControls,
                    [styles.withSeekBar]: withSeekBar,
                    [styles.withoutEvents]: !muted && !withControls && !withSeekBar,
                },
            ])}
            style={{ color: finalColor }}
        >
            <div className={styles.toggles}>
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
                    tabIndex={focusable ? '0' : '-1'}
                >
                    <FontAwesomeIcon className={styles.icon} icon={playing ? faPause : faPlay} />
                </button>
                <button
                    type="button"
                    className={styles.muteButton}
                    onClick={onToggleMute}
                    title={intl.formatMessage({
                        defaultMessage: 'Mute',
                        description: 'Button label',
                    })}
                    aria-label={intl.formatMessage({
                        defaultMessage: 'Mute',
                        description: 'Button label',
                    })}
                    tabIndex={focusable ? '0' : '-1'}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faVolumeUp} />
                </button>
            </div>
            {withSeekBar ? (
                <SeekBar
                    className={styles.seekBar}
                    currentTime={currentTime}
                    duration={duration}
                    playing={playing}
                    onSeek={onSeek}
                    focusable={focusable}
                    backgroundColor={color}
                    progressColor={progressColor}
                />
            ) : null}
        </div>
    );
};

MediaControls.propTypes = propTypes;
MediaControls.defaultProps = defaultProps;

export default MediaControls;
