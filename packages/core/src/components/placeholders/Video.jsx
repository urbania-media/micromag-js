/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Video = ({ width, height, className }) => (
    <PlaceholderBlock width={width} height={height} className={className}>
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
    </PlaceholderBlock>
);

export default Video;
