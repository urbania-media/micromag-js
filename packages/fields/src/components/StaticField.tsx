import React from 'react';
import classNames from 'classnames';

import styles from '../styles/static-field.module.css';

interface StaticFieldProps {
    value?: string | number | unknown[];
    name?: string;
    className?: string;
}

const StaticField = ({ value = null, name = null, className = null }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        {name === 'user' ? <div className={styles.icon} /> : null}
        <div className={styles.field}>{value !== null ? value : null}</div>
    </div>
);

export default StaticField;
