/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Image = (props) => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.image])}
        width="100%"
        height="100%"
    />
);

export default Image;
