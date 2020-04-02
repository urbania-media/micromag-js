/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import * as AppPropTypes from '../../lib/PropTypes';
import Select from './Select';

const propTypes = {
    fonts: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    fonts: ['Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman'],
    value: null,
    className: null,
    onChange: null,
};

const FontFamily = ({ fonts, value, className, onChange }) => (
    <Select options={fonts} value={value} className={className} onChange={onChange} />
);

FontFamily.propTypes = propTypes;
FontFamily.defaultProps = defaultProps;

export default FontFamily;
