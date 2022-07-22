import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    className: null,
    size: 50,
};

const ShareLinkIcon = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={classNames([{ [className]: className !== null }])}
    >
        <path
            d="M29.1,33.4a7.19,7.19,0,0,0,10.1,1.4,5,5,0,0,0,.8-.7l4.3-4.3a7.24,7.24,0,0,0,.1-10.2,7.34,7.34,0,0,0-10.2.1l-.1.1-2.5,2.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
        <path
            d="M34.9,30.6a7.19,7.19,0,0,0-10.1-1.4,5,5,0,0,0-.8.7l-4.3,4.3a7.24,7.24,0,0,0-.1,10.2,7.15,7.15,0,0,0,10.2.1l.1-.1,2.5-2.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
    </svg>
);

ShareLinkIcon.propTypes = propTypes;
ShareLinkIcon.defaultProps = defaultProps;

export default ShareLinkIcon;
