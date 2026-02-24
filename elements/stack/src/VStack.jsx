/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Stack from './Stack';

const propTypes = {};

function VStack(props) {
    return <Stack {...props} direction="vertical" />;
}

VStack.propTypes = propTypes;

export default VStack;
