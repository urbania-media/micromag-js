/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Stack from './Stack';

const propTypes = {};

const defaultProps = {};

function VStack(props) {
    return <Stack {...props} direction="vertical" />;
}

VStack.propTypes = propTypes;
VStack.defaultProps = defaultProps;

export default VStack;
