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
    dateFormat: 'HH:mm',
};

const TimeField = ({ dateFormat, ...props }) => {
    return <DateTime withoutDate dateFormat={dateFormat} {...props} />;
};

TimeField.propTypes = propTypes;
TimeField.defaultProps = defaultProps;

export default TimeField;
