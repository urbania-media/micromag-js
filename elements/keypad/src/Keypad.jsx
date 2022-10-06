/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getStyleFromAlignment } from '@micromag/core/utils';

import styles from './keypad.module.scss';

const propTypes = {
    alignment: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'right', 'middle']),
        vertical: PropTypes.oneOf(['top', 'bottom', 'middle']),
    }),
    columns: PropTypes.number,
    spacing: PropTypes.number,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    innerClassName: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    alignment: null,
    columns: 3,
    spacing: 0,
    className: null,
    itemClassName: null,
    innerClassName: null,
    children: null,
};

function Keypad({
    children,
    alignment,
    columns,
    spacing,
    className,
    itemClassName,
    innerClassName,
}) {
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
                    marginLeft: spacing * -1,
                    marginBottom: spacing * -1,
                    ...getStyleFromAlignment(alignment),
                }}
            >
                {React.Children.map(children, (item) => {
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
                                paddingLeft: spacing,
                                paddingBottom: spacing,
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Keypad.propTypes = propTypes;
Keypad.defaultProps = defaultProps;

export default Keypad;
