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

const LinkIcon = ({ color, className }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M6.60207 8.70208C7.75493 10.2515 9.95019 10.5697 11.4965 9.40761C11.6277 9.31077 11.7589 9.2001 11.8762 9.08251L13.9749 6.97975C15.3417 5.61018 15.3417 3.39674 13.9749 2.02717C12.608 0.657609 10.3989 0.657609 9.03205 2.02717L7.83086 3.22381"
            stroke={color}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.39793 7.29793C8.24507 5.74852 6.04981 5.43034 4.50345 6.59239C4.37229 6.68923 4.24113 6.7999 4.12377 6.91749L2.02515 9.02026C0.658284 10.3898 0.658284 12.6033 2.02515 13.9728C3.39201 15.3424 5.60109 15.3424 6.96795 13.9728L8.16223 12.7762"
            stroke={color}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

LinkIcon.propTypes = propTypes;
LinkIcon.defaultProps = defaultProps;

export default LinkIcon;
