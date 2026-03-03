import React, { useCallback, useMemo } from 'react';

import type { FormField } from '@micromag/core';

import Fields from './Fields';

interface ElementFieldProps {
    name?: string | null;
    fields?: FormField[];
    value?: Record<string, unknown> | null;
    isList?: boolean;
    gotoFieldForm?: ((...args: unknown[]) => void) | null;
    closeFieldForm?: ((...args: unknown[]) => void) | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function ElementField({
    name = null,
    fields: formFields = [],
    value = null,
    gotoFieldForm = null,
    closeFieldForm = null,
    isList = false,
    onChange = null,
}: ElementFieldProps) {
    const fields = formFields || [];
    const settingsNames = useMemo(
        () => (fields ? fields.filter(({ setting = false }) => setting).map((it) => it.name) : []),
        [fields],
    );
    const componentFields = useMemo(
        () => fields.filter(({ setting = false }) => !setting),
        [fields],
    );
    const componentValue = useMemo(() => {
        if (value === null || settingsNames === null) {
            return value;
        }
        return Object.keys(value).reduce(
            (scopedValue, key) =>
                settingsNames.indexOf(key) === -1
                    ? {
                          ...scopedValue,
                          [key]: value[key],
                      }
                    : scopedValue,
            null,
        );
    }, [fields, settingsNames, value]);

    const componentOnChange = useCallback(
        (newComponentValue) => {
            const newValue = {
                ...value,
                ...newComponentValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    return (
        <Fields
            name={name}
            fields={componentFields}
            value={componentValue}
            gotoFieldForm={gotoFieldForm}
            closeFieldForm={closeFieldForm}
            onChange={componentOnChange}
            isList={isList}
        />
    );
}

export default ElementField;
