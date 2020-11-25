/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.scss';

const TextPlaceholder = (props) => {
    
    const { lines = 4, height = 0.2 } = props;

    return (
        <PlaceholderText
            {...props}
            height={height}
            lines={lines}
            className={classNames([props.className, styles.text])}
        />
    );
}

export default TextPlaceholder;
