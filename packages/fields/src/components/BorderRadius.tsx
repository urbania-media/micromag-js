/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Slider from './Slider';

import styles from '../styles/border-width.module.css';

interface BorderRadiusProps {
    value?: string | null;
    sizes?: number[];
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function BorderRadius({
    value = null,
    sizes = [0, 2, 6, 10, 20, 30],
    className = null,
    onChange = null,
}: BorderRadiusProps) {
    return (
        <Slider
            value={value}
            min={sizes[0]}
            max={sizes[sizes.length - 1]}
            marks={sizes}
            withInput
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

export default BorderRadius;
