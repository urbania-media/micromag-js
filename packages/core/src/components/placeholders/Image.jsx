/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Image = ({ width, height, className, ...props }) => (
    <PlaceholderBlock {...props} width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faImage} className={styles.icon} />
    </PlaceholderBlock>
);

export default Image;
