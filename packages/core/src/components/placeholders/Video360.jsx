/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/video-360.module.scss';

export const Video360 = ({ width, height, className }) => (
    <PlaceholderBlock
        width={width}
        height={height}
        className={classNames([styles.container, { [className]: className !== null }])}
        boxClassName={styles.box}
    >
        <FontAwesomeIcon icon={faVideo} className={styles.icon} />
        <div className={styles.label}>360</div>
    </PlaceholderBlock>
);

export default Video360;
