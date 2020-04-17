/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentsProvider } from '@micromag/core/contexts';
import { FORMS_NAMESPACE } from '@micromag/core/components';

import * as FormsComponents from './index';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const FormsProvider = props => (
    <ComponentsProvider namespace={FORMS_NAMESPACE} components={FormsComponents} {...props} />
);

FormsProvider.propTypes = propTypes;
FormsProvider.defaultProps = defaultProps;

export default FormsProvider;
