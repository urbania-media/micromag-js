/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import classNames from 'classnames';
import React from 'react';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.css';

export function Quote(props) {
    return (
        <PlaceholderText
            {...props}
            className={classNames([props.className, styles.subtitle])}
            height={0.5}
            lines={6}
        />
    );
}

export default Quote;
