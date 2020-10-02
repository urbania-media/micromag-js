/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const AdFrame = ({ width, height, className }) => (
    <PlaceholderBlock width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faAd} className={styles.icon} />
    </PlaceholderBlock>
);

export default AdFrame;
