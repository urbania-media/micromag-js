/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import React from 'react';

import type { GridLayout } from '@micromag/core';

import styles from './styles.module.css';

interface GridProps {
    layout?: GridLayout | null;
    items?: React.ReactNode[] | null;
    width?: number | null;
    height?: number | null;
    spacing?: number;
    vertical?: boolean;
    className?: string | null;
    axisClassName?: string | null;
    crossClassName?: string | null;
}

function Grid({
    items: initialItems = null,
    layout = null,
    width = null,
    height = null,
    spacing = 0,
    vertical = false,
    className = null,
    axisClassName = null,
    crossClassName = null,
}: GridProps) {
    let itemIndex = 0;
    const items = initialItems || [];
    const finalLayout = isArray(layout)
        ? layout
        : [
              {
                  rows: vertical ? items.map(() => 1) : 1,
                  columns: vertical ? 1 : items.map(() => 1),
              },
          ];

    const crossTotal = finalLayout.reduce(
        (total, { rows = 1, columns = 1 }) => total + (vertical ? columns : rows),
        0,
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
            style={{
                width,
                height,
                padding: spacing !== null && spacing > 0 ? spacing / 2 : null,
            }}
        >
            <div
                className={styles.items}
                style={{
                    flexDirection: vertical ? 'row' : 'column',
                }}
            >
                {finalLayout.map(({ rows, columns }, crossIndex) => {
                    const crossSizeRatio = (vertical ? columns : rows) / crossTotal;
                    const crossSize = `${100 * crossSizeRatio}%`;
                    const axisItems = vertical ? rows : columns;
                    const finalAxisItems = isArray(axisItems) ? axisItems : [axisItems];
                    const axisTotal = finalAxisItems.reduce((total, it) => total + it, 0);

                    return (
                        <div
                            key={`cross-${crossIndex}`}
                            className={classNames([
                                styles.cross,
                                crossClassName,
                            ])}
                            style={{
                                flexDirection: vertical ? 'column' : 'row',
                                width: vertical ? crossSize : null,
                                height: vertical ? null : crossSize,
                            }}
                        >
                            {finalAxisItems.map((axisItem, axisIndex) => {
                                const axisSizeRatio = axisItem / axisTotal;
                                const axisSize = `${100 * axisSizeRatio}%`;
                                const item = items[itemIndex];
                                itemIndex += 1;
                                return (
                                    <div
                                        key={`axis-${axisIndex}`}
                                        className={classNames([
                                            styles.axis,
                                            axisClassName,
                                        ])}
                                        style={{
                                            width: vertical ? null : axisSize,
                                            height: vertical ? axisSize : null,
                                            padding: spacing > 0 ? spacing / 2 : 0,
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Grid;
