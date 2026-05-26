import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { ForwardedRef, InputHTMLAttributes } from 'react';

import type { Errors } from '@micromag/core';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    inputId?: string | null;
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
    inputId = null,
    ref: inputRef = null,
    type = 'text',
    value = null,
    errors = null,
    disabled = false,
    prefix = null,
    autofocus = false,
    onChange = null,
    className = null,
    ...props
}: TextFieldProps) {
    const input = (
        <input
            ref={inputRef}
            id={inputId}
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
            autoFocus={autofocus}
            disabled={disabled}
            {...props}
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
