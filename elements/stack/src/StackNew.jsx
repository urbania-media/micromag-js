/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.new.module.scss';

const propTypes = {
    direction: MicromagPropTypes.stackDirection,
    align: MicromagPropTypes.stackAlign,
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: MicromagPropTypes.stackSpacing,
    reverse: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    direction: 'horizontal',
    align: 'center',
    width: null,
    height: null,
    spacing: null,
    reverse: false,
    className: null,
    itemClassName: null,
    children: null,
};

const StackNew = ({ direction, align, width, height, spacing, reverse, className, itemClassName, children }) => {
    const flexDirection =
        (direction === 'vertical' ? 'column' : 'row') + (reverse ? '-reverse' : '');
    const alignItems = align === 'center' ? align : `flex-${align}`;
    const justifyContent = typeof spacing === 'string' ? `space-${spacing}` : null;
    const itemMargin = typeof spacing === 'number' ? spacing : 0;

    const containerStyle = {
        width,
        height,
    };

    const itemsStyle = {
        flexDirection,
        alignItems,
        justifyContent,
        margin: -itemMargin,
    };

    const itemStyle = {
        margin: itemMargin,
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerStyle}
        >
            <div className={styles.items} style={itemsStyle}>
                { itemMargin === 0 ? children : 
                    React.Children.map(children, (child, childI) => (
                        <div key={`item-${childI}`} className={classNames([
                            styles.item,
                            {
                                [itemClassName]: itemClassName !== null,
                            },
                        ])} style={itemStyle}>
                            {child}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

StackNew.propTypes = propTypes;
StackNew.defaultProps = defaultProps;

export default StackNew;
