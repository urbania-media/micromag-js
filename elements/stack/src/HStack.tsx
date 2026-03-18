import React from 'react';

import Stack from './Stack';

interface HStackProps {
    [key: string]: unknown;
}

function HStack(props: HStackProps) {
    return <Stack {...props} direction="horizontal" />;
}

export default HStack;
