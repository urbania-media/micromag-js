/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';

import Label from './Label';

import styles from '../../styles/partials/empty.module.css';

interface EmptyProps {
    children?: React.ReactNode;
    withoutBorder?: boolean;
    light?: boolean;
    className?: string;
}

function Empty({ children = null, withoutBorder = false, light = false, className = null }) {
    return (
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
}

export default Empty;
