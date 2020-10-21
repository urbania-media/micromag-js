/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Text from './Text';

const TextTitle = ({ ...props }) => (
    <Text
        {...props}
        withTitle
    />
);

export default TextTitle;
