/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

import { usePlaybackContext } from '@micromag/core/contexts';

import styles from '../../styles/partials/playback-controls.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

function PlaybackControls({ className }) {
    const { media: mediaElement = null } = usePlaybackContext();
    const [progress, setProgress] = useState(0);
    const mediaElementRef = useRef(mediaElement);
    const mediaElementChanged = mediaElementRef.current !== mediaElement;

    const finalProgress = mediaElementChanged ? 0 : progress;

    useEffect(() => {
        if (mediaElement === null) {
            return () => {};
        }
        function updateProgress() {
            setProgress(mediaElement.currentTime / (mediaElement.duration || 0));
        }
        function onTimeUpdate() {
            updateProgress();
        }
        mediaElement.addEventListener('timeupdate', onTimeUpdate);
        mediaElementRef.current = mediaElement;
        updateProgress();
        return () => {
            mediaElement.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, [mediaElement]);
    return (
        <div className={classNames([styles.container, { [className]: className !== null }])}>
            <div className={styles.bar}>Controls {finalProgress * 100}%</div>
        </div>
    );
}

PlaybackControls.propTypes = propTypes;
PlaybackControls.defaultProps = defaultProps;

export default PlaybackControls;
