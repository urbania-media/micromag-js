/* eslint-disable react/jsx-indent */

/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React from 'react';

import type { StackAlign, StackDirection, StackSpacing } from '@micromag/core';
import Spacer from './Spacer';
import { StackProvider } from './StackContext';

import styles from './styles/stack.module.css';

interface StackProps {
    direction?: StackDirection;
    align?: StackAlign;
    spacing?: StackSpacing;
    reverse?: boolean;
    size?: number;
    minSize?: number;
    maxSize?: number;
    className?: string;
    children?: React.ReactNode;
}

function Stack({
    direction = 'horizontal',
    align = 'center',
    spacing = null,
    reverse = false,
    size = null,
    minSize = null,
    maxSize = null,
    className = null,
    children = null,
}) {
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
                            ? [
                                  ...allChildren,
                                  child,
                                  <Spacer key={`spacer-${index}`} size={space} />,
                              ]
                            : [...allChildren, child],
                    [],
                )}
            </div>
        </StackProvider>
    );
}

export default Stack;
