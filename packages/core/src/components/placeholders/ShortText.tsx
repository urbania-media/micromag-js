/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.css';

export function ShortText(props) {
    return (
        <PlaceholderText
            {...props}
            className={classNames([props.className, styles.shortText])}
            height={0.2}
            lines={2}
        />
    );
}

export default ShortText;
