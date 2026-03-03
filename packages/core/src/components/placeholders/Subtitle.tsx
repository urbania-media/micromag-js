/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import classNames from 'classnames';
import React from 'react';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.css';

export function Subtitle(props) {
    return (
        <PlaceholderText
            {...props}
            className={classNames([props.className, styles.subtitle])}
            height={0.3}
            lines={1}
        />
    );
}

export default Subtitle;
