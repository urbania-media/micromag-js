/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import * as AppPropTypes from '../../lib/PropTypes';
import Number from './Number';
import InputGroup from './InputGroup';

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

const Spacing = ({ value, className, onChange }) => (
    <InputGroup append="px">
        <Number value={value} min={0} max={20} className={className} onChange={onChange} />
    </InputGroup>
);

Spacing.propTypes = propTypes;
Spacing.defaultProps = defaultProps;

export default Spacing;
