/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useScreenDefinition, useFormsComponents } from '@micromag/core/contexts';

import { FieldForm } from '@micromag/core/components';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const FieldWithFieldsAndForms = (props) => {
    // Get definitions
    const { fields = [] } = useScreenDefinition();
    // To use a specific form component
    const formComponents = useFormsComponents();
    return <FieldForm fields={fields} formComponents={formComponents} {...props} />;
};

FieldWithFieldsAndForms.propTypes = propTypes;
FieldWithFieldsAndForms.defaultProps = defaultProps;

export default FieldWithFieldsAndForms;
