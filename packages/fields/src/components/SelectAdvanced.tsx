/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';

import type { SelectOption } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';
import { selectTheme } from '../utils/selectTheme';

const emptyArray: never[] = [];

interface SelectAdvancedFieldProps {
    name?: string | null;
    value?: string | null;
    options?: SelectOption[];
    withoutReset?: boolean;
    disabled?: boolean;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function SelectAdvancedField({
    name = null,
    value = null,
    options = emptyArray,
    withoutReset = false,
    disabled = false,
    className = null,
    onChange = null,
    ...props
}: SelectAdvancedFieldProps) {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    const intl = useIntl();
    const translatedOptions = useMemo(() =>
        finalOptions.map(({ label, ...option }) => ({
            ...option,
            label: typeof label === 'object' ? intl.formatMessage(label) : label,
        })),
    );
    const onChangeOption = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue !== null && newValue.value ? newValue.value : null);
            }
        },
        [onChange],
    );
    const optionValue = useMemo(
        () =>
            translatedOptions.find((opt) =>
                opt.value !== null ? isEqual(value, opt.value) : false,
            ),
        [value, options],
    );

    return (
        <Select
            className={classNames([
                className,
            ])}
            isClearable={!withoutReset}
            {...props}
            id={name}
            name={name}
            value={optionValue || value || null}
            options={translatedOptions}
            disabled={disabled}
            onChange={onChangeOption}
            theme={selectTheme}
        />
    );
}

export default SelectAdvancedField;
