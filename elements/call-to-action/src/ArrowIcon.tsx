import React from 'react';

interface ArrowProps {
    color?: string;
    className?: string;
}

function Arrow({ color = 'currentColor', className = null }: ArrowProps) {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0px"
            width="48.53px"
            height="12.38px"
            viewBox="0 0 48.53 12.38"
            className={className}
            xmlSpace="preserve"
        >
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <path
                    id="b"
                    fill="none"
                    stroke={color}
                    strokeWidth="3px"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d="M1.5,10.88L24.26,1.5l22.77,9.38"
                />
            </g>
        </svg>
    );
}

export default Arrow;
