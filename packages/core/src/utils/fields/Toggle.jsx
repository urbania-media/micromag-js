/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import Switch from 'rc-switch';

// import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    className: null,
    onChange: null,
};

const ToggleField = ({ name, value, onChange, className }) => {
    return (
        <Switch
            name={name}
            checked={value || false}
            onChange={onChange}
            className={className}
        />
    );
};

ToggleField.propTypes = propTypes;
ToggleField.defaultProps = defaultProps;

export default ToggleField;
