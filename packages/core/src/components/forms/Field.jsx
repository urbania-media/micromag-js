/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useFieldsManager, useFieldComponent, FieldContextProvider } from '../../contexts';
import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName, setFieldValue, getFieldFromPath } from '../../utils';

const propTypes = {
    name: PropTypes.string, // .isRequired,
    value: MicromagPropTypes.component,
    form: PropTypes.string,
    formComponents: MicromagPropTypes.components,
    fields: MicromagPropTypes.fields,
    className: PropTypes.string,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
    fieldContext: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    name: null,
    form: null,
    formComponents: {},
    fields: [],
    value: null,
    className: null,
    onChange: null,
    fieldContext: null,
};

const FieldForm = ({
    name,
    value,
    form,
    formComponents,
    fields,
    className,
    onChange,
    gotoFieldForm,
    closeFieldForm,
    fieldContext,
}) => {
    const fieldsManager = useFieldsManager();

    const field = getFieldFromPath(name.split('.'), fields, fieldsManager);
    console.log({field, name});

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

    // Use field component with isForm props
    return FieldComponent !== null ? (
        <FieldContextProvider context={fieldContext}>
            <FieldComponent
                className={className}
                {...definitionProps}
                {...fieldProps}
                isForm
                {...formProps}
            />
        </FieldContextProvider>
    ) : null;
};

FieldForm.propTypes = propTypes;
FieldForm.defaultProps = defaultProps;

export default FieldForm;
