import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    className: null,
    size: 45,
};

const SmsIcon = ({ className, size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames([{ [className]: className !== null }])}
    >
        <path
            d="M30.8988 12H14.1001C12.9444 12.0053 12.0106 12.9444 12.0106 14.1001L12 32.9989L16.2002 28.7987H30.8999C32.0578 28.7955 32.9968 27.8576 33 26.6986V14.1001C32.9968 12.9422 32.0588 12.0032 30.8999 12H30.8988ZM19.3498 20.3999C19.3498 20.9798 18.8797 21.4499 18.2998 21.4499V21.4499C17.7199 21.4499 17.2497 20.9798 17.2497 20.3999V20.3999C17.2497 19.82 17.7199 19.3498 18.2998 19.3498V19.3498C18.8797 19.3498 19.3498 19.82 19.3498 20.3999V20.3999ZM23.5501 20.3999C23.5501 20.9798 23.0799 21.4499 22.5 21.4499V21.4499C21.9201 21.4499 21.4499 20.9798 21.4499 20.3999V20.3999C21.4499 19.82 21.9201 19.3498 22.5 19.3498V19.3498C23.0799 19.3498 23.5501 19.82 23.5501 20.3999V20.3999ZM27.7503 20.3999C27.7503 20.9798 27.2801 21.4499 26.7002 21.4499V21.4499C26.1203 21.4499 25.6502 20.9798 25.6502 20.3999V20.3999C25.6502 19.82 26.1203 19.3498 26.7002 19.3498V19.3498C27.2801 19.3498 27.7503 19.82 27.7503 20.3999V20.3999Z"
            fill="currentColor"
        />
    </svg>
);

SmsIcon.propTypes = propTypes;
SmsIcon.defaultProps = defaultProps;

export default SmsIcon;
