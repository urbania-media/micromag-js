/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useFormsComponents, useFieldsComponents, useScreenFields } from '@micromag/core/contexts';

import setValue from '../../utils/setFieldValue';

const propTypes = {
    value: MicromagPropTypes.component,
    field: PropTypes.string.isRequired,
    form: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
    formComponents: MicromagPropTypes.components,
    fieldComponents: MicromagPropTypes.components,
};

const defaultProps = {
    form: null,
    value: null,
    className: null,
    onChange: null,
    formComponents: null,
    fieldComponents: null,
};

const FieldForm = ({
    value,
    field: fieldPath,
    form,
    className,
    onChange,
    gotoFieldForm,
    closeFieldForm,
    formComponents,
    fieldComponents,
}) => {
    const { type } = value;
    const fields = useScreenFields(type);

    const field = fieldPath.split('.').reduce(
        (foundField, key) => {
            if (foundField === null) {
                return null;
            }
            const { fields: subFields = [], items = null } = foundField;
            if (items !== null && key.match(/^[0-9]+$/)) {
                const it = { ...items, name: fieldPath };
                return it;
            }
            return subFields.find(it => it.name === key) || null;
        },
        { fields },
    );

    const fieldValue = get(value, fieldPath, null);

    const onFieldChange = useCallback(
        newFieldValue => {
            // const { name, fields: subFields = null } = field || {};
            const newValue = setValue(
                value,
                fieldPath.split('.'),
                newFieldValue,
                // field === null || subFields !== null ? newFieldValue : newFieldValue[name],
            );
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [field, value, fieldPath, onChange],
    );

    const closeForm = useCallback(() => closeFieldForm(fieldPath, form), [
        fieldPath,
        form,
        closeFieldForm,
    ]);

    const contextFormComponents = useFormsComponents();
    const finalFormComponents = formComponents || contextFormComponents;
    const contextFieldComponents = useFieldsComponents();
    const finalFieldComponents = fieldComponents || contextFieldComponents;
    const FormComponent =
        form !== null
            ? getComponentFromName(form, finalFormComponents)
            : getComponentFromName(field.type, finalFieldComponents);

    return FormComponent !== null ? (
        <FormComponent
            {...field}
            isForm
            field={fieldPath}
            className={className}
            value={fieldValue}
            onChange={onFieldChange}
            gotoFieldForm={gotoFieldForm}
            closeFieldForm={closeFieldForm}
            closeForm={closeForm}
        />
    ) : null;
};

FieldForm.propTypes = propTypes;
FieldForm.defaultProps = defaultProps;

export default FieldForm;
