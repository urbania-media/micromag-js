/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ElementField from './Element';

interface ElementListProps {
    [key: string]: unknown;
}

function ElementList(props: ElementListProps) {
    return <ElementField isList {...props} />;
}

export default ElementList;
