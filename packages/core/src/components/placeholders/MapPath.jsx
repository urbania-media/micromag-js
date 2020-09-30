/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const MapPath = (props) => (
    <PlaceholderBlock
        {...props}
        width="100%"
        height="70%"
        className={classNames([props.className, styles.mapPath])}
    >
        <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" className={styles.icon} />
    </PlaceholderBlock>
);

export default MapPath;
