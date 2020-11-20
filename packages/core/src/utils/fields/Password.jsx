/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

// import * as AppPropTypes from '../../../lib/PropTypes';
import TextField from './Text';

const propTypes = {};

const defaultProps = {};

const PasswordField = (props) => {
    return <TextField {...props} type="password" />;
};

PasswordField.propTypes = propTypes;
PasswordField.defaultProps = defaultProps;

export default PasswordField;
