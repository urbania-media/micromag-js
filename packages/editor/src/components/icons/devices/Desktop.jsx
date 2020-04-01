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

const DesktopIcon = ({ color, className }) => (
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
            d="M84 17H16c-3.3 0-6 2.7-6 6v42c0 3.3 2.7 6 6 6h22v4.2c-.1.4-.9 1.5-1.3 2-1.1 1.4-2.2 2.8-1.4 4.4.3.7 1.1 1.4 2.7 1.4h23c1 0 3.3 0 4.1-1.8.8-1.8-.6-3.2-1.8-4.5-.4-.5-1.1-1.2-1.3-1.6V71h22c3.3 0 6-2.7 6-6V23c0-3.3-2.7-6-6-6zM40.3 79c.9-1.1 1.7-2.4 1.7-3.8V71h16v4.2c0 1.4 1 2.7 2 3.8H40.3zM86 65c0 1.1-.9 2-2 2H16c-1.1 0-2-.9-2-2v-6h72v6zm0-10H14V23c0-1.1.9-2 2-2h68c1.1 0 2 .9 2 2v32z"
        />
    </svg>
);

DesktopIcon.propTypes = propTypes;
DesktopIcon.defaultProps = defaultProps;

export default DesktopIcon;
