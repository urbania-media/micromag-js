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
    isSmall: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    direction: null,
    axisAlign: null,
    crossAlign: null,
    items: [],
    width: null,
    height: null,
    spacing: 10,
    wrap: false,
    reverse: false,
    isSmall: false,
    className: null,
    children: null,
};

const Stack = ({
    direction,
    axisAlign,
    crossAlign,
    items,
    width,
    height,
    spacing: defaultSpacing,
    wrap,
    reverse,
    isSmall,
    className,
    children,
}) => {
    const spacing = isSmall ? 10 : defaultSpacing;
    const containerSpacing =
        items.length > 0 && spacing !== null && spacing > 0 ? spacing / 2 : spacing;
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
                padding: containerSpacing || null,
            }}
        >
            {children}
        </div>
    );
};

Stack.propTypes = propTypes;
Stack.defaultProps = defaultProps;

export default Stack;
