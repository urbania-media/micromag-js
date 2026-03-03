/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Stack from './Stack';

interface VStackProps {
    [key: string]: unknown;
}

function VStack(props) {
    return <Stack {...props} direction="vertical" />;
}

export default VStack;
