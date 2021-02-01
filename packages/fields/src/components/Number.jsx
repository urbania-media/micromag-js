/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    size: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    floatStep: PropTypes.number,
    float: PropTypes.bool,
    dataList: PropTypes.arrayOf(PropTypes.number),
    isHorizontal: PropTypes.bool,
    autoComplete: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    size: null,
    min: null,
    max: null,
    step: 1,
    floatStep: 0.1,
    float: false,
    dataList: null,
    isHorizontal: false,
    autoComplete: false,
    className: null,
    onChange: null,
};

const NumberField = ({
    name,
    value,
    size,
    min,
    max,
    step,
    floatStep,
    float,
    dataList,
    isHorizontal,
    autoComplete,
    className,
    onChange,
}) => {
    const dataListId = useMemo(
        () => (dataList !== null ? `${name}-${new Date().getTime()}` : null),
        [dataList, name],
    );
    return (
        <>
            <input
                type="number"
                className={classNames([
                    'form-control',
                    {
                        'w-auto': size !== null,
                        'ml-auto': isHorizontal,
                        [className]: className !== null,
                    },
                ])}
                value={value || ''}
                min={min}
                max={max}
                size={size}
                step={float ? floatStep : step}
                list={dataListId}
                autoComplete={autoComplete ? 'on' : 'off'}
                onChange={(e) => {
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
            {dataList !== null ? (
                <datalist id={dataListId}>
                    {dataList.map((dataListValue) => (
                        <option key={`data-list-${dataListValue}`} value={dataListValue} />
                    ))}
                </datalist>
            ) : null}
        </>
    );
};

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;

export default NumberField;
