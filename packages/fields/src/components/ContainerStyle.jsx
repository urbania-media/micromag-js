/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const ContainerStyleField = props => <Fields isList {...props} />;

ContainerStyleField.propTypes = propTypes;
ContainerStyleField.defaultProps = defaultProps;

export default ContainerStyleField;
