/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ScreensProvider as BaseScreensProvider } from '@micromag/core/contexts';

import manager from './manager';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

const ScreensProvider = ({ children }) => (
    <BaseScreensProvider manager={manager}>{children}</BaseScreensProvider>
);

ScreensProvider.propTypes = propTypes;
ScreensProvider.defaultProps = defaultProps;

export default ScreensProvider;
