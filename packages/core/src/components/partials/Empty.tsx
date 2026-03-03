/* eslint-disable react/no-array-index-key */
import React from 'react';
import classNames from 'classnames';

import Label from './Label';

import styles from '../../styles/partials/empty.module.css';

interface EmptyProps {
    children?: React.ReactNode;
    withoutBorder?: boolean;
    light?: boolean;
    className?: string;
}

const Empty = ({ children = null, withoutBorder = false, light = false, className = null }) => (
    <div
        className={classNames([
            styles.container,
            {
                [styles.withoutBorder]: withoutBorder,
                [styles.light]: light,
                [className]: className,
            },
        ])}
    >
        <div className={styles.middle}>
            <Label>{children}</Label>
        </div>
    </div>
);

export default Empty;
