/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { ImageMedia } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/slide.module.css';

interface SlideFieldProps {
    value?: { text?: string; image?: ImageMedia };
    isForm?: boolean;
    className?: string;
}

function SlideField({ value = null, isForm = false, className = null, ...props }) {
    const { text = null } = value || {};
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Fields
                className={classNames([
                    {
                        'p-2': isForm,
                        className: className !== null,
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
                {
                    [className]: className !== null,
                },
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
