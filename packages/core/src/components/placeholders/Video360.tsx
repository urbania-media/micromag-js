/* eslint-disable react/prop-types */
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/video-360.module.css';

export function Video360({ width, height, className }) {
    return (
        <PlaceholderBlock
            width={width}
            height={height}
            className={classNames([styles.container, className])}
            boxClassName={styles.box}
        >
            <FontAwesomeIcon icon={faVideo} className={styles.icon} />
            <div className={styles.label}>360</div>
        </PlaceholderBlock>
    );
}

export default Video360;
