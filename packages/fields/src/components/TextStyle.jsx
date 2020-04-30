/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const TextStyleField = props => <Fields isList {...props} />;

TextStyleField.propTypes = propTypes;
TextStyleField.defaultProps = defaultProps;

export default TextStyleField;
