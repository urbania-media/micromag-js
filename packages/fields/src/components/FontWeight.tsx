/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Slider from './Slider';

import styles from '../styles/border-width.module.css';

interface FontWeightProps {
    value?: string | null;
    sizes?: number[];
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900];

function FontWeight({
    value = null,
    sizes = defaultSizes,
    className = null,
    onChange = null,
}: FontWeightProps) {
    return (
        <Slider
            value={value}
            min={sizes[0]}
            max={sizes[sizes.length - 1]}
            marks={sizes}
            marksStep={100}
            className={classNames([
                styles.container,
                className,
            ])}
            onChange={onChange}
        />
    );
}

export default FontWeight;
