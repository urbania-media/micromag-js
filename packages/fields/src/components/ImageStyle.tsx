/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface ImageStyleFieldProps {
    [key: string]: unknown;
}

const ImageStyleField = props => <Fields isList {...props} />;

export default ImageStyleField;
