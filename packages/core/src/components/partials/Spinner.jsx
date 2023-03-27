/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    animated: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    animated: true,
    color: 'currentColor',
    className: null,
};

const Spinner = ({ animated, color, className }) => (
    <svg
        className={classNames([
            {
                [className]: className !== null,
            },
        ])}
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                <stop stopColor={color} stopOpacity="0" offset="0%" />
                <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
                <stop stopColor={color} offset="100%" />
            </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
                <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                    {animated ? (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                        />
                    ) : null}
                </path>
                <circle fill={color} cx="36" cy="18" r="1">
                    {animated ? (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                        />
                    ) : null}
                </circle>
            </g>
        </g>
    </svg>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
