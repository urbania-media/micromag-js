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

const PlayIcon = ({ color, className }) => (
    <svg
        width="40"
        height="45.1"
        viewBox="0 0 40 45.1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M38.2,25.7L5.5,44.6C3,46,0,44.2,0,41.4L0,3.6c0-2.8,3-4.5,5.5-3.1l32.7,18.9C40.6,20.8,40.6,24.3,38.2,25.7z"
            fill={color}
            stroke={color}
        />
    </svg>
);

PlayIcon.propTypes = propTypes;
PlayIcon.defaultProps = defaultProps;

export default PlayIcon;
