import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getContrastingColor } from '@micromag/core/utils';
import SeekBar from './SeekBar';
import styles from './styles/media-controls.module.scss';

const propTypes = {
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    onTogglePlay: PropTypes.func,
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
    onTogglePlay: null,
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
    onTogglePlay,
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
    const fullProgressColor = isString(color) ? { progressColor, alpha: 1 } : color;

    const alternateColor = useMemo(
        () => fullProgressColor || getContrastingColor(fullColor),
        [fullProgressColor, fullColor],
    );

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
                    [styles.withoutEvents]: !muted && !withPlayPause && !withSeekBar,
                },
            ])}
            style={{ color: finalColor }}
        >
            <div className={styles.toggles}>
                <button
                    type="button"
                    className={styles.playPauseButton}
                    onClick={onTogglePlay}
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
                    // withTime={withControls}
                    backgroundColor={finalColor}
                    progressColor={alternateColor}
                />
            ) : null}
        </div>
    );
};

MediaControls.propTypes = propTypes;
MediaControls.defaultProps = defaultProps;

export default MediaControls;
