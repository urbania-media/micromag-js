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
            d="M18.6,15.34a5.72,5.72,0,0,0-.59-.73L17.36,14a4.93,4.93,0,0,0-7,0L4.55,19.81a4.94,4.94,0,0,0,0,7l.65.64a4.91,4.91,0,0,0,7,0L16.61,23"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
        />
        <path
            d="M13.4,16.66a5.72,5.72,0,0,0,.59.73l.65.64a4.93,4.93,0,0,0,7,0l5.85-5.84a4.94,4.94,0,0,0,0-7l-.65-.64a4.91,4.91,0,0,0-7,0L15.39,9"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
        />
    </svg>
);

LinkIcon.propTypes = propTypes;
LinkIcon.defaultProps = defaultProps;

export default LinkIcon;
