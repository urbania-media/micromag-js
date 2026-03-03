/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/map.module.css';

export function Map(props) {
    return (
        <PlaceholderBlock
            {...props}
            width="100%"
            height="100%"
            className={classNames([
                styles.container,
                {
                    [props.className]: props.className !== null,
                },
            ])}
        >
            <FontAwesomeIcon
                icon={props.withImages ? faImage : faMapMarkerAlt}
                className={styles.icon}
            />
            <FontAwesomeIcon
                icon={props.withImages ? faImage : faMapMarkerAlt}
                className={styles.icon}
            />
            <FontAwesomeIcon
                icon={props.withImages ? faImage : faMapMarkerAlt}
                className={styles.icon}
            />
            <FontAwesomeIcon
                icon={props.withImages ? faImage : faMapMarkerAlt}
                className={styles.icon}
            />
        </PlaceholderBlock>
    );
}

export default Map;
