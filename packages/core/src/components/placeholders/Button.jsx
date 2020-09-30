/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import Placeholder from '../partials/Placeholder';

import styles from '../../styles/partials/placeholders.module.scss';

export const Button = (props) => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.button])}
        height={0.3}
        lines={1}
    />
);

export default Button;
