import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const MenuIcon = ({ color, className }) => (
    <svg
        width="28"
        height="32"
        viewBox="0 0 28 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <mask id="path-1-inside-1_303_211" fill={color}>
            <path d="M4.5 11.9315C4.5 9.72232 6.29086 7.93146 8.5 7.93146H16.5C18.7091 7.93146 20.5 9.72232 20.5 11.9315V23.9315C20.5 26.1406 18.7091 27.9315 16.5 27.9315H8.5C6.29086 27.9315 4.5 26.1406 4.5 23.9315V11.9315Z" />
        </mask>
        <path
            d="M4.5 7.93146H20.5H4.5ZM20.5 23.9315C20.5 26.6929 18.2614 28.9315 15.5 28.9315H8.5C5.73858 28.9315 3.5 26.6929 3.5 23.9315H5.5C5.5 25.5883 6.84315 26.9315 8.5 26.9315H16.5C18.7091 26.9315 20.5 25.5883 20.5 23.9315ZM8.5 28.9315C5.73858 28.9315 3.5 26.6929 3.5 23.9315V12.9315C3.5 10.17 5.73858 7.93146 8.5 7.93146C6.84315 7.93146 5.5 9.72232 5.5 11.9315V23.9315C5.5 25.5883 6.84315 26.9315 8.5 26.9315V28.9315ZM20.5 7.93146V27.9315V7.93146Z"
            fill={color}
            mask="url(#path-1-inside-1_303_211)"
        />
        <rect x="8" y="5.43146" width="15" height="19" rx="2.5" stroke={color} />
    </svg>
);

MenuIcon.propTypes = propTypes;
MenuIcon.defaultProps = defaultProps;

export default MenuIcon;
