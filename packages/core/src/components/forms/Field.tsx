/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import get from 'lodash/get';
import React, { useCallback } from 'react';

import { getComponentFromName, getFieldFromPath, setFieldValue } from '../../utils';

import { FieldContextProvider, useFieldComponent, useFieldsManager } from '../../contexts';

interface FieldFormProps {
    name?: string;
    value?: Component;
    form?: string;
    formComponents?: Record<string, Component>;
    fields?: Field[];
    className?: string;
    onChange?: (...args: unknown[]) => void;
    gotoFieldForm: (...args: unknown[]) => void;
    closeFieldForm: (...args: unknown[]) => void;
    fieldContext?: unknown;
}

function FieldForm({
    name = null,
    value = null,
    form = null,
    formComponents = {},
    fields = [],
    className = null,
    onChange = null,
    gotoFieldForm,
    closeFieldForm,
    fieldContext = null,
}: FieldFormProps) {
    const fieldsManager = useFieldsManager();

    const field = getFieldFromPath(name.split('.'), fields, fieldsManager);
    const parentField =
        name.match(/\.[0-9]+$/) !== null
            ? getFieldFromPath(name.split('.').slice(0, -1), fields, fieldsManager)
            : null;

    const { type = null, ...fieldProps } = field || {};

    const fieldDefinition = fieldsManager.getDefinition(type) || null;
    const fieldData = fieldDefinition || {
        ...field,
    };
    const { component: fieldComponent = null, id, settings, ...definitionProps } = fieldData || {};

    const FieldComponent = useFieldComponent(fieldComponent);

    const FormComponent = getComponentFromName(form, formComponents);

    const fieldValue = get(value, name, null);

    const onFieldChange = (newFieldValue) => {
        // const { name, fields: subFields = null } = field || {};
        const newValue = setFieldValue(
            value,
            name.split('.'),
            newFieldValue,
            // field === null || subFields !== null ? newFieldValue : newFieldValue[name],
        );
        if (onChange !== null) {
            onChange(newValue);
        }
    };

    const closeForm = useCallback(() => closeFieldForm(name, form), [name, form, closeFieldForm]);

    const formProps = {
        name,
        value: fieldValue,
        onChange: onFieldChange,
        gotoFieldForm,
        closeFieldForm,
        closeForm,
    };

    if (form !== null) {
        return FormComponent !== null ? (
            <FieldContextProvider context={fieldContext}>
                <FormComponent field={field} {...formProps} className={className} />
            </FieldContextProvider>
        ) : null;
    }

    const { itemsProps } = parentField || {};

    // Use field component with isForm props
    return FieldComponent !== null ? (
        <FieldContextProvider context={fieldContext}>
            <FieldComponent
                className={className}
                {...definitionProps}
                {...fieldProps}
                {...itemsProps}
                isForm
                {...formProps}
            />
        </FieldContextProvider>
    ) : null;
}

export default FieldForm;
