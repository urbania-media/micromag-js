/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useFormsComponents } from '@micromag/core/contexts';

const propTypes = {
    form: PropTypes.string,
    field: MicromagPropTypes.field,
    formProps: PropTypes.object, // eslint-disable-line
};

const defaultProps = {
    form: null,
    field: [],
    formProps: {},
};

const FormsFieldForm = ({ form, formProps, field }) => {
    // Use specific form component
    const formComponents = useFormsComponents();
    if (form !== null) {
        const FormComponent = getComponentFromName(form, formComponents);
        return FormComponent !== null ? <FormComponent field={field} {...formProps} /> : null;
    }

    return null;
};

FormsFieldForm.propTypes = propTypes;
FormsFieldForm.defaultProps = defaultProps;

export default FormsFieldForm;
