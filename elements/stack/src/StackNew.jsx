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
    children: PropTypes.node,
};

const defaultProps = {
    direction: 'horizontal',
    align: 'center',
    width: null,
    height: null,
    spacing: 0,
    reverse: false,
    className: null,
    children: null,
};

const StackNew = ({ direction, align, width, height, spacing, reverse, className, children }) => {
    const flexDirection =
        (direction === 'vertical' ? 'row' : 'column') + (reverse ? '-reverse' : '');
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
            <ul className={styles.items} style={itemsStyle}>
                {React.Children.map(children, (child, childI) => (
                    <li key={`item-${childI}`} className={styles.item} style={itemStyle}>
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    );
};

StackNew.propTypes = propTypes;
StackNew.defaultProps = defaultProps;

export default StackNew;
