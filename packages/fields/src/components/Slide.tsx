/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { ImageMedia } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/slide.module.css';

interface SlideFieldProps {
    value?: { text?: string; image?: ImageMedia } | null;
    isForm?: boolean;
    className?: string | null;
}

function SlideField({ value = null, isForm = false, className = null, ...props }: SlideFieldProps) {
    const { text = null } = value || {};
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                className,
            ])}
        >
            <Fields
                className={classNames([
                    className,
                    {
                        'p-2': isForm,
                    },
                ])}
                {...props}
                value={value}
            />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            {text !== null ? (
                <>
                    <span className={styles.value}>{text}</span>
                </>
            ) : (
                <span className={styles.noValue}>Entrez les infos...</span>
            )}
        </div>
    );
}

export default SlideField;
