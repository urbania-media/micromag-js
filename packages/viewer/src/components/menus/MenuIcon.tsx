/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';

interface MenuIconProps {
    size?: number;
    spacing?: number;
    color?: string;
    className?: string;
}

function MenuIcon({ size = 100, spacing = 8, color = 'white', className = null }) {
    const squareSize = (size - 2 * spacing) / 3;

    return (
        <svg
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
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
}

export default MenuIcon;
