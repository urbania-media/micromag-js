import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { TextareaHTMLAttributes } from 'react';

import type { Errors } from '@micromag/core';

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id?: string | null;
    value?: string | number | null;
    errors?: Errors | null;
    required?: boolean;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function TextareaField({
    id = null,
    value = null,
    errors = null,
    required = false,
    className = null,
    onChange = null,
    ...props
}: TextareaFieldProps) {
    return (
        <textarea
            id={id}
            className={classNames([
                'form-control',
                className,
                {
                    'is-invalid': errors !== null && errors.length > 0,
                },
            ])}
            value={value || ''}
            onChange={({ currentTarget: { value: newValue = '' } }) =>
                onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
            }
            required={required}
            {...props}
        />
    );
}

export default TextareaField;
