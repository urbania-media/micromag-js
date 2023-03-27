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

const ShareButton = ({ className, ...props }) => {
    const intl = useIntl();

    return (
        <IconButton
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            label={intl.formatMessage({
                defaultMessage: 'Share',
                description: 'Button label',
            })}
            iconPosition="left"
            icon={
                <svg
                    width="16"
                    height="22"
                    viewBox="0 0 16 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.55806 0.183058C7.80213 -0.0610194 8.19786 -0.0610194 8.44194 0.183058L12.4194 4.16053C12.6635 4.40461 12.6635 4.80034 12.4194 5.04442C12.1753 5.2885 11.7796 5.2885 11.5355 5.04442L8.625 2.13388V11.25H7.375V2.13388L4.46446 5.04442C4.22039 5.2885 3.82466 5.2885 3.58058 5.04442C3.3365 4.80034 3.3365 4.40461 3.58058 4.16053L7.55806 0.183058Z"
                        fill="currentColor"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 18.25V10.25C16 8.59315 14.6569 7.25 13 7.25C14.1046 7.25 15 8.59315 15 10.25V18.25C15 19.3546 14.1046 20.25 13 20.25H3C1.89543 20.25 1 19.3546 1 18.25V10.25C1 8.59315 1.89543 7.25 3 7.25C1.34315 7.25 0 8.59315 0 10.25V18.25C0 19.9069 1.34315 21.25 3 21.25H13C14.6569 21.25 16 19.9069 16 18.25Z"
                        fill="currentColor"
                    />
                </svg>
            }
            {...props}
        />
    );
};

ShareButton.propTypes = propTypes;
ShareButton.defaultProps = defaultProps;

export default ShareButton;
