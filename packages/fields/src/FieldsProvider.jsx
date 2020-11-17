/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FieldsProvider as BaseFieldsProvider } from '@micromag/core/contexts';

import manager from './manager';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

const FieldsProvider = ({ children }) => (
    <BaseFieldsProvider manager={manager}>{children}</BaseFieldsProvider>
);

FieldsProvider.propTypes = propTypes;
FieldsProvider.defaultProps = defaultProps;

export default FieldsProvider;
