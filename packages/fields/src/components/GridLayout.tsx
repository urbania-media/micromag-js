/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { GridLayout as GridLayoutType } from '@micromag/core';
import { getGridLayoutName } from '@micromag/core/utils';
import Grid from '@micromag/element-grid';

import Radios from './Radios';

import styles from '../styles/grid-layout.module.css';

const emptyArray: never[] = [];

interface GridLayoutProps {
    grids?: GridLayoutType[];
    value?: { rows?: number; columns?: number[] }[] | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function GridLayout({
    grids = emptyArray,
    value = null,
    className = null,
    onChange = null,
}: GridLayoutProps) {
    return (
        <Radios
            options={grids.map((layout) => ({
                value: layout,
                label: (
                    <Grid layout={layout} className={styles.grid} columnClassName={styles.column} />
                ),
            }))}
            value={
                value !== null
                    ? grids.find((it) => getGridLayoutName(it) === getGridLayoutName(value)) || null
                    : null
            }
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            buttonClassName={styles.button}
            onChange={onChange}
        />
    );
}

export default GridLayout;
