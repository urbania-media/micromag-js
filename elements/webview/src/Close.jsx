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

const Close = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.042"
        height="17.042"
        viewBox="0 0 17.042 17.042"
        className={className}
    >
        <g id="Groupe_34" data-name="Groupe 34" transform="translate(1.414 1.414)">
            <path
                id="Tracé_222"
                data-name="Tracé 222"
                d="M-117.847,1483.807l-14.214,13.664"
                transform="translate(132.061 -1483.531)"
                fill="#fff"
                stroke={color}
                strokeLinecap="round"
                strokeWidth="2"
            />
            <path
                id="Tracé_223"
                data-name="Tracé 223"
                d="M14.214,0,0,13.664"
                transform="translate(0.275 14.214) rotate(-90)"
                fill="#fff"
                stroke={color}
                strokeLinecap="round"
                strokeWidth="2"
            />
        </g>
    </svg>
);

Close.propTypes = propTypes;
Close.defaultProps = defaultProps;

export default Close;
