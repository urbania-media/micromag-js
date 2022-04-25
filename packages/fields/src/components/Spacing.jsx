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

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const Spacing = ({ value, className, onChange, ...props }) => (
    <InputGroup className={className} append="px">
        <Number value={value} min={0} max={20} onChange={onChange} {...props} />
    </InputGroup>
);

Spacing.propTypes = propTypes;
Spacing.defaultProps = defaultProps;

export default Spacing;
