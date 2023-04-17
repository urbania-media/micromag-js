/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    layout: MicromagPropTypes.gridLayout,
    items: PropTypes.arrayOf(PropTypes.node),
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: PropTypes.number,
    vertical: PropTypes.bool,
    className: PropTypes.string,
    axisClassName: PropTypes.string,
    crossClassName: PropTypes.string,
};

const defaultProps = {
    layout: null,
    items: [],
    width: null,
    height: null,
    spacing: 0,
    vertical: false,
    className: null,
    axisClassName: null,
    crossClassName: null,
};

function Grid({
    items,
    layout,
    width,
    height,
    spacing,
    vertical,
    className,
    axisClassName,
    crossClassName,
}) {
    let itemIndex = 0;
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
                                {
                                    [crossClassName]: crossClassName !== null,
                                },
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
                                            {
                                                [axisClassName]: axisClassName !== null,
                                            },
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

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
