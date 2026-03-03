/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import type { Errors } from '@micromag/core';

interface TextareaFieldProps {
    id?: string;
    value?: string | number;
    errors?: Errors;
    required?: boolean;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function TextareaField({
    id = null,
    value = null,
    errors = null,
    required = false,
    className = null,
    onChange = null,
}) {
    return (
        <textarea
            id={id}
            className={classNames([
                'form-control',
                {
                    'is-invalid': errors !== null && errors.length > 0,
                    [className]: className !== null,
                },
            ])}
            value={value || ''}
            onChange={({ currentTarget: { value: newValue = '' } }) =>
                onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
            }
            required={required}
        />
    );
}

export default TextareaField;
