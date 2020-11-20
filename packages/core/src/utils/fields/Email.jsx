/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

// import * as AppPropTypes from '../../../lib/PropTypes';
import TextField from './Text';

const propTypes = {};

const defaultProps = {};

const EmailField = (props) => {
    return <TextField {...props} type="email" />;
};

EmailField.propTypes = propTypes;
EmailField.defaultProps = defaultProps;

export default EmailField;
