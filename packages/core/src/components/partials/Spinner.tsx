/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import styles from '../../styles/partials/spinner.module.css';

interface SpinnerProps {
    animated?: boolean;
    color?: string;
    strokeWidth?: number;
    className?: string;
}

function Spinner({
    animated = true,
    color = 'currentColor',
    strokeWidth = 3,
    className = null,
}: SpinnerProps) {
    return (
        <svg
            className={classNames([
                styles.container,
                {
                    [styles.animated]: animated,
                    [className]: className !== null,
                },
            ])}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className={styles.path}
                cx="20"
                cy="20"
                r="12"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}

export default Spinner;
