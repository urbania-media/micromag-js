import classNames from 'classnames';
import React from 'react';

import styles from '../styles/static-field.module.css';

interface StaticFieldProps {
    value?: string | number | unknown[] | null;
    name?: string | null;
    className?: string | null;
}

function StaticField({ value = null, name = null, className = null }: StaticFieldProps) {
    return (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            {name === 'user' ? <div className={styles.icon} /> : null}
            <div className={styles.field}>{value !== null ? value : null}</div>
        </div>
    );
}

export default StaticField;
