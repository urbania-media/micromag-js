import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pascalCase } from 'change-case';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    verticalAlign: MicromagPropTypes.axisAlign,
    horizontalAlign: MicromagPropTypes.horizontalAlign,
    spacing: PropTypes.number,
    reverse: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    verticalAlign: null,
    horizontalAlign: null,
    spacing: 0,
    reverse: false,
    className: null,
    children: null,
};

const VStack = ({ verticalAlign, horizontalAlign, spacing, reverse, className, children }) => {
    const containerSpacing = spacing !== null && spacing > 0 ? spacing / 2 : spacing;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.column]: true,
                    [styles.reverse]: reverse === true,
                    [styles[`axis${pascalCase(verticalAlign || '')}`]]: verticalAlign !== null,
                    [styles[`cross${pascalCase(horizontalAlign || '')}`]]: horizontalAlign !== null,
                    [className]: className !== null,
                },
            ])}
            style={{
                padding: containerSpacing || null,
            }}
        >
            {children}
        </div>
    );
};

VStack.propTypes = propTypes;
VStack.defaultProps = defaultProps;

export default VStack;
