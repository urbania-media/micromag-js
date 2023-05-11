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

const FullscreenIcon = ({ color, className }) => (
    <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M11.2 0H16V4.66667H14.4V1.55556H11.2V0ZM0 0H4.8V1.55556H1.6V4.66667H0V0ZM14.4 12.4444V9.33333H16V14H11.2V12.4444H14.4ZM1.6 12.4444H4.8V14H0V9.33333H1.6V12.4444Z"
            fill={color}
        />
    </svg>
);

FullscreenIcon.propTypes = propTypes;
FullscreenIcon.defaultProps = defaultProps;

export default FullscreenIcon;
