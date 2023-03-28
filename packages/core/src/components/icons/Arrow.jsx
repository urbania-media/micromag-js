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

const ArrowIcon = ({ color, className }) => (
    <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.353 0.371014L19.319 6.33704C19.6851 6.70314 19.6851 7.29671 19.319 7.66282L13.353 13.6288C12.9869 13.9949 12.3933 13.9949 12.0272 13.6288C11.6611 13.2627 11.6611 12.6692 12.0272 12.3031L16.3929 7.9374H0V6.06246H16.3929L12.0272 1.6968C11.6611 1.33069 11.6611 0.737119 12.0272 0.371014C12.3933 0.0049094 12.9869 0.0049094 13.353 0.371014Z"
            fill={color}
        />
    </svg>
);

ArrowIcon.propTypes = propTypes;
ArrowIcon.defaultProps = defaultProps;

export default ArrowIcon;
