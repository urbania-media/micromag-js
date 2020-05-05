/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const MarkerField = props => <Fields isList {...props} />;

MarkerField.propTypes = propTypes;
MarkerField.defaultProps = defaultProps;

export default MarkerField;
