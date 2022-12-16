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
                    xmlns="http://www.w3.org/2000/svg"
                    width="10px"
                    height="16px"
                    viewBox="0 0 10 16"
                    fill="currentColor"
                >
                    <polygon points="9.95 4.11 8.89 3.05 5 6.94 1.11 3.05 0.05 4.11 3.94 8 0.05 11.89 1.11 12.95 5 9.06 8.89 12.95 9.95 11.89 6.06 8 9.95 4.11" />
                </svg>
            }
            {...props}
        />
    );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
