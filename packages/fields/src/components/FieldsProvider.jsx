/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentsProvider, FIELDS_NAMESPACE } from '@micromag/core/contexts';

import * as FieldsComponents from './index';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const FieldsProvider = props => (
    <ComponentsProvider namespace={FIELDS_NAMESPACE} components={FieldsComponents} {...props} />
);

FieldsProvider.propTypes = propTypes;
FieldsProvider.defaultProps = defaultProps;

export default FieldsProvider;
