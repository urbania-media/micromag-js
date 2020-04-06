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
    withSmallSpacing: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    indexClassNames: PropTypes.object, // eslint-disable-line
    children: PropTypes.node,
};

const defaultProps = {
    direction: null,
    axisAlign: null,
    crossAlign: null,
    items: [],
    width: null,
    height: null,
    spacing: 0,
    wrap: false,
    reverse: false,
    withSmallSpacing: false,
    className: null,
    itemClassName: null,
    indexClassNames: {},
    children: null,
};

const Box = ({
    direction,
    axisAlign,
    crossAlign,
    items,
    width,
    height,
    spacing: defaultSpacing,
    wrap,
    reverse,
    withSmallSpacing,
    className,
    itemClassName,
    indexClassNames,
    children,
}) => {
    const spacing = withSmallSpacing ? 10 : defaultSpacing;
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
                padding: spacing !== null && spacing > 0 ? spacing / 2 : null,
            }}
        >
            {items.length > 0
                ? items.map((item, index) => {
                      return (
                          <div
                              key={`item-${index}`}
                              className={classNames([
                                  styles.item,
                                  {
                                      [itemClassName]: itemClassName !== null,
                                      [indexClassNames[index]]: indexClassNames[index],
                                  },
                              ])}
                              style={{
                                  padding: spacing !== null && spacing > 0 ? spacing / 2 : null,
                              }}
                          >
                              {item}
                          </div>
                      );
                  })
                : null}
            {children}
        </div>
    );
};

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
