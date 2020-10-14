/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Stack from './Stack';

const propTypes = {
    direction: PropTypes.string,
};

const defaultProps = {
    direction: 'vertical',
};

const VStack = ({ direction, ...props }) => {
    return <Stack {...props} direction={direction} />;
};

VStack.propTypes = propTypes;
VStack.defaultProps = defaultProps;

export default VStack;
