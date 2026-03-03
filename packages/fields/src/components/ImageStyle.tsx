/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface ImageStyleFieldProps {
    [key: string]: unknown;
}

function ImageStyleField(props) {
    return <Fields isList {...props} />;
}

export default ImageStyleField;
