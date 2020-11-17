/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useFormsComponents, useScreenDefinition, useFieldsManager } from '@micromag/core/contexts';

import setValue from '../../utils/setFieldValue';
import getFieldFromPath from '../../utils/getFieldFromPath';

const propTypes = {
    name: PropTypes.string.isRequired,
    value: MicromagPropTypes.component,
    form: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
};

const defaultProps = {
    form: null,
    value: null,
    className: null,
    onChange: null,
};

const FieldForm = ({ name, value, form, className, onChange, gotoFieldForm, closeFieldForm }) => {
    const fieldsManager = useFieldsManager();
    const { fields = [] } = useScreenDefinition();
    const field = getFieldFromPath(name.split('.'), fields, fieldsManager);
    const { type = null } = field;
    const { component: fieldComponent = null, id, settings, ...fieldProps } = (type !== null
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

    const formComponents = useFormsComponents();
    const FormComponent =
        form !== null ? getComponentFromName(form, formComponents) : fieldComponent;

    return FormComponent !== null ? (
        <FormComponent
            {...fieldProps}
            isForm
            name={name}
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
