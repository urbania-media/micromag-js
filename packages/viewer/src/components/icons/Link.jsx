import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const LinkIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={classNames([
            { [className]: className !== null },
        ])}
    >
        <path
            d="M13.13,17.44a7.18,7.18,0,0,0,10,1.45,6.34,6.34,0,0,0,.78-.68l4.31-4.31A7.18,7.18,0,0,0,18.2,3.65l-.09.09L15.65,6.2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
        <path d="M18.87,14.56a7.19,7.19,0,0,0-10-1.45,6.34,6.34,0,0,0-.78.68L3.73,18.1A7.18,7.18,0,1,0,13.8,28.35l.09-.09,2.45-2.46"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
    </svg>
);

LinkIcon.propTypes = propTypes;
LinkIcon.defaultProps = defaultProps;

export default LinkIcon;
