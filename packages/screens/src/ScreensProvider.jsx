/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentsProvider } from '@micromag/core/contexts';
import { SCREENS_NAMESPACE } from '@micromag/core/components';

import screens from './all';

const propTypes = {
    children: PropTypes.node,
    components: PropTypes.objectOf(PropTypes.elementType),
};

const defaultProps = {
    children: null,
    components: screens.map(({ component }) => component),
};

const ScreensProvider = ({ components, ...props }) => (
    <ComponentsProvider namespace={SCREENS_NAMESPACE} components={components} {...props} />
);

ScreensProvider.propTypes = propTypes;
ScreensProvider.defaultProps = defaultProps;

export default ScreensProvider;
