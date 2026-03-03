/* eslint-disable react/prop-types */
import { faAd } from '@fortawesome/free-solid-svg-icons/faAd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.css';

export function AdFrame({ width, height, className }) {
    return (
        <PlaceholderBlock width={width} height={height} className={className}>
            <FontAwesomeIcon icon={faAd} className={styles.icon} />
        </PlaceholderBlock>
    );
}

export default AdFrame;
