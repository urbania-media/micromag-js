/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import classNames from 'classnames';
import React from 'react';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.css';

export function Timeline(props) {
    return (
        <PlaceholderText {...props} className={classNames([props.className, styles.timeline])} />
    );
}

export default Timeline;
