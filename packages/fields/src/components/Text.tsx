import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { ForwardedRef } from 'react';

import type { Errors } from '@micromag/core';

export interface TextFieldProps {
    type?: 'text' | 'email' | 'number' | 'password';
    value?: string | number | null;
    errors?: Errors | null;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string | null;
    prefix?: string | null;
    autofocus?: boolean;
    onFocus?: ((...args: unknown[]) => void) | null;
    onChange?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    ref?: ForwardedRef<HTMLInputElement>;
}

function TextField({
    ref: inputRef = null,
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
                className,
                {
                    'is-invalid': errors !== null && errors.length > 0,
                    disabled,
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

export default TextField;
