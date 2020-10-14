/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Map = (props) => (
    <PlaceholderBlock
        {...props}
        width="100%"
        height="80%"
        className={classNames([props.className, styles.map])}
    >
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
    </PlaceholderBlock>
);

export default Map;
