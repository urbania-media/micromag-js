/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const ImageStyleField = props => <Fields isList {...props} />;

ImageStyleField.propTypes = propTypes;

export default ImageStyleField;
