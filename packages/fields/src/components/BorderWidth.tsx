/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import Slider from './Slider';

import styles from '../styles/border-width.module.css';

interface BorderWidthProps {
    value?: string;
    sizes?: number[];
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

const BorderWidth = ({ value = null, sizes = [1, 2, 4, 8, 10, 14, 20], className = null, onChange = null }) => (
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

export default BorderWidth;
