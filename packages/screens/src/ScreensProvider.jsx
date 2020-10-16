/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreensProvider as BaseScreensProvider } from '@micromag/core/contexts';

import allScreens from './all';

const propTypes = {
    children: PropTypes.node.isRequired,
    screens: MicromagPropTypes.screenDefinitions,
};

const defaultProps = {
    screens: allScreens,
};

const ScreensProvider = ({ screens, children }) => (
    <BaseScreensProvider screens={screens}>{children}</BaseScreensProvider>
);

ScreensProvider.propTypes = propTypes;
ScreensProvider.defaultProps = defaultProps;

export default ScreensProvider;
