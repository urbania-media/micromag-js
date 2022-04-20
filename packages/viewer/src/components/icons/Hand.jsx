import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const HandIcon = ({ color, className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.24 482.87">
        {/* <!-- Hand by Mikhail Bazilevsky from NounProject.com --> */}
        <path
            d="M488.84,255.91a44.68,44.68,0,0,0-19.15,4.3A44.77,44.77,0,0,0,406,226.49a44.75,44.75,0,0,0-62.67-32.66V105.4a44.81,44.81,0,1,0-89.61,0V265.17l-1.15-2.7a44.78,44.78,0,1,0-82.84,34.06l64.87,157.76.34.73a156.29,156.29,0,0,0,141.42,88.44c86.7,0,157.24-70.53,157.24-157.26V300.7a44.82,44.82,0,0,0-44.78-44.79ZM507.46,386.2c0,72.3-58.78,131.1-131.07,131.1a130.29,130.29,0,0,1-117.73-73.36L193.93,286.61a18.64,18.64,0,1,1,34.53-14.07L279.91,394V105.4a18.64,18.64,0,1,1,37.28,0v196a13.08,13.08,0,0,0,26.16,0V234.56a18.64,18.64,0,0,1,37.27,0v89.95a13.07,13.07,0,1,0,26.13,0V266.86a18.64,18.64,0,1,1,37.28,0v80.71h0s0,.08,0,.11a13.08,13.08,0,0,0,26.15,0v-47a18.63,18.63,0,1,1,37.26,0v85.5Z"
            transform="translate(-166.38 -60.59)"
            fill={color}
            fillRule="evenodd"
        />
    </svg>
);

HandIcon.propTypes = propTypes;
HandIcon.defaultProps = defaultProps;

export default HandIcon;
