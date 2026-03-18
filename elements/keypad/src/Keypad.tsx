/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';

import { getStyleFromAlignment } from '@micromag/core/utils';

import styles from './keypad.module.css';

interface KeypadProps {
    align?: 'left' | 'right' | 'middle' | null;
    columns?: number;
    spacing?: number;
    className?: string | null;
    itemClassName?: string | null;
    innerClassName?: string | null;
    items?: React.ReactNode | null;
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
                className,
            ])}
        >
            <div
                className={classNames([
                    styles.inner,
                    innerClassName,
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
                                      itemClassName,
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
