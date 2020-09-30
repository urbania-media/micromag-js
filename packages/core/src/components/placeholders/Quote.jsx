/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import Placeholder from '../partials/Placeholder';

import styles from '../../styles/partials/placeholders.module.scss';

export const Quote = (props) => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.5}
        lines={1}
    />
);

export default Quote;
