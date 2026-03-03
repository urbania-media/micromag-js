/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.css';

export function MapPath(props) {
    return (
        <PlaceholderBlock
            {...props}
            width="100%"
            height="70%"
            className={classNames([props.className, styles.mapPath])}
        >
            <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" className={styles.icon} />
        </PlaceholderBlock>
    );
}

export default MapPath;
