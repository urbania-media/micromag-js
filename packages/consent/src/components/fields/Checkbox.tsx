/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import isString from 'lodash/isString';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from '../../styles/fields/checkbox.module.css';

interface CheckboxFieldProps {
    name?: string;
    label?: string | Record<string, unknown>;
    value?: string;
    disabled?: boolean;
    className?: string;
    onClick?: (...args: unknown[]) => void;
    onChange?: (...args: unknown[]) => void;
}

function CheckboxField({ name = null, label = null, value = null, disabled = false, onClick = null, onChange = null, className = null }) {
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
            htmlFor={name}
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: disabled,
                    [className]: className !== null,
                },
            ])}
        >
            <span className={styles.check}>
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    disabled={disabled}
                    checked={value || false}
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
