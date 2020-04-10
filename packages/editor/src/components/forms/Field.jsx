/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useFormsComponents } from '@micromag/core/contexts';

import getFieldsFromScreenType from '../../utils/getFieldsFromScreenType';
import setValue from '../../utils/setFieldValue';

const propTypes = {
    value: MicromagPropTypes.component,
    field: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func.isRequired,
    formComponents: MicromagPropTypes.components,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    formComponents: null,
};

const FieldForm = ({
    value,
    field: fieldPath,
    form,
    className,
    onChange,
    gotoFieldForm,
    formComponents,
}) => {
    const contextFormComponents = useFormsComponents();
    const finalFormComponents = formComponents || contextFormComponents;
    const { type, layout } = value;
    const fields = useMemo(
        () =>
            getFieldsFromScreenType(type, {
                layout,
            }),
        [type, layout],
    );

    const field = fieldPath
        .split('.')
        .reduce(
            (foundField, key) =>
                foundField !== null
                    ? (foundField.fields || []).find(it => it.name === key) || null
                    : foundField,
            { fields },
        );

    const fieldValue = get(value, fieldPath, null);

    const onFieldChange = useCallback(
        newFieldValue => {
            const { name, fields: subFields = null } = field || {};
            const newValue = setValue(
                value,
                fieldPath.split('.'),
                field === null || subFields !== null ? newFieldValue : newFieldValue[name],
            );
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [field, value, fieldPath, onChange],
    );

    const FormComponent = getComponentFromName(form, finalFormComponents);

    return FormComponent !== null ? (
        <FormComponent
            {...field}
            field={fieldPath}
            className={className}
            value={fieldValue}
            onChange={onFieldChange}
            gotoFieldForm={gotoFieldForm}
        />
    ) : null;
};

FieldForm.propTypes = propTypes;
FieldForm.defaultProps = defaultProps;

export default FieldForm;
