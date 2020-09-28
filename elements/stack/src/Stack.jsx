/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pascalCase } from 'change-case';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';

import styles from './styles.module.scss';

const propTypes = {
    direction: MicromagPropTypes.flexDirection,
    axisAlign: MicromagPropTypes.axisAlign,
    crossAlign: MicromagPropTypes.crossAlign,
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: PropTypes.number,
    wrap: PropTypes.bool,
    reverse: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    direction: null,
    axisAlign: null,
    crossAlign: null,
    width: null,
    height: null,
    spacing: 0,
    wrap: false,
    reverse: false,
    className: null,
    children: null,
};

const Stack = ({
    direction,
    axisAlign,
    crossAlign,
    width,
    height,
    spacing: defaultSpacing,
    wrap,
    reverse,
    className,
    children,
}) => {
    const {
        ref,
        entry: { contentRect },
    } = useResizeObserver();

    const spacing =
        (width !== null && width < 300) || (contentRect && contentRect.width < 300)
            ? 10
            : defaultSpacing;

    const containerSpacing = spacing !== null && spacing > 0 ? spacing / 2 : spacing;

    return (
        <div
            ref={width === null && spacing > 0 ? ref : null}
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
