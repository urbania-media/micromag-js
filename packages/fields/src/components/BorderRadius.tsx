/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import Slider from './Slider';

import styles from '../styles/border-width.module.css';

interface BorderRadiusProps {
    value?: string;
    sizes?: number[];
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function BorderRadius(
    { value = null, sizes = [0, 2, 6, 10, 20, 30], className = null, onChange = null },
) {
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
