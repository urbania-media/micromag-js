/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

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
    children,
}) => {
    const flexDirection =
        (direction === 'vertical' ? 'column' : 'row') + (reverse ? '-reverse' : '');
    const alignItems = align === 'center' ? align : `flex-${align}`;
    const justifyContent = isString(spacing) ? `space-${spacing}` : null;
    const space = isNumber(spacing) ? spacing : null;
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
                    flexDirection,
                    alignItems,
                    justifyContent,
                    width: direction === 'horizontal' ? size : null,
                    minWidth: direction === 'horizontal' ? minSize : null,
                    maxWidth: direction === 'horizontal' ? maxSize : null,
                    height: direction === 'vertical' ? size : null,
                    minHeight: direction === 'vertical' ? minSize : null,
                    maxHeight: direction === 'vertical' ? maxSize : null,
                }}
            >
                {React.Children.toArray(children).reduce(
                    (allChildren, child, index) =>
                        child.type !== Spacer && space !== null && index < lastIndex
                            ? [...allChildren, child, <Spacer size={space} />]
                            : [...allChildren, child],
                    [],
                )}
            </div>
        </StackProvider>
    );
};

Stack.propTypes = propTypes;
Stack.defaultProps = defaultProps;

export default Stack;
