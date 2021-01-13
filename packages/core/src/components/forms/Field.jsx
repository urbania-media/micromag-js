/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import * as MicromagPropTypes from '../../PropTypes';
import { getComponentFromName } from '../../utils';
import { useFieldsManager } from '../../contexts';

import setValue from '../../utils/setFieldValue';
import getFieldFromPath from '../../utils/getFieldFromPath';

const propTypes = {
    name: PropTypes.string.isRequired,
    value: MicromagPropTypes.component,
    form: PropTypes.string,
    formComponents: MicromagPropTypes.components,
    fields: MicromagPropTypes.fields,
    className: PropTypes.string,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
};

const defaultProps = {
    form: null,
    formComponents: {},
    fields: [],
    value: null,
    className: null,
    onChange: null,
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
}) => {
    const fieldsManager = useFieldsManager();

    const field = getFieldFromPath(name.split('.'), fields, fieldsManager);

    const { type = null } = field;
    const { component: FieldComponent = null, id, settings, ...fieldProps } = (type !== null
        ? fieldsManager.getDefinition(type) || null
        : null) || {
        ...field,
    };

    const fieldValue = get(value, name, null);

    const onFieldChange = useCallback(
        (newFieldValue) => {
            // const { name, fields: subFields = null } = field || {};
            const newValue = setValue(
                value,
                name.split('.'),
                newFieldValue,
                // field === null || subFields !== null ? newFieldValue : newFieldValue[name],
            );
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, name, onChange],
    );

    const closeForm = useCallback(() => closeFieldForm(name, form), [name, form, closeFieldForm]);

    const formProps = {
        name,
        value: fieldValue,
        onChange: onFieldChange,
        gotoFieldForm,
        closeFieldForm,
        closeForm,
        className,
    };

    if (form !== null) {
        const FormComponent = getComponentFromName(form, formComponents);
        return FormComponent !== null ? <FormComponent field={field} {...formProps} /> : null;
    }

    // Use field component with isForm props
    return FieldComponent !== null ? (
        <FieldComponent {...fieldProps} isForm {...formProps} />
    ) : null;
};

FieldForm.propTypes = propTypes;
FieldForm.defaultProps = defaultProps;

export default FieldForm;
