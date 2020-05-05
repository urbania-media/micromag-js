/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const BorderStyleField = props => <Fields isList {...props} />;

BorderStyleField.propTypes = propTypes;
BorderStyleField.defaultProps = defaultProps;

export default BorderStyleField;
