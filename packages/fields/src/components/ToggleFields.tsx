import isFunction from 'lodash-es/isFunction';
import { useIntl } from 'react-intl';

import { Label } from '@micromag/core';

import Fields, { FieldsProps } from './Fields';

interface ToggleFieldsProps extends FieldsProps {
    value?: { active?: boolean } | null;
    toggleLabel?: Label | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function ToggleFields({
    value = null,
    onChange = null,
    fields,
    toggleLabel,
    ...props
}: ToggleFieldsProps) {
    const intl = useIntl();
    const active = value?.active ?? false;
    const finalFields = [
        {
            name: 'active',
            type: 'toggle',
            isHorizontal: true,
            label: toggleLabel,
        },
        ...(active ? fields : []),
    ];

    const finalValue =
        value !== null
            ? {
                  active: true,
                  ...value,
              }
            : value;

    const defaultValue = fields.reduce(
        (acc, { name, defaultValue: fieldDefaultValue = null }) =>
            fieldDefaultValue !== null
                ? {
                      ...acc,
                      [name]: isFunction(fieldDefaultValue)
                          ? fieldDefaultValue({ intl })
                          : fieldDefaultValue,
                  }
                : acc,
        null,
    );

    const onUpdateValue = (newValue) => {
        const newValueWithDefaults =
            defaultValue !== null &&
            newValue !== null &&
            Object.keys(newValue).join('') === 'active' &&
            newValue?.active === true
                ? {
                      ...defaultValue,
                      ...newValue,
                  }
                : newValue;
        const { active: nowActive = false } = newValueWithDefaults || {};
        if (onChange !== null) {
            onChange(nowActive ? newValueWithDefaults : null);
        }
    };

    return <Fields {...props} fields={finalFields} value={finalValue} onChange={onUpdateValue} />;
}

export default ToggleFields;
