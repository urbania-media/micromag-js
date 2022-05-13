import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    stroke: PropTypes.string,
    border: PropTypes.string,
    fill: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    stroke: 'currentColor',
    border: 'rgba(0,0,0,0.67)',
    fill: '#fff',
    className: null,
};

const Close = ({ stroke, border, fill, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42.9"
        height="42.9"
        viewBox="0 0 42.9 42.9"
        className={className}
    >
        <g transform="translate(-352.531 -47.531)">
            {border ? (
                <path
                    fill={border}
                    d="M374,47.5c11.9,0,21.5,9.6,21.5,21.5s-9.6,21.5-21.5,21.5s-21.5-9.6-21.5-21.5c0,0,0,0,0,0
                    C352.5,57.1,362.1,47.5,374,47.5z"
                />
            ): null}
            <path
                fill={fill}
                d="M374,50c10.5,0,19,8.5,19,19s-8.5,19-19,19s-19-8.5-19-19S363.5,50,374,50z"
            />
            <g transform="translate(366.893 61.893)">
                <g transform="translate(0 0)">
                    <path
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M14.2,0.3L0,13.9"
                    />
                    <path
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M0.3,0l13.7,14.2"
                    />
                </g>
            </g>
        </g>
    </svg>
);

Close.propTypes = propTypes;
Close.defaultProps = defaultProps;

export default Close;
