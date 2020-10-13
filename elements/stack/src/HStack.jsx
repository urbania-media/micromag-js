/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Stack from './Stack';

const propTypes = {
    direction: PropTypes.string,
};

const defaultProps = {
    direction: 'horizontal',
};

const HStack = ({ direction, ...props }) => {
    return <Stack {...props} direction={direction} />;
};

HStack.propTypes = propTypes;
HStack.defaultProps = defaultProps;

export default HStack;
