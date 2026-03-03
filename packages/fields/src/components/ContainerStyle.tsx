/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

interface ContainerStyleFieldProps {
    [key: string]: unknown;
}

const ContainerStyleField = props => <Fields isList {...props} />;

export default ContainerStyleField;
