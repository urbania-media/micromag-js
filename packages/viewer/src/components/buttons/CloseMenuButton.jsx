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
                    width="19"
                    height="23"
                    viewBox="0 0 19 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id="path-1-inside-1_560_19911" fill="currentColor">
                        <path d="M0 7C0 4.79086 1.79086 3 4 3H12C14.2091 3 16 4.79086 16 7V19C16 21.2091 14.2091 23 12 23H4C1.79086 23 0 21.2091 0 19V7Z" />
                    </mask>
                    <path
                        d="M0 3H16H0ZM16 19C16 21.7614 13.7614 24 11 24H4C1.23858 24 -1 21.7614 -1 19H1C1 20.6569 2.34315 22 4 22H12C14.2091 22 16 20.6569 16 19ZM4 24C1.23858 24 -1 21.7614 -1 19V8C-1 5.23858 1.23858 3 4 3C2.34315 3 1 4.79086 1 7V19C1 20.6569 2.34315 22 4 22V24ZM16 3V23V3Z"
                        fill="currentColor"
                        mask="url(#path-1-inside-1_560_19911)"
                    />
                    <rect x="3.5" y="0.5" width="15" height="19" rx="2.5" stroke="currentColor" />
                    <path
                        d="M7.35333 6.35333L14.6467 13.6467"
                        stroke="currentColor"
                        strokeLinejoin="round"
                    />
                    <path d="M7.35333 13.6467L14.6467 6.35333" stroke="white" />
                </svg>
            }
            {...props}
        />
    );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
