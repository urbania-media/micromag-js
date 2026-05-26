import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import type { SelectOption } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

const emptyArray: never[] = [];

interface SelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
    value?: string | null;
    options?: SelectOption[];
    disabled?: boolean;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function SelectField({
    value = null,
    options = emptyArray,
    disabled = false,
    className = null,
    onChange = null,
    ...props
}: SelectFieldProps) {
    return (
        <select
            className={classNames(['form-select', className])}
            value={value || ''}
            disabled={disabled}
            onChange={(e) =>
                onChange !== null
                    ? onChange(e.currentTarget.value !== '' ? e.currentTarget.value : null)
                    : null
            }
            {...props}
        >
            <option value="">--</option>
            {getSelectOptions(options).map(({ value: optionValue, label: optionLabel }) => (
                <option key={`select-${optionValue}`} value={optionValue}>
                    {optionLabel}
                </option>
            ))}
        </select>
    );
}

export default SelectField;
