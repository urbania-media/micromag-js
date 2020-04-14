/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentsProvider } from '@micromag/core/contexts';
import { ELEMENTS_NAMESPACE } from '@micromag/core/components';

import * as ElementComponents from './all';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const ElementsProvider = props => (
    <ComponentsProvider namespace={ELEMENTS_NAMESPACE} components={ElementComponents} {...props} />
);

ElementsProvider.propTypes = propTypes;
ElementsProvider.defaultProps = defaultProps;

export default ElementsProvider;
