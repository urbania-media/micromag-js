import classNames from 'classnames';
import isArray from 'lodash-es/isArray';
import Slider from 'rc-slider';
import { useCallback, useMemo } from 'react';

import Text from './Text';

import 'rc-slider/assets/index.css';

import styles from '../styles/slider.module.css';

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

export interface SliderFieldProps {
    value?: string | null;
    min?: number;
    max?: number;
    marks?: Record<string, Record<string, unknown>>;
    marksStep?: number | null;
    marksCount?: number | null;
    marksStyle?: Record<string, unknown>;
    unit?: string | null;
    withInput?: boolean;
    disabled?: boolean;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function SliderField({
    value = null,
    min = 0,
    max = 100,
    marks = undefined,
    marksStep = null,
    marksCount = null,

    marksStyle = {
        fontSize: 8,
    },

    unit = null,
    withInput = false,
    className = null,
    disabled = false,
    onChange = null,
}: SliderFieldProps) {
    const customOnChange = useCallback(
        (val) => {
            if (onChange !== null) {
                onChange(val);
                // onChange(parseInt(val, 10));
            }
        },
        [onChange],
    );

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
    return (
        <div
            className={classNames([
                'd-flex align-items-center w-100 no-selection',
                styles.container,
                {
                    'text-muted': disabled,
                },
                className,
            ])}
        >
            <div className="w-100 px-2 flex-grow-1">
                <Slider
                    value={value !== null ? value : 0}
                    min={min}
                    max={max}
                    disabled={disabled}
                    marks={finalMarks}
                    onChange={customOnChange}
                />
            </div>
            {withInput ? (
                <>
                    <Text
                        type="number"
                        value={value}
                        disabled={disabled}
                        className="w-auto"
                        size={4}
                        onChange={customOnChange}
                    />
                    {unit !== null ? <div className="ms-2 small">{unit}</div> : null}
                </>
            ) : null}
        </div>
    );
}

export default SliderField;
