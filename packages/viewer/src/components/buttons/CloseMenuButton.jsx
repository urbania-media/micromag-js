/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import IconButton from './IconButton';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CloseButton = ({ className, ...props }) => {
    const intl = useIntl();

    return (
        <IconButton
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            label={intl.formatMessage({
                defaultMessage: 'Close',
                description: 'Button label',
            })}
            icon={
                <svg
                    width="27"
                    height="31"
                    viewBox="0 0 27 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id="path-1-inside-1_526_17272" fill="currentColor">
                        <path d="M4 11C4 8.79086 5.79086 7 8 7H16C18.2091 7 20 8.79086 20 11V23C20 25.2091 18.2091 27 16 27H8C5.79086 27 4 25.2091 4 23V11Z" />
                    </mask>
                    <path
                        d="M4 7H20H4ZM20 23C20 25.7614 17.7614 28 15 28H8C5.23858 28 3 25.7614 3 23H5C5 24.6569 6.34315 26 8 26H16C18.2091 26 20 24.6569 20 23ZM8 28C5.23858 28 3 25.7614 3 23V12C3 9.23858 5.23858 7 8 7C6.34315 7 5 8.79086 5 11V23C5 24.6569 6.34315 26 8 26V28ZM20 7V27V7Z"
                        fill="currentColor"
                        mask="url(#path-1-inside-1_526_17272)"
                    />
                    <rect x="7.5" y="4.5" width="15" height="19" rx="2.5" stroke="currentColor" />
                    <path
                        d="M11.3533 10.3533L18.6467 17.6467"
                        stroke="currentColor"
                        strokeLinejoin="round"
                    />
                    <path d="M11.3533 17.6467L18.6467 10.3533" stroke="currentColor" />
                </svg>
            }
            {...props}
        />
    );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
