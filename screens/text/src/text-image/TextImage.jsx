/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Text from '../Text';

const TextImage = props => <Text {...props} fields={['text', 'image']} />;

export default TextImage;
