/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import Stack from './Stack';

const propTypes = {};

const defaultProps = {};

const VStack = props => <Stack {...props} direction="vertical" />;

VStack.propTypes = propTypes;
VStack.defaultProps = defaultProps;

export default VStack;
