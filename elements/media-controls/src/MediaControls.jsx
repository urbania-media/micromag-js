import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
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
    className: PropTypes.string,
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
    className: null,
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
    className,
}) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.muted]: muted,
                },
            ])}
        >
            {withSeekBar ? (
                <SeekBar
                    className={styles.seekBar}
                    currentTime={currentTime}
                    duration={duration}
                    playing={playing}
                    onSeek={onSeek}
                />
            ) : null}
            <div className={styles.toggles}>
                <button type="button" className={styles.playPauseButton} onClick={onTogglePlay}>
                    <FontAwesomeIcon className={styles.icon} icon={playing ? faPause : faPlay} />
                </button>
                <button type="button" className={styles.muteButton} onClick={onToggleMute}>
                    <FontAwesomeIcon className={styles.icon} icon={faVolumeUp} />
                </button>
            </div>
        </div>
    );
};

MediaControls.propTypes = propTypes;
MediaControls.defaultProps = defaultProps;

export default MediaControls;
