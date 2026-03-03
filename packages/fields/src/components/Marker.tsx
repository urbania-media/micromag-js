/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Fields from './Fields';

import styles from '../styles/marker.module.css';

interface MarkerFieldProps {
    value?: { text?: string };
    isForm?: boolean;
    className?: string;
}

function MarkerField({
    isForm = false,
    value = null,
    className = null,
    ...props
}: MarkerFieldProps) {
    const { title = null } = value || {};
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Fields {...props} value={value} />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {title !== null ? (
                <>
                    <span className={styles.value}>{title.body}</span>
                </>
            ) : (
                <span className={styles.noValue}>Entrez les infos...</span>
            )}
        </div>
    );
}

export default MarkerField;
