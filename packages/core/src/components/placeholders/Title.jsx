/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Title = (props) => (
    <PlaceholderText
        {...props}
        className={classNames([props.className, styles.title])}
        height={1}
        lines={1}
        lineMargin={1}
    />
);

export default Title;
