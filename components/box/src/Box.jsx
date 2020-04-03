/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pascalCase } from 'change-case';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    direction: MicromagPropTypes.flexDirection,
    axisAlign: MicromagPropTypes.axisAlign,
    crossAlign: MicromagPropTypes.crossAlign,
    items: PropTypes.arrayOf(PropTypes.node),
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: PropTypes.number,
    wrap: PropTypes.bool,
    reverse: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    indexClassNames: PropTypes.object, // eslint-disable-line
};

const defaultProps = {
    direction: null,
    axisAlign: null,
    crossAlign: null,
    items: [],
    width: null,
    height: null,
    spacing: 0,
    wrap: false,
    reverse: false,
    className: null,
    itemClassName: null,
    indexClassNames: {},
};

const Box = ({
    direction,
    axisAlign,
    crossAlign,
    items,
    width,
    height,
    spacing,
    wrap,
    reverse,
    className,
    itemClassName,
    indexClassNames,
}) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[direction]]: direction !== null,
                    [styles.wrap]: wrap === true,
                    [styles.reverse]: reverse === true,
                    [styles[`axis${pascalCase(axisAlign || '')}`]]: axisAlign !== null,
                    [styles[`cross${pascalCase(crossAlign || '')}`]]: crossAlign !== null,
                    [className]: className !== null,
                },
            ])}
            style={{
                width,
                height,
                padding: spacing !== null && spacing > 0 ? spacing / 2 : null,
            }}
        >
            {items.map((item, index) => {
                return (
                    <div
                        key={`item-${index}`}
                        className={classNames([
                            styles.item,
                            {
                                [itemClassName]: itemClassName !== null,
                                [indexClassNames[index]]: indexClassNames[index],
                            },
                        ])}
                        style={{
                            padding: spacing !== null && spacing > 0 ? spacing / 2 : null,
                        }}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
