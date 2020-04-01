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

const PlusIcon = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="512"
        height="512"
        className={className}
        viewBox="0 0 512 512"
        xmlSpace="preserve"
    >
        <path
            fill={color}
            d="M485.883,264.742H26.781c-4.971,0-9-4.029-9-9s4.029-9,9-9h459.102c4.971,0,9,4.029,9,9S490.854,264.742,485.883,264.742
    				z"
        />
        <path
            fill={color}
            d="M256.332,494.293c-4.971,0-9-4.029-9-9V26.192c0-4.971,4.029-9,9-9s9,4.029,9,9v459.101
    				C265.332,490.264,261.303,494.293,256.332,494.293z"
        />
    </svg>
);

PlusIcon.propTypes = propTypes;
PlusIcon.defaultProps = defaultProps;

export default PlusIcon;
