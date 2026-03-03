/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import type { Errors } from '@micromag/core';
import styles from '../styles/field-errors.module.css';

interface FieldErrorsProps {
    errors?: Errors;
    className?: string;
}

function FieldErrors({ errors = null, className = null }) {
    return errors !== null && errors.length > 0 ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {errors.map(error => (
                <div
                    key={`error-${error}`}
                    className={classNames(['invalid-feedback', styles.error])}
                >
                    {error}
                </div>
            ))}
        </div>
    ) : null;
}

export default FieldErrors;
