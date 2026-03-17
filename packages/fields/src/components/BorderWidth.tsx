/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Slider from './Slider';

import styles from '../styles/border-width.module.css';

interface BorderWidthProps {
    value?: string | null;
    sizes?: number[];
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultSizes = [1, 2, 4, 8, 10, 14, 20];

function BorderWidth({
    value = null,
    sizes = defaultSizes,
    className = null,
    onChange = null,
}: BorderWidthProps) {
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

export default BorderWidth;
