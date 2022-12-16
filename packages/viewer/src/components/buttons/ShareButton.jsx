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
                    xmlns="http://www.w3.org/2000/svg"
                    width="10px"
                    height="16px"
                    viewBox="0 0 10 16"
                    fill="currentColor"
                >
                    <polygon points="8.5 14.5 1.5 14.5 1.5 8 0 8 0 16 10 16 10 8 8.5 8 8.5 14.5" />
                    <polygon points="9.62 4.62 5 0 0.38 4.62 1.44 5.68 4.25 2.87 4.25 11.26 5.75 11.26 5.75 2.87 8.56 5.68 9.62 4.62" />
                </svg>
            }
            {...props}
        />
    );
};

ShareButton.propTypes = propTypes;
ShareButton.defaultProps = defaultProps;

export default ShareButton;
