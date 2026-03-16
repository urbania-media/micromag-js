/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface MapFieldProps {
    [key: string]: unknown;
}

function MapField(props: MapFieldProps) {
    return <Fields {...props} />;
}

export default MapField;
