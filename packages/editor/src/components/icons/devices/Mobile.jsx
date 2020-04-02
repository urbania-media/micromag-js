/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const MobileIcon = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
        className={className}
    >
        <path
            fill={color}
            d="M66 11H34c-3.3 0-6 2.7-6 6v66c0 3.3 2.7 6 6 6h32c3.3 0 6-2.7 6-6V17c0-3.3-2.7-6-6-6zm2 72c0 1.1-.9 2-2 2H34c-1.1 0-2-.9-2-2v-4h36v4zm0-8H32V25h36v50zm0-54H32v-4c0-1.1.9-2 2-2h32c1.1 0 2 .9 2 2v4z"
        />
    </svg>
);

MobileIcon.propTypes = propTypes;
MobileIcon.defaultProps = defaultProps;

export default MobileIcon;
