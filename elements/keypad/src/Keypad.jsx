/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    width: PropTypes.number,
    height: PropTypes.number,
    columns: PropTypes.number,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    width: null,
    height: null,
    columns: 3,
    spacing: 0,
    className: null,
};

function Keypad({ items, width, height, columns, spacing, className }) {
    const itemWidth = `${100 / columns}%`;
    const horizontalAlign = 'center';
    const verticalAlign = 'center';
    const gridItems = items.map((item) => {
        const { id = null } = item || {};
        return (
            <div key={id} className={styles.item} style={{width: itemWidth, paddingLeft: spacing, paddingBottom: spacing}}>
                {item}
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
                justifyContent: horizontalAlign,
                alignItems: verticalAlign,
                marginLeft: spacing * -1,
                marginBottom: spacing * -1
            }}
        >
            {gridItems}
        </div>
    );
}

Keypad.propTypes = propTypes;
Keypad.defaultProps = defaultProps;

export default Keypad;
