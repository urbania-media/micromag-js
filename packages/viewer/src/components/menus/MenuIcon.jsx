/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../styles/menus/menu-icon.module.scss';

const propTypes = {
    size: PropTypes.number,
    spacing: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    size: 100,
    spacing: 8,
    color: 'white',
    className: null,
};

const MenuIcon = ({ size, spacing, color, className }) => {
    const squareSize = (size - 2 * spacing) / 3;

    return (
        <svg
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${size} ${size}`}
        >
            {[...new Array(9)].map((square, squareI) => {
                const x = (squareI % 3) * (squareSize + spacing);
                const y = Math.floor(squareI / 3) * (squareSize + spacing);
                return (
                    <rect
                        key={`square-${squareI}`}
                        fill={color}
                        x={x}
                        y={y}
                        width={squareSize}
                        height={squareSize}
                    />
                );
            })}
        </svg>
    );
};

MenuIcon.propTypes = propTypes;
MenuIcon.defaultProps = defaultProps;

export default MenuIcon;
