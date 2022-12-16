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
        width="11.5px"
        height="17.5px"
        viewBox="0 0 11.5 17.5"
        className={classNames([{ [className]: className !== null }])}
    >
        <rect width="10" height="16" />
        <polygon points="10.5 1.5 10.5 16.5 1.5 16.5 1.5 17.5 11.5 17.5 11.5 1.5 10.5 1.5" />
    </svg>
);

StackIcon.propTypes = propTypes;
StackIcon.defaultProps = defaultProps;

export default StackIcon;
