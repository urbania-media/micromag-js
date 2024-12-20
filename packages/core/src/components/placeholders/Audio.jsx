/* eslint-disable react/destructuring-assignment, react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Audio = ({ width = '100%', height = '2em', className }) => (
    <PlaceholderBlock width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faMusic} className={styles.icon} />
    </PlaceholderBlock>
);

export default Audio;
