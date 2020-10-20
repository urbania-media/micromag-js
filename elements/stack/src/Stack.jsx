/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { StackProvider } from './StackContext';
import Spacer from './Spacer';
import styles from './styles/stack.module.scss';

const propTypes = {
    direction: MicromagPropTypes.stackDirection,
    align: MicromagPropTypes.stackAlign,
    spacing: MicromagPropTypes.stackSpacing,
    reverse: PropTypes.bool,
    size: PropTypes.number,
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    direction: 'horizontal',
    align: 'center',
    spacing: null,
    reverse: false,
    size: null,
    minSize: null,
    maxSize: null,
    className: null,
    itemClassName: null,
    children: null,
};

const Stack = ({
    direction,
    align,
    spacing,
    reverse,
    size,
    minSize,
    maxSize,
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
        <StackProvider direction={direction}>
            <div
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
                style={{
                    width: direction === 'horizontal' ? size : null,
                    minWidth: direction === 'horizontal' ? minSize : null,
                    maxWidth: direction === 'horizontal' ? maxSize : null,
                    height: direction === 'vertical' ? size : null,
                    minHeight: direction === 'vertical' ? minSize : null,
                    maxHeight: direction === 'vertical' ? maxSize : null,
                    flexDirection,
                    alignItems,
                    justifyContent,
                }}
            >
                {React.Children.map(children, (child, index) => {
                    const isLast = reverse ? index === 0 : index === lastIndex;
                    return child.type !== Spacer ? (
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
                    ) : (
                        child
                    );
                })}
            </div>
        </StackProvider>
    );
};

Stack.propTypes = propTypes;
Stack.defaultProps = defaultProps;

export default Stack;
