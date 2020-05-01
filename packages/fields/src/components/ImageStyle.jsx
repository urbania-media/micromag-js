/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const ImageStyleField = props => <Fields isList {...props} />;

ImageStyleField.propTypes = propTypes;
ImageStyleField.defaultProps = defaultProps;

export default ImageStyleField;
