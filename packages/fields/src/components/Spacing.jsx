/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import InputGroup from './InputGroup';
import Number from './Number';

const propTypes = {
    value: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const Spacing = ({ value = null, className = null, onChange = null, ...props }) => (
    <InputGroup className={className} append="px">
        <Number value={value} min={0} max={20} onChange={onChange} {...props} />
    </InputGroup>
);

Spacing.propTypes = propTypes;

export default Spacing;
