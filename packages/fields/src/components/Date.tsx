import classNames from 'classnames';
import React, { useCallback } from 'react';

import styles from '../styles/date.module.css';

interface DateFieldProps {
    name?: string | null;
    value?: number | null;
    withTime?: boolean;
    placeholder?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function DateField({
    name = null,
    value = null,
    placeholder = null,
    className = null,
    withTime = false,
    onChange = null,
}: DateFieldProps) {
    const onInputChange = (e) => {
        if (onChange !== null) {
            const val = e.currentTarget.value || null;
            onChange(val);
        }
    };

    return (
        <div className={classNames([styles.container, className])}>
            <input
                type={withTime ? 'datetime-local' : 'date'}
                className={classNames([styles.input, 'form-control', 'ms-auto'])}
                name={name}
                value={value !== null ? value : ''}
                autoComplete="off"
                onChange={onInputChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default DateField;
