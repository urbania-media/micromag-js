import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pascalCase } from 'change-case';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    axisAlign: MicromagPropTypes.axisAlign,
    crossAlign: MicromagPropTypes.crossAlign,
    spacing: PropTypes.number,
    // wrap: PropTypes.bool,
    reverse: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    axisAlign: null,
    crossAlign: null,
    spacing: 0,
    // wrap: false,
    reverse: false,
    className: null,
    children: null,
};

const HStack = ({ axisAlign, crossAlign, spacing, reverse, className, children }) => {
    const containerSpacing = spacing !== null && spacing > 0 ? spacing / 2 : spacing;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.row]: true,
                    [styles.reverse]: reverse === true,
                    [styles[`axis${pascalCase(axisAlign || '')}`]]: axisAlign !== null,
                    [styles[`cross${pascalCase(crossAlign || '')}`]]: crossAlign !== null,
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

HStack.propTypes = propTypes;
HStack.defaultProps = defaultProps;

export default HStack;
