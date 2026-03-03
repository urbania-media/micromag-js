/* eslint-disable react/destructuring-assignment, react/prop-types */
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.css';

export function Audio({ width = '100%', height = '2em', className }) {
    return (
        <PlaceholderBlock width={width} height={height} className={className}>
            <FontAwesomeIcon icon={faMusic} className={styles.icon} />
        </PlaceholderBlock>
    );
}

export default Audio;
