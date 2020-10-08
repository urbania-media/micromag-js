/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faPlay } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const VideoLoop = (props) => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.videoLoop])}
        width="80%"
        height="40%"
    >
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
        <FontAwesomeIcon icon={faRedo} className={styles.icon} />
    </PlaceholderBlock>
);

export default VideoLoop;
