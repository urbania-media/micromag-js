import classNames from 'classnames';
import React from 'react';

import Label from './Label';

import styles from '../../styles/partials/empty.module.css';

interface EmptyProps {
    children?: React.ReactNode | null;
    withoutBorder?: boolean;
    className?: string | null;
}

function Empty({ children = null, withoutBorder = false, className = null }: EmptyProps) {
    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.withoutBorder]: withoutBorder,
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
