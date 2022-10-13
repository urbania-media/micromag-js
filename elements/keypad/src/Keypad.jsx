/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getStyleFromAlignment } from '@micromag/core/utils';

import styles from './keypad.module.scss';

const propTypes = {
    align: PropTypes.oneOf(['left', 'right', 'middle']),
    columns: PropTypes.number,
    spacing: PropTypes.number,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    innerClassName: PropTypes.string,
    items: PropTypes.node,
};

const defaultProps = {
    align: null,
    columns: 3,
    spacing: 0,
    className: null,
    itemClassName: null,
    innerClassName: null,
    items: null,
};

function Keypad({ items, align, columns, spacing, className, itemClassName, innerClassName }) {
    const itemWidth = `${100 / columns}%`;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={classNames([
                    styles.inner,
                    {
                        [innerClassName]: innerClassName !== null,
                    },
                ])}
                style={{
                    ...getStyleFromAlignment({ horizontal: align }),
                }}
            >
                {items !== null
                    ? items.map((item) => {
                          const { key } = item || {};
                          return (
                              <div
                                  key={key}
                                  className={classNames([
                                      styles.item,
                                      {
                                          [itemClassName]: itemClassName !== null,
                                      },
                                  ])}
                                  style={{
                                      width: itemWidth,
                                      padding: spacing / 2,
                                  }}
                              >
                                  {item}
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}

Keypad.propTypes = propTypes;
Keypad.defaultProps = defaultProps;

export default Keypad;
