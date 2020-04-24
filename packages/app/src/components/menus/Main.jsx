/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/menus/main.module.scss';

const messages = defineMessages({
    account: {
        id: 'menus.main.account',
        defaultMessage: 'Account',
    },
    logout: {
        id: 'menus.main.logout',
        defaultMessage: 'Logout',
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

const MainMenu = ({ className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    const { logout } = useAuth();
    const onClickLogout = useCallback(
        e => {
            e.preventDefault();
            logout();
        },
        [logout],
    );
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'account',
                    href: url('account'),
                    label: messages.account,
                },
                {
                    id: 'logout',
                    href: url('logout'),
                    label: messages.logout,
                    onClick: onClickLogout,
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

MainMenu.propTypes = propTypes;
MainMenu.defaultProps = defaultProps;

export default MainMenu;
