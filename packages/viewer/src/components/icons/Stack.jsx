import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StackIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        // width="32"
        // height="32"
        // viewBox="0 0 32 32"
        width="11.5"
        height="17.5"
        viewBox="0 0 11.5 17.5"
        className={classNames([{ [className]: className !== null }])}
    >
        {/* <path d="M22.33.15H5A2.9,2.9,0,0,0,2.12,3V23.25H5V3H22.33Zm4.33,5.78H10.78A2.9,2.9,0,0,0,7.89,8.81V29a2.9,2.9,0,0,0,2.89,2.89H26.66A2.89,2.89,0,0,0,29.55,29V8.81A2.88,2.88,0,0,0,26.66,5.93Zm0,23.09Z"/> */}
        <rect width="10" height="16" />
        <polygon points="10.5 1.5 10.5 16.5 1.5 16.5 1.5 17.5 11.5 17.5 11.5 1.5 10.5 1.5" />
    </svg>
);

StackIcon.propTypes = propTypes;
StackIcon.defaultProps = defaultProps;

export default StackIcon;
