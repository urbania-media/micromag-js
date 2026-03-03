/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ElementField from './Element';

interface ElementListProps {
    [key: string]: unknown;
}

const ElementList = props => <ElementField isList {...props} />;

export default ElementList;
