import isEqual from 'lodash-es/isEqual';
import { useIntl } from 'react-intl';
import Select, { type Props as SelectProps } from 'react-select';

import type { SelectOption } from '@micromag/core';
import { isMessage } from '@micromag/core/utils';

import getSelectOptions from '../utils/getSelectOptions';
import { selectTheme } from '../utils/selectTheme';

const emptyArray: never[] = [];

interface SelectAdvancedFieldProps extends SelectProps {
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
    const finalOptions = getSelectOptions(options).map(({ label, ...option }) => ({
        ...option,
        label: isMessage(label) ? intl.formatMessage(label) : label,
    }));
    const intl = useIntl();
    const onChangeOption = (newValue) => {
        if (onChange !== null) {
            onChange(newValue !== null && newValue.value ? newValue.value : null);
        }
    };
    const optionValue = finalOptions.find((opt) =>
        opt.value !== null ? isEqual(value, opt.value) : false,
    );

    return (
        <Select
            className={className}
            isClearable={!withoutReset}
            {...props}
            id={name}
            name={name}
            value={optionValue || value || null}
            options={finalOptions}
            isDisabled={disabled}
            onChange={onChangeOption}
            theme={selectTheme}
        />
    );
}

export default SelectAdvancedField;
