/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import classNames from 'classnames';
import React from 'react';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.css';

export function Line(props) {
    return (
        <PlaceholderText
            {...props}
            className={classNames([props.className, styles.shortText])}
            height={0.2}
            lines={1}
        />
    );
}

export default Line;
