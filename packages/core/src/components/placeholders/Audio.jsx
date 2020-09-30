/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Audio = (props) => (
    <PlaceholderBlock
        {...props}
        width="80%"
        height="30%"
        className={classNames([props.className, styles.audio])}
    >
        <FontAwesomeIcon icon={faMusic} className={styles.icon} />
    </PlaceholderBlock>
);

export default Audio;
