/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

// import * as AppPropTypes from '../../../lib/PropTypes';
import DateTime from './DateTime';

const propTypes = {
    dateFormat: PropTypes.string,
};

const defaultProps = {
    dateFormat: 'yyyy-MM-dd',
};

const DateTimeField = ({ dateFormat, ...props }) => {
    return <DateTime withoutTime dateFormat={dateFormat} {...props} />;
};

DateTimeField.propTypes = propTypes;
DateTimeField.defaultProps = defaultProps;

export default DateTimeField;
