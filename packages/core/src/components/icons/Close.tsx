import React from 'react';

interface CloseIconProps {
    className?: string;
    color?: string;
}

const CloseIcon = ({ color = '#fff', className = null }) => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M1 1L21 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M1 21L21 0.999998" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export default CloseIcon;
