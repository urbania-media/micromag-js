/* eslint-disable react/prop-types */
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../styles/placeholders/placeholders.module.scss';
import PlaceholderBlock from '../partials/PlaceholderBlock';

export const VideoLoop = ({ width, height, className }) => (
    <PlaceholderBlock width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
        <FontAwesomeIcon icon={faRedo} className={styles.icon} />
    </PlaceholderBlock>
);

export default VideoLoop;
