/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import TextField from './Text';

const propTypes = {};

const defaultProps = {};

const PasswordField = props => <TextField type="password" {...props} />;

PasswordField.propTypes = propTypes;
PasswordField.defaultProps = defaultProps;

export default PasswordField;
