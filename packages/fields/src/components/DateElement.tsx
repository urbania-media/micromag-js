/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback } from 'react';

import type { TextElement } from '@micromag/core';
import styles from '../styles/date.module.css';

interface DateElementProps {
    name?: string;
    value?: TextElement;
    withTime?: boolean;
    placeholder?: string;
    onChange?: (...args: unknown[]) => void;
}

function DateElement(
    { name = null, value = null, withTime = false, onChange = null, placeholder = null },
) {
    const bodyValue = value !== null ? value.body || null : null;
    const onBodyChange = useCallback(
        (e) => {
            const val = e.currentTarget.value || null;
            const newValue = {
                ...value,
                body: val,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    return (
        <input
            type={withTime ? 'datetime-local' : 'date'}
            className={classNames([styles.input, 'form-control', 'ms-auto'])}
            name={name}
            value={bodyValue !== null ? bodyValue : ''}
            autoComplete="off"
            onChange={onBodyChange}
            placeholder={placeholder}
        />
    );
}

export default DateElement;
