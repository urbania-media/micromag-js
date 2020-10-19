/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    direction: MicromagPropTypes.stackDirection,
    align: MicromagPropTypes.stackAlign,
    spacing: MicromagPropTypes.stackSpacing,
    reverse: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    direction: 'horizontal',
    align: 'center',
    spacing: null,
    reverse: false,
    className: null,
    itemClassName: null,
    children: null,
};

const Stack = ({
    width,
    height,
    direction,
    align,
    spacing,
    reverse,
    className,
    itemClassName,
    children,
}) => {
    const flexDirection =
        (direction === 'vertical' ? 'column' : 'row') + (reverse ? '-reverse' : '');
    const alignItems = align === 'center' ? align : `flex-${align}`;
    const justifyContent = typeof spacing === 'string' ? `space-${spacing}` : null;
    const space = typeof spacing === 'number' ? spacing : 0;

    const lastIndex = children !== null && children.length ? children.length - 1 : null;

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
                flexDirection,
                alignItems,
                justifyContent,
            }}
        >
            {React.Children.map(children, (child, index) => {
                const isLast = reverse ? index === 0 : index === lastIndex;
                return (
                    <div
                        key={`item-${index}`}
                        className={classNames([
                            styles.item,
                            {
                                [itemClassName]: itemClassName !== null,
                            },
                        ])}
                        style={{
                            marginBottom: direction === 'vertical' && !isLast ? space : null,
                            marginRight: direction === 'horizontal' && !isLast ? space : null,
                        }}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
};

Stack.propTypes = propTypes;
Stack.defaultProps = defaultProps;

export default Stack;
