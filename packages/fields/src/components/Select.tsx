/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import type { SelectOption } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/select.module.css';

interface SelectFieldProps {
    value?: string;
    options?: SelectOption[];
    disabled?: boolean;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function SelectField({
    value = null,
    options = [],
    disabled = false,
    className = null,
    onChange = null,
}: SelectFieldProps) {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    return (
        <select
            className={classNames([
                styles.container,
                'form-select',
                {
                    [styles.lightCaret]: !disabled,
                    'bg-dark': !disabled,
                    'text-light': !disabled,
                    'text-dark': disabled,
                    [className]: className !== null,
                },
            ])}
            value={value || ''}
            disabled={disabled}
            onChange={(e) =>
                onChange !== null
                    ? onChange(e.currentTarget.value !== '' ? e.currentTarget.value : null)
                    : null
            }
        >
            <option value="">--</option>
            {finalOptions.map(({ value: optionValue, label: optionLabel }) => (
                <option key={`select-${optionValue}`} value={optionValue}>
                    {optionLabel}
                </option>
            ))}
        </select>
    );
}

export default SelectField;
