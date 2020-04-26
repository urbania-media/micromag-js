/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';
import { useUrlGenerator } from '@micromag/core/contexts';

// import * as AppPropTypes from '../../lib/PropTypes';
import { useAuth } from '../../contexts/AuthContext';

const messages = defineMessages({
    account: {
        id: 'menus.account.account',
        defaultMessage: 'Account',
    },
    profile: {
        id: 'menus.account.profile',
        defaultMessage: 'Edit profile',
    },
    logout: {
        id: 'menus.account.logout',
        defaultMessage: 'Logout',
    },
});

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    withoutDropdown: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
    withoutDropdown: false,
    dropdownAlign: null,
};

const AccountMenu = ({
    className,
    itemClassName,
    linkClassName,
    withoutDropdown,
    dropdownAlign,
    ...props
}) => {
    const url = useUrlGenerator();
    const { logout } = useAuth();
    const onClickLogout = useCallback(
        e => {
            e.preventDefault();
            logout();
        },
        [logout],
    );
    const subMenu = [
        {
            id: 'profile',
            href: url('account.profile'),
            label: messages.profile,
        },
        {
            id: 'logout',
            href: url('auth.logout'),
            label: messages.logout,
            onClick: onClickLogout,
        },
    ];
    return (
        <Menu
            {...props}
            items={
                withoutDropdown
                    ? subMenu
                    : [
                          {
                              id: 'account',
                              href: url('account'),
                              label: messages.account,
                              dropdown: subMenu,
                          },
                      ]
            }
            className={className}
            itemClassName={itemClassName}
            linkClassName={linkClassName}
            dropdownAlign={dropdownAlign}
        />
    );
};

AccountMenu.propTypes = propTypes;
AccountMenu.defaultProps = defaultProps;

export default AccountMenu;
