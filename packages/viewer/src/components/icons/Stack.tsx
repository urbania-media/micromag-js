import classNames from 'classnames';
import React from 'react';

interface StackIconProps {
    className?: string;
}

const StackIcon = ({ className = null }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11.5px"
        height="17.5px"
        viewBox="0 0 11.5 17.5"
        className={classNames([{ [className]: className !== null }])}
    >
        <rect width="10" height="16" />
        <polygon points="10.5 1.5 10.5 16.5 1.5 16.5 1.5 17.5 11.5 17.5 11.5 1.5 10.5 1.5" />
    </svg>
);

export default StackIcon;
