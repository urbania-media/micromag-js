/* eslint-disable react/prop-types */
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.css';

export function Video({ width, height, className }) {
    return (
        <PlaceholderBlock width={width} height={height} className={className}>
            <FontAwesomeIcon icon={faVideo} className={styles.icon} />
        </PlaceholderBlock>
    );
}

export default Video;
