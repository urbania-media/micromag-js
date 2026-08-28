/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import isString from 'lodash-es/isString';
import React, { useCallback, useId } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from '../../styles/fields/checkbox.module.css';

interface CheckboxFieldProps {
    id?: string;
    name?: string;
    label?: string | Record<string, unknown>;
    value?: boolean;
    disabled?: boolean;
    describedBy?: string;
    className?: string;
    onClick?: (...args: unknown[]) => void;
    onChange?: (...args: unknown[]) => void;
}

function CheckboxField({
    id = null,
    name = null,
    label = null,
    value = null,
    disabled = false,
    describedBy = null,
    onClick = null,
    onChange = null,
    className = null,
}: CheckboxFieldProps) {
    // Ensures the label is always tied to a real input id, even when no name is provided
    const generatedId = useId();
    const inputId = id || name || generatedId;

    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(e.currentTarget.checked);
            }
        },
        [onChange],
    );
    return (
        <label
            htmlFor={inputId}
            className={classNames([
                styles.container,
                className,
                {
                    [styles.disabled]: disabled,
                },
            ])}
        >
            <span className={styles.check}>
                <input
                    type="checkbox"
                    name={name || inputId}
                    id={inputId}
                    disabled={disabled}
                    checked={value || false}
                    aria-describedby={describedBy}
                    onChange={onClick || onInputChange}
                    className={styles.input}
                />
            </span>
            <span className={styles.label}>
                {isString(label) ? label : <FormattedMessage {...label} />}
            </span>
        </label>
    );
}

export default CheckboxField;
