/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import Stack from './Stack';

const propTypes = {};

const defaultProps = {};

const HStack = props => <Stack {...props} direction="horizontal" />;

HStack.propTypes = propTypes;
HStack.defaultProps = defaultProps;

export default HStack;
