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

const PauseIcon = ({ color, className }) => (
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

PauseIcon.propTypes = propTypes;
PauseIcon.defaultProps = defaultProps;

export default PauseIcon;
