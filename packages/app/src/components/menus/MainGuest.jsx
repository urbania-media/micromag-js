/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';

import { useUrlGenerator } from '../../contexts/RoutesContext';

import styles from '../../styles/menus/main-guest.module.scss';

const messages = defineMessages({
    login: {
        id: 'menus.guest.login',
        defaultMessage: 'Login',
    },
    register: {
        id: 'menus.guest.register',
        defaultMessage: 'Register',
    },
});

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
};

const MainGuestMenu = ({ className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'login',
                    href: url('auth.login'),
                    label: messages.login,
                },
                {
                    id: 'register',
                    href: url('register'),
                    label: messages.register,
                },
            ]}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            itemClassName={itemClassName}
            linkClassName={linkClassName}
        />
    );
};

MainGuestMenu.propTypes = propTypes;
MainGuestMenu.defaultProps = defaultProps;

export default MainGuestMenu;
