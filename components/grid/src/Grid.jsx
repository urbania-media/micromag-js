/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    layout: MicromagPropTypes.gridLayout,
    items: PropTypes.arrayOf(PropTypes.node),
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: PropTypes.number,
    reverse: PropTypes.bool,
    withSmallSpacing: PropTypes.bool,
    className: PropTypes.string,
    rowClassName: PropTypes.string,
    columnClassName: PropTypes.string,
};

const defaultProps = {
    layout: [
        {
            rows: 2,
            columns: [1],
        },
        {
            rows: 1,
            columns: [1, 1, 1],
        },
    ],
    items: [],
    width: null,
    height: null,
    spacing: 0,
    reverse: false,
    withSmallSpacing: false,
    className: null,
    rowClassName: null,
    columnClassName: null,
};

const Grid = ({
    items: itemList,
    layout,
    width,
    height,
    spacing: defaultSpacing,
    reverse,
    withSmallSpacing,
    className,
    rowClassName,
    columnClassName,
}) => {
    const items = reverse && itemList ? itemList.reverse() : itemList;
    const spacing = withSmallSpacing ? 5 : defaultSpacing;
    let itemIndex = 0;
    const finalLayout = layout || [
        {
            rows: 1,
            columns: items.map(() => 1),
        },
    ];
    const rowTotal = finalLayout.reduce((total, { rows = 1 }) => total + rows, 0);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width,
                height,
                padding: spacing !== null && spacing > 0 ? spacing / 2 : null,
            }}
        >
            <div className={styles.items}>
                {finalLayout.map(({ rows, columns = [] }, rowIndex) => {
                    const finalColumns = isArray(columns) ? columns : [columns];
                    const columnTotal = finalColumns.reduce((total, it) => total + it, 0);
                    return (
                        <div
                            key={`row-${rowIndex}`}
                            className={classNames([
                                styles.row,
                                {
                                    [rowClassName]: rowClassName !== null,
                                },
                            ])}
                            style={{
                                height: `${100 * (rows / rowTotal)}%`,
                            }}
                        >
                            {finalColumns.map((column, columnIndex) => {
                                const item = items[itemIndex];
                                itemIndex += 1;
                                return (
                                    <div
                                        key={`row-${rowIndex}-${columnIndex}`}
                                        className={classNames([
                                            styles.column,
                                            {
                                                [columnClassName]: columnClassName !== null,
                                            },
                                        ])}
                                        style={{
                                            width: `${100 * (column / columnTotal)}%`,
                                            padding:
                                                spacing !== null && spacing > 0
                                                    ? spacing / 2
                                                    : null,
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
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
