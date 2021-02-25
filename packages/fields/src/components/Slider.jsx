/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import classNames from 'classnames';
import Slider from 'rc-slider';

// import * as AppPropTypes from '../../lib/PropTypes';
import Text from './Text';

import styles from '../styles/slider.module.scss';

// const roundEven = value => 2 * Math.round(value / 2);

const rangeFromMinMax = (min, max, count, step) =>
    [...Array(count).keys()].reduce(
        (values, key) => {
            const lastValue = values[values.length - 1];
            return [...values, key === count - 1 ? max : lastValue + step];
        },
        [min],
    );

const rangeFromStep = (min, max, step) => {
    const count = Math.round(Math.abs(max - min) / step) + 1;
    return rangeFromMinMax(min, max, count, step);
};

const rangeFromCount = (min, max, count) => {
    const finalCount = count;
    const step = Math.abs(max - min) / finalCount;
    return rangeFromMinMax(min, max, finalCount, step);
};

const generateSteps = (steps, style) =>
    steps.reduce(
        (map, step) => ({
            ...map,
            [step]: {
                style,
                label: `${step}`,
            },
        }),
        {},
    );

const propTypes = {
    value: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    marks: PropTypes.objectOf(PropTypes.object),
    marksStep: PropTypes.number,
    marksCount: PropTypes.number,
    marksStyle: PropTypes.object, // eslint-disable-line
    unit: PropTypes.string,
    withInput: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    min: 0,
    max: 100,
    marks: undefined,
    marksStep: null,
    marksCount: null,
    marksStyle: {
        fontSize: 8,
    },
    unit: null,
    withInput: false,
    className: null,
    onChange: null,
};

const SliderField = ({
    value,
    min,
    max,
    marks,
    marksStep,
    marksCount,
    marksStyle,
    unit,
    withInput,
    className,
    onChange,
}) => {


    const customOnChange = useCallback( val => {
        if (onChange !== null) {
            onChange(val);
            // onChange(parseInt(val, 10));
        }
    }, [onChange]);

    const finalMarks = useMemo(
        () =>
            (isArray(marks) ? generateSteps(marks, marksStyle) : marks) ||
            (marksStep !== null
                ? generateSteps(rangeFromStep(min, max, marksStep), marksStyle)
                : null) ||
            (marksCount !== null
                ? generateSteps(rangeFromCount(min, max, marksCount), marksStyle)
                : null) ||
            undefined,
        [min, max, marks, marksStep, marksCount, marksStyle],
    );
    const slider = (
        <div className={styles.slider}>
            <Slider
                value={value !== null ? value : 0}
                min={min}
                max={max}
                marks={finalMarks}
                onChange={customOnChange}
            />
        </div>
    );
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withInput]: withInput,
                    [className]: className !== null,
                },
            ])}
        >
            {withInput ? (
                <div className="row align-items-center no-gutters">
                    <div className="col">{slider}</div>
                    <div className="col-auto">
                        <Text
                            type="number"
                            value={value}
                            onChange={customOnChange}
                            className={styles.input}
                        />
                    </div>
                    {unit !== null ? (
                        <div className={classNames(['col-auto', styles.unit])}>{unit}</div>
                    ) : null}
                </div>
            ) : (
                slider
            )}
        </div>
    );
};

SliderField.propTypes = propTypes;
SliderField.defaultProps = defaultProps;

export default SliderField;
