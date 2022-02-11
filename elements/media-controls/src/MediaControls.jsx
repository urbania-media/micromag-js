import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
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
    withPlayPause: PropTypes.bool,
    withTime: PropTypes.bool,
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
    withPlayPause: false,
    withTime: false,
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
    withPlayPause,
    withTime,
    className,
    focusable,
}) => {
    const intl = useIntl();

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.playing]: playing,
                    [styles.muted]: muted,
                    [styles.withPlayPause]: withPlayPause,
                },
            ])}
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
                    withTime={withTime}
                />
            ) : null}
        </div>
    );
};

MediaControls.propTypes = propTypes;
MediaControls.defaultProps = defaultProps;

export default MediaControls;
