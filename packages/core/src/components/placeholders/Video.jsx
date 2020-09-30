/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Video = (props) => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.video])}
        width="80%"
        height="40%"
    >
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
    </PlaceholderBlock>
);

export default Video;
