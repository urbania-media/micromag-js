/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const ContainerStyleField = props => <Fields isList {...props} />;

ContainerStyleField.propTypes = propTypes;

export default ContainerStyleField;
