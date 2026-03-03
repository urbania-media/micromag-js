/* eslint-disable react/prop-types */
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.css';

export function AdImage({ width, height, className }) {
    return (
        <PlaceholderBlock width={width} height={height} className={className}>
            <FontAwesomeIcon icon={faImage} className={styles.icon} />
        </PlaceholderBlock>
    );
}

export default AdImage;
