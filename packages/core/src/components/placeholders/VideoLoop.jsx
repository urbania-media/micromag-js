/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faPlay } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const VideoLoop = ({ width, height, className }) => (
    <PlaceholderBlock width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
        <FontAwesomeIcon icon={faRedo} className={styles.icon} />
    </PlaceholderBlock>
);

export default VideoLoop;
