import classNames from 'classnames';
import React, { useCallback } from 'react';

import styles from '../styles/date.module.css';

interface DateFieldProps {
    name?: string;
    value?: number;
    withTime?: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function DateField(
    { name = null, value = null, placeholder = null, className = null, withTime = false, onChange = null },
) {
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                const val = e.currentTarget.value || null;
                onChange(val);
            }
        },
        [onChange],
    );

    return (
        <div className={classNames([styles.container, { [className]: className !== null }])}>
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
