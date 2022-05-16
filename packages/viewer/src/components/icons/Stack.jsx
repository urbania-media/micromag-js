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
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={classNames([
            { [className]: className !== null },
        ])}
    >
        <path d="M22.33.15H5A2.9,2.9,0,0,0,2.12,3V23.25H5V3H22.33Zm4.33,5.78H10.78A2.9,2.9,0,0,0,7.89,8.81V29a2.9,2.9,0,0,0,2.89,2.89H26.66A2.89,2.89,0,0,0,29.55,29V8.81A2.88,2.88,0,0,0,26.66,5.93Zm0,23.09Z"/>
    </svg>
);

StackIcon.propTypes = propTypes;
StackIcon.defaultProps = defaultProps;

export default StackIcon;
