/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Subtitle = (props) => (
    <PlaceholderText
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.3}
        lines={1}
    />
);

export default Subtitle;
