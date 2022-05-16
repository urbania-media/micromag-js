import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StackIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="49.818"
        height="52"
        viewBox="0 0 15.818 19"
        className={classNames([
            { [className]: className !== null },
        ])}
    >
        <defs>
            <filter id="Icon_material-content-copy" x="0" y="0" width="49.818" height="52" filterUnits="userSpaceOnUse">
                <feOffset dy="3" input="SourceAlpha"/>
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feFlood floodOpacity="0.161"/>
                <feComposite operator="in" in2="blur"/>
                <feComposite in="SourceGraphic"/>
            </filter>
        </defs>
        <g filter="url(#Icon_material-content-copy)">
            <path
                d="M13.182,1.5H4.455A1.459,1.459,0,0,0,3,2.955V13.136H4.455V2.955h8.727Zm2.182,2.909h-8A1.459,1.459,0,0,0,5.909,5.864V16.045A1.459,1.459,0,0,0,7.364,17.5h8a1.459,1.459,0,0,0,1.455-1.455V5.864A1.459,1.459,0,0,0,15.364,4.409Zm0,11.636h0Z"
                fill="#fff"
            />
        </g>
    </svg>
);

StackIcon.propTypes = propTypes;
StackIcon.defaultProps = defaultProps;

export default StackIcon;
