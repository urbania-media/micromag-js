/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { useLocation } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
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
    asList: PropTypes.bool,
    flush: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
    withoutDropdown: false,
    asList: false,
    flush: false,
    dropdownAlign: null,
};

const AccountMenu = ({
    className,
    itemClassName,
    linkClassName,
    withoutDropdown,
    asList,
    flush,
    dropdownAlign,
    ...props
}) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const finalItems = useMemo(() => {
        const subMenu = [
            {
                id: 'profile',
                href: url('account'),
                label: messages.profile,
            },
            {
                id: 'logout',
                href: url('auth.logout'),
                label: messages.logout,
                onClick: (e) => {
                    e.preventDefault();
                    logout();
                },
            },
        ]
            .filter((it) => it !== null)
            .map((it) =>
                it.href === pathname
                    ? {
                          ...it,
                          active: true,
                      }
                    : it,
            );
        return withoutDropdown || asList
            ? subMenu
            : [
                  {
                      id: 'account',
                      href: url('account'),
                      label: messages.account,
                      dropdown: subMenu,
                  },
              ];
    }, [url, messages, logout, pathname, withoutDropdown, asList]);
    return (
        <Menu
            {...props}
            items={finalItems}
            linkAsItem={asList}
            className={classNames({
                'list-group': asList,
                'list-group-flush': asList && flush,
                [className]: className !== null,
            })}
            itemClassName={classNames({
                'list-group-item': asList,
                'list-group-item-action': asList,
                'list-group-item-dark': asList,
                [itemClassName]: itemClassName !== null,
            })}
            linkClassName={linkClassName}
            dropdownAlign={dropdownAlign}
        />
    );
};

AccountMenu.propTypes = propTypes;
AccountMenu.defaultProps = defaultProps;

export default AccountMenu;
