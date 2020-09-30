/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Panorama = (props) => (
    <PlaceholderBlock
        {...props}
        width="100%"
        className={classNames([props.className, styles.slideshow])}
    >
        <FontAwesomeIcon icon={faEye} className={styles.icon} />
    </PlaceholderBlock>
);

export default Panorama;
