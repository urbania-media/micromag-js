/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getStyleFromAlignment } from '@micromag/core/utils';

import styles from './keypad.module.scss';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    alignment: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'right', 'middle']),
        vertical: PropTypes.oneOf(['top', 'bottom', 'middle']),
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    columns: PropTypes.number,
    spacing: PropTypes.number,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
};

const defaultProps = {
    items: [],
    alignment: null,
    width: null,
    height: null,
    columns: 3,
    spacing: 0,
    className: null,
    itemClassName: null,
};

function Keypad({ items, alignment, width, height, columns, spacing, className, itemClassName }) {
    const itemWidth = `${100 / columns}%`;
    const gridItems = items.map((item) => {
        const { key } = item || {};
        return (
            <div
                key={key}
                className={classNames([
                    styles.slot,
                    {
                        [itemClassName]: itemClassName !== null,
                    },
                ])}
                // style={{ width: itemWidth, paddingLeft: spacing, paddingBottom: spacing }}
                style={{
                    width: itemWidth,
                    paddingBottom: itemWidth,
                    height: 0,
                }}
            >
                <div
                    className={styles.item}
                    style={{
                        height: '100%',
                        paddingLeft: spacing,
                        paddingBottom: spacing,
                    }}
                >
                    {item}
                </div>
            </div>
        );
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width,
                height,
                marginLeft: spacing * -1,
                marginBottom: spacing * -1,
                ...getStyleFromAlignment(alignment),
            }}
        >
            {gridItems}
        </div>
    );
}

Keypad.propTypes = propTypes;
Keypad.defaultProps = defaultProps;

export default Keypad;
