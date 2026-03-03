import React from 'react';

interface PauseIconProps {
    className?: string;
    color?: string;
}

const PauseIcon = ({ color = '#fff', className = null }) => (
    <svg
        className={className}
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="6" height="18" rx="2" fill={color} />
        <rect x="8" width="6" height="18" rx="2" fill={color} />
    </svg>
);

export default PauseIcon;
