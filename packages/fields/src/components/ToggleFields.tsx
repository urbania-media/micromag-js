import isFunction from 'lodash-es/isFunction';
import isPlainObject from 'lodash-es/isPlainObject';
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

    // The value can contain keys without `active` (ex.: theme styles added by the
    // story parser), so the toggle and the sub-fields must both use `active`
    const finalValue = {
        ...value,
        active,
    };

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
        const { active: nowActive = false } = newValue || {};
        // Apply default values when activating, without overriding existing values
        const newValueWithDefaults =
            defaultValue !== null && nowActive && !active
                ? Object.keys(defaultValue).reduce((acc, key) => {
                      const currentValue = acc[key] ?? null;
                      const fieldDefaultValue = defaultValue[key];
                      if (currentValue === null) {
                          return { ...acc, [key]: fieldDefaultValue };
                      }
                      if (isPlainObject(currentValue) && isPlainObject(fieldDefaultValue)) {
                          return {
                              ...acc,
                              [key]: {
                                  ...(fieldDefaultValue as Record<string, unknown>),
                                  ...currentValue,
                              },
                          };
                      }
                      return acc;
                  }, newValue)
                : newValue;
        if (onChange !== null) {
            onChange(nowActive ? newValueWithDefaults : null);
        }
    };

    return <Fields {...props} fields={finalFields} value={finalValue} onChange={onUpdateValue} />;
}

export default ToggleFields;
