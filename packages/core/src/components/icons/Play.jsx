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
        width="20"
        height="23"
        viewBox="0 0 20 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M16.25 12.5574L2.74999 20.3516C1.74999 20.9289 0.499993 20.2073 0.499993 19.0526L0.499994 3.4641C0.499994 2.3094 1.74999 1.58771 2.74999 2.16506L16.25 9.95929C17.25 10.5366 17.25 11.98 16.25 12.5574Z"
            fill={color}
            stroke={color}
        />
    </svg>
);

PlayIcon.propTypes = propTypes;
PlayIcon.defaultProps = defaultProps;

export default PlayIcon;
