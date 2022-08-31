/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import IconButton from './IconButton';

const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    theme: MicromagPropTypes.viewerTheme,
};

const defaultProps = {
    className: null,
    onClick: null,
    theme: null,
};

const MenuButton = ({ className, onClick, theme, ...props }) => {
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
                    {...theme}
                >
                    <rect width="10" height="16" />
                </svg>
            }
            onClick={onClick}
            {...props}
        />
    );
};

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
