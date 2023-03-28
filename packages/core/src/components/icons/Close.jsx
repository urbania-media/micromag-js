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

const CloseIcon = ({ color, className }) => (
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

CloseIcon.propTypes = propTypes;
CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
