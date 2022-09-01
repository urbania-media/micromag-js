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

const MenuButton = ({ className, ...props }) => {
    const intl = useIntl();

    return (
        <IconButton
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            label={intl.formatMessage({
                defaultMessage: 'Menu',
                description: 'Button label',
            })}
            iconPosition="right"
            icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="currentColor"
                >
                    <rect width="10" height="16" />
                </svg>
            }
            {...props}
        />
    );
};

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
