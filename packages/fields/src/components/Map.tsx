/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface MapFieldProps {
    [key: string]: unknown;
}

const MapField = props => <Fields {...props} />;

export default MapField;
