/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import TextField from './Text';

const propTypes = {

};

const defaultProps = {

};

const EmailField = (props) => (
    <TextField type="email" {...props} />
);

EmailField.propTypes = propTypes;
EmailField.defaultProps = defaultProps;

export default EmailField;
