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

const EmailIcon = ({ className, size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames([{ [className]: className !== null }])}
    >
        <g clipPath="url(#clip0_837_18233)">
            <path
                d="M32.8293 17.0498L27.3973 22.5436C27.3582 22.5825 27.3582 22.6453 27.3973 22.6842L31.1987 26.7044C31.4557 26.9576 31.4568 27.3694 31.2007 27.6247L31.1987 27.6267C30.9417 27.8809 30.526 27.8809 30.2699 27.6267L26.4836 23.6214C26.4435 23.5816 26.3782 23.5816 26.337 23.6214L25.4143 24.5557C24.6512 25.3304 23.607 25.7671 22.5156 25.7691C21.4011 25.7631 20.3367 25.3135 19.5606 24.5198L18.672 23.6224C18.6318 23.5826 18.5666 23.5826 18.5254 23.6224L14.7371 27.6286C14.48 27.8829 14.0644 27.8829 13.8083 27.6286C13.5513 27.3754 13.5503 26.9636 13.8063 26.7084L13.8083 26.7064L17.6097 22.6862C17.6448 22.6463 17.6448 22.5855 17.6097 22.5456L12.1717 17.0498C12.1335 17.0109 12.0703 17.0099 12.0301 17.0478C12.011 17.0667 12 17.0927 12 17.1196V28.1132C12.003 28.9976 12.7239 29.7145 13.6155 29.7175H31.3855C32.2761 29.7145 32.998 28.9986 33.001 28.1132V17.1196C33.001 17.0647 32.9568 17.0199 32.9016 17.0199C32.8745 17.0199 32.8484 17.0308 32.8293 17.0498Z"
                fill="currentColor"
            />
            <path
                d="M22.4995 24.459C23.2425 24.461 23.9544 24.1648 24.4735 23.6364L32.3946 15.631C32.1114 15.4036 31.759 15.28 31.3955 15.28H13.6105C13.246 15.279 12.8936 15.4026 12.6105 15.631L20.5305 23.6364C21.0476 24.1628 21.7585 24.46 22.4995 24.459Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_837_18233">
                <rect
                    width="21"
                    height="14.4375"
                    fill="currentColor"
                    transform="translate(12 15.28)"
                />
            </clipPath>
        </defs>
    </svg>
);

EmailIcon.propTypes = propTypes;
EmailIcon.defaultProps = defaultProps;

export default EmailIcon;
