import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
};

const defaultProps = {
    className: null,
    color: '#fff',
};

const MuteIcon = ({ color, className }) => (
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M7.09929 8.77987H1C0.447715 8.77987 0 9.22758 0 9.77987V15.7799C0 16.3322 0.447715 16.7799 1 16.7799H7.1076C7.35984 16.7799 7.60276 16.8752 7.78768 17.0467L14.3199 23.1062C14.9599 23.6999 16 23.246 16 22.3731V3.00199C16 2.12221 14.9458 1.67117 14.3095 2.2787L7.78983 8.50316C7.6038 8.68077 7.35649 8.77987 7.09929 8.77987Z"
            fill={color}
        />
        <path
            d="M18 18.6875C21.3137 18.6875 24 16.0012 24 12.6875C24 9.37379 21.3137 6.6875 18 6.6875"
            stroke={color}
        />
        <path
            d="M18 15.6875C19.6569 15.6875 21 14.3444 21 12.6875C21 11.0306 19.6569 9.6875 18 9.6875"
            stroke={color}
        />
    </svg>
);

MuteIcon.propTypes = propTypes;
MuteIcon.defaultProps = defaultProps;

export default MuteIcon;
