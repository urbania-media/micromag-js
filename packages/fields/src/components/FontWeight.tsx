/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import styles from '../styles/border-width.module.css';
import Slider from './Slider';

interface FontWeightProps {
    value?: string;
    sizes?: number[];
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function FontWeight(
    { value = null, sizes = [100, 200, 300, 400, 500, 600, 700, 800, 900], className = null, onChange = null },
) {
    return (
        <Slider
            value={value}
            min={sizes[0]}
            max={sizes[sizes.length - 1]}
            marks={sizes}
            marksStep={100}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            onChange={onChange}
        />
    );
}

export default FontWeight;
