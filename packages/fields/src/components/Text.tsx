/* eslint-disable jsx-a11y/no-autofocus */

/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import type { Errors } from '@micromag/core';

interface TextFieldProps {
    inputRef?: (...args: unknown[]) => void | { current?: Record<string, unknown> };
    type?: 'text' | 'email' | 'number' | 'password';
    value?: string | number;
    errors?: Errors;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    prefix?: string;
    autofocus?: boolean;
    onFocus?: (...args: unknown[]) => void;
    onChange?: (...args: unknown[]) => void;
    className?: string;
}

function TextField({
    inputRef = null,
    type = 'text',
    value = null,
    errors = null,
    required = false,
    disabled = false,
    placeholder = null,
    prefix = null,
    autofocus = false,
    onChange = null,
    onFocus = null,
    className = null,
}: TextFieldProps) {
    const input = (
        <input
            ref={inputRef}
            type={type}
            className={classNames([
                'form-control',
                {
                    'is-invalid': errors !== null && errors.length > 0,
                    disabled,
                    [className]: className !== null,
                },
            ])}
            value={value || ''}
            onChange={({ currentTarget: { value: newValue = '' } }) =>
                onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
            }
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            {...(onFocus !== null ? { onFocus } : null)}
        />
    );

    return prefix !== null ? (
        <span className="input-group">
            <span className="input-group-text">{prefix}</span>
            {input}
        </span>
    ) : (
        input
    );
}

export default React.forwardRef((props, ref) => <TextField {...props} inputRef={ref} />);
