/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';

import { getStyleFromAlignment } from '@micromag/core/utils';

import styles from './keypad.module.css';

interface KeypadProps {
    align?: 'left' | 'right' | 'middle';
    columns?: number;
    spacing?: number;
    className?: string;
    itemClassName?: string;
    innerClassName?: string;
    items?: React.ReactNode;
}

function Keypad({
    items = null,
    align = null,
    columns = 1,
    spacing = 10,
    className = null,
    itemClassName = null,
    innerClassName = null,
}: KeypadProps) {
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

export default Keypad;
