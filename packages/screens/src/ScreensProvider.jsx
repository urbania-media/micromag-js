/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentsProvider } from '@micromag/core/contexts';
import { SCREENS_NAMESPACE } from '@micromag/core/components';

import * as ScreenComponents from './all';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

const ScreensProvider = props => (
    <ComponentsProvider namespace={SCREENS_NAMESPACE} components={ScreenComponents} {...props} />
);

ScreensProvider.propTypes = propTypes;
ScreensProvider.defaultProps = defaultProps;

export default ScreensProvider;
