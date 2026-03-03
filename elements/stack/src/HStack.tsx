/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Stack from './Stack';

interface HStackProps {
    [key: string]: unknown;
}

function HStack(props) {
    return <Stack {...props} direction="horizontal" />;
}

export default HStack;
