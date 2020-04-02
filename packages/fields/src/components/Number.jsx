/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    floatStep: PropTypes.number,
    float: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    min: null,
    max: null,
    step: 1,
    floatStep: 0.1,
    float: false,
    className: null,
    onChange: null,
};

const NumberField = ({ value, min, max, step, floatStep, float, className, onChange }) => (
    <input
        type="number"
        className={classNames([
            'form-control',
            {
                [className]: className !== null,
            },
        ])}
        value={value || ''}
        min={min}
        max={max}
        step={float ? floatStep : step}
        onChange={e => {
            const newValue = e.currentTarget.value;
            let parsedValue = null;
            if (newValue.length > 0) {
                parsedValue = float ? parseFloat(newValue) : parseInt(newValue, 10);
            }
            if (onChange !== null) {
                onChange(parsedValue);
            }
        }}
    />
);

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;

export default NumberField;
