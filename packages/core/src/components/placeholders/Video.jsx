/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Video = ({ width, height, className }) => (
    <PlaceholderBlock width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faVideo} className={styles.icon} />
    </PlaceholderBlock>
);

export default Video;
